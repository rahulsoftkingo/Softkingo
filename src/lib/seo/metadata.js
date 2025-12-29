import { SOFTKINGO } from "./softkingo";

export async function buildMetadata(seoData = null) {
  if (!seoData) {
    return {
      title: {
        default: SOFTKINGO.defaultTitle,
        template: `%s | ${SOFTKINGO.siteName}`,
      },
      description: SOFTKINGO.defaultDescription,
      openGraph: {
        title: SOFTKINGO.defaultTitle,
        description: SOFTKINGO.defaultDescription,
        siteName: SOFTKINGO.siteName,
        images: [{ url: SOFTKINGO.defaultImage }],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: SOFTKINGO.defaultTitle,
        description: SOFTKINGO.defaultDescription,
        images: [SOFTKINGO.defaultImage],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  }

  const canonical = seoData.url 
    ? new URL(seoData.url, SOFTKINGO.baseUrl).toString() 
    : undefined;

  return {
    title: {
      default: seoData.title,
      template: `%s | ${SOFTKINGO.siteName}`,
    },
    description: seoData.description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      url: canonical,
      siteName: SOFTKINGO.siteName,
      images: [{ url: seoData.image }],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.title,
      description: seoData.description,
      images: [seoData.image],
    },
  };
}
