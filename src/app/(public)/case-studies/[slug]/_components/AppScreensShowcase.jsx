import { AppScreensCarousel } from '../AppScreensCarousel.jsx';

export default function AppScreensShowcase({ data, branding }) {
    return (
        <section className="relative bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 text-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
                    {data.title}
                </h2>
                <div className="w-20 h-1 mx-auto mt-4 rounded-full" style={{ backgroundColor: branding.primaryColor }} />
            </div>
            <AppScreensCarousel data={data} primaryColor={branding.primaryColor} />
        </section>
    );
}
