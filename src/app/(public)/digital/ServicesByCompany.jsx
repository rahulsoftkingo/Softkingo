"use client";

// Fallback data used when no `data` prop (or an empty one) is passed in
const defaultData = {
  titleLead: "Enterprise Digital Marketing",
  titleAccent: "Services by Infosys",
  description:
    "Softkingo Digital Marketing practice helps enterprises build deeper customer relationships by delivering personalized experiences. We enable enterprises to achieve this by delivering relevant content, insights driven decision making and hyper-personalized campaign management, resulting in improved customer wallet share.",

  ringImage: "",

  stats: [
    {
      value: "50",
      unit: "%",
      description:
        "of Indian shoppers check online before making an actual purchase.",
    },
    {
      value: "52",
      unit: "%",
      description:
        "of Indian shoppers now start their product searches on Instagram, YouTube, or Amazon.",
    },
    {
      value: "61",
      unit: "%",
      description:
        "of Indian users trust Google results for brands that shine on social media platforms.",
    },
    {
      value: "44",
      unit: "%",
      description:
        "of young users turn to AI-generated overviews instead of scrolling through traditional search results.",
    },
  ],
};

export default function EnterpriseDigitalMarketing({ data }) {
  // Merge API data with defaults
  const source = {
    ...defaultData,
    ...(data || {}),
  };

  // Prevent empty strings from overriding dummy content
  source.titleLead = data?.titleLead?.trim() || defaultData.titleLead;
  source.titleAccent = data?.titleAccent?.trim() || defaultData.titleAccent;
  source.description =
    data?.description?.trim() || defaultData.description;
  source.ringImage = data?.ringImage?.trim() || defaultData.ringImage;

  // Prevent empty stats array
  source.stats =
    Array.isArray(data?.stats) && data.stats.length > 0
      ? data.stats
      : defaultData.stats;

  const stats = source.stats;
  const ringImage = source.ringImage;

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
            {source.titleLead}
          </h2>

          <h2 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-sky-600">
            {source.titleAccent}
          </h2>
        </div>

        <div className="mt-12 sm:mt-14 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: copy */}
          <div className="flex-1 min-w-0 w-full">
            <p className="text-[15px] sm:text-base text-slate-600 leading-[1.85] max-w-lg">
              {source.description}
            </p>
          </div>

          {/* Right: image */}
          <div className="shrink-0 w-full max-w-sm lg:w-[25rem] flex items-center justify-center">
            {ringImage ? (
              <img
                src={ringImage}
                alt={source.titleLead}
                className="w-full max-w-[22rem] aspect-square object-cover rounded-full shadow-lg"
              />
            ) : (
              <div className="w-full max-w-[22rem] aspect-square rounded-full bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm">
                Image goes here
              </div>
            )}
          </div>
        </div>

        {/* Stats grid */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 gap-x-14 gap-y-10 max-w-4xl mx-auto lg:mx-0">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-start gap-5">
              <div className="shrink-0 leading-none whitespace-nowrap">
                <span className="text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-4xl sm:text-5xl font-extrabold text-sky-500 tracking-tight">
                  {stat.unit}
                </span>
              </div>

              <p className="text-[13px] sm:text-sm text-slate-500 leading-relaxed pt-2 sm:pt-3">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}