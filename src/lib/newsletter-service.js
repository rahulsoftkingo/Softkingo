import prisma from './prisma';
import { sendEmail } from './mail';

/**
 * Notifies all active subscribers of a new blog post.
 * @param {Object} post - The blog post object from Prisma.
 */
export async function notifySubscribersOfNewPost(post) {
  if (!post || post.status !== 'published') return;

  try {
    // 1. Get the blog newsletter list and its active subscribers
    const list = await prisma.newsletterList.findUnique({
      where: { slug: 'blog-newsletter' },
      include: {
        subscribers: {
          where: { status: 'active' }
        }
      }
    });

    if (!list || !list.subscribers || list.subscribers.length === 0) {
      console.log('No active subscribers found for blog-newsletter list.');
      return;
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.softkingo.com';
    const blogUrl = `${siteUrl}/blog/${post.slug}`;
    const subject = `New Blog: ${post.title}`;

    console.log(`Starting notification for ${list.subscribers.length} subscribers...`);

    // 2. Prepare and send emails
    // We use Promise.all to send in parallel, but catch individual errors
    const emailPromises = list.subscribers.map(sub => {
      const html = `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff;">
          <div style="background: linear-gradient(135deg, #2FB3E0 0%, #06465D 100%); padding: 40px 20px; text-align: center;">
            <img src="${siteUrl}/images/logo.png" alt="Softkingo" style="height: 40px; margin-bottom: 20px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.025em;">New Insight Published!</h1>
          </div>
          
          <div style="padding: 40px 30px;">
            <div style="text-transform: uppercase; color: #2FB3E0; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; margin-bottom: 12px;">Fresh from our blog</div>
            <h2 style="color: #0f172a; margin: 0 0 16px 0; font-size: 22px; line-height: 1.3; font-weight: 700;">${post.title}</h2>
            <p style="color: #475569; line-height: 1.6; font-size: 16px; margin-bottom: 30px;">${post.excerpt || 'We just published a new article that might interest you. Dive in to stay ahead of the curve.'}</p>
            
            <div style="text-align: left;">
              <a href="${blogUrl}" style="background-color: #2FB3E0; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; display: inline-block; transition: all 0.2s ease;">Read Full Article</a>
            </div>
          </div>
          
          <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 13px; margin: 0 0 10px 0;">Empowering businesses through innovative digital solutions.</p>
            <div style="margin-bottom: 20px;">
              <a href="https://softkingo.com" style="color: #2FB3E0; text-decoration: none; font-weight: 600; font-size: 13px;">softkingo.com</a>
            </div>
            <p style="color: #94a3b8; font-size: 11px; margin: 0; line-height: 1.5;">
              You are receiving this because you subscribed to Softkingo Insights.<br>
              © ${new Date().getFullYear()} Softkingo. All rights reserved.
            </p>
          </div>
        </div>
      `;

      return sendEmail({
        to: sub.email,
        subject,
        html,
        text: `New Blog Post: ${post.title}\n\nRead it here: ${blogUrl}`
      }).catch(err => {
        console.error(`Failed to notify ${sub.email}:`, err.message);
      });
    });

    // Don't await the entire process in the main thread if possible,
    // but here we are in a helper that will be called by an API.
    // In Next.js App Router, the function will continue until these resolve if we await them.
    await Promise.all(emailPromises);
    console.log(`Successfully processed notifications for post: ${post.title}`);

  } catch (error) {
    console.error('Newsletter Notification Error:', error);
  }
}
