import { AppScreensCarousel } from '../AppScreensCarousel.jsx';

export default function AppScreensShowcase({ data, branding }) {
    return (
        <section className="py-16 sm:py-24 md:py-32 px-0 bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-12 text-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                    {data.title}
                </h2>
                <div className="w-20 h-1 mx-auto mt-6 rounded-full" style={{ backgroundColor: branding.primaryColor }} />
            </div>
            <AppScreensCarousel data={data} primaryColor={branding.primaryColor} />
        </section>
    );
}
