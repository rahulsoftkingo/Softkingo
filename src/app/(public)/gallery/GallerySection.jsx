// components/sections/GallerySection.jsx

async function GallerySectionSafe() {
  let galleryImages = [];

  try {
    // Fast query + timeout
    galleryImages = await prisma.mediaItem.findMany({
      where: {
        type: 'image',
      },
      orderBy: { createdAt: 'desc' },
      take: 8, // Smaller = faster
      select: {  // Only needed fields
        id: true,
        filePath: true,
        title: true,
      }
    }).then(images => 
      images.filter(img => img.filePath).map(img => ({
        id: img.id,
        src: img.filePath?.startsWith('/') || img.filePath?.startsWith('http') 
          ? img.filePath 
          : `/uploads/${img.filePath}`,
        alt: img.title || 'Softkingo Gallery'
      }))
    );
  } catch (error) {
    console.log('Gallery DB timeout, using fallback');
    galleryImages = []; // Empty graceful fallback
  }

  return (
    <section className="relative bg-white py-12 md:py-16 lg:py-24">
      <div className="container max-w-7xl mx-auto px-6 lg:px-12">
        <CommonTitle
          align="center"
          pill={false}
          title="Softkingo"
          gradientText="Gallery"
          subtitle="We believe in cultivating a work culture that goes beyond projects. Where creativity flourishes, and ideas thrive with a shared commitment to excellence."
        /> 
        
        <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-8 justify-center">
          {galleryImages.length > 0 ? (
            galleryImages.map((image) => (
              <div key={image.id} className="group relative w-full sm:w-[calc(50%-8px)] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-21.33px)] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))
          ) : (
            <div className="w-full text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">📸</div>
              <p className="text-gray-500 text-lg">Gallery coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
