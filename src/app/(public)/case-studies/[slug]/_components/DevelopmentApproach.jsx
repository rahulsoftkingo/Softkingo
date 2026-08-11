"use client";

import { motion } from 'framer-motion';
import {
    ClipboardList,
    Palette,
    Code2,
    FlaskConical,
    Rocket,
    Settings2,
} from 'lucide-react';
import CommonTitle from "@/components/ui/CommonTitle";

const groups = [
    {
        label: "EXPLORE",
        stages: [
            {
                title: "Planning",
                icon: ClipboardList,
                items: ["Market Study", "User Needs", "Tech Scope"],
            },
            {
                title: "Design",
                icon: Palette,
                items: ["Wireframes", "UI/UX Flow", "Branding"],
            },
        ],
    },
    {
        label: "IMPLEMENT",
        stages: [
            {
                title: "Development",
                icon: Code2,
                items: ["Backend Setup", "Custom Feature", "Mobile Build"],
            },
            {
                title: "Testing",
                icon: FlaskConical,
                items: ["Bug Fixes", "Performance Check", "Security Test"],
            },
        ],
    },
    {
        label: "EXECUTE",
        stages: [
            {
                title: "Launch",
                icon: Rocket,
                items: ["Website Live", "Marketing Push", "User Onboarding"],
            },
            {
                title: "Maintenance",
                icon: Settings2,
                items: ["Regular Updates", "Feature Upgrades", "User Support"],
            },
        ],
    },
];

// How far (in rem) each group's starting point drops relative to the
// previous group. This is what creates the continuous left-to-right
// "staircase" across EXPLORE -> IMPLEMENT -> EXECUTE, instead of every
// group restarting at the same height under its heading.
const GROUP_VERTICAL_STEP_REM = 7.5;

export default function DevelopmentApproach({ branding }) {
    const primaryColor = branding?.primaryColor || "#E11D48";
    const secondaryColor = branding?.secondaryColor || primaryColor;

    return (
        <section className="relative overflow-hidden py-16 md:py-20 bg-slate-50">
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[150px] pointer-events-none"
                style={{ backgroundColor: `${primaryColor}1A` }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-4xl mx-auto mb-16 md:mb-20"
                >
                    <CommonTitle
                        title="Our Development Approach"
                        subtitle="At Softkingo, every project follows a well-defined development process to deliver high-quality digital solutions."
                        alignment="center"
                    />
                    {/* <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                        At Softkingo, every project follows a well-defined development process to
                        deliver high-quality digital solutions. From understanding business
                        requirements and designing intuitive user experiences to agile development,
                        rigorous testing, and seamless deployment, we ensure every solution is
                        scalable, secure, and performance-driven. Our collaborative approach helps
                        businesses achieve reliable results with modern technology and user-focused
                        innovation.
                    </p> */}
                </motion.div>

                {/* Timeline groups. Headings (EXPLORE/IMPLEMENT/EXECUTE) stay aligned
                    on the same row via the grid. The stage content below each heading
                    gets an increasing top offset per group (GROUP_VERTICAL_STEP_REM),
                    so the cascade continues across groups instead of resetting. */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-20 md:gap-y-0">
                    {groups.map((group, groupIdx) => (
                        <motion.div
                            key={group.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: groupIdx * 0.15, duration: 0.5 }}
                            className="relative"
                        >
                            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-8 tracking-tight">
                                {group.label}
                            </h3>

                            {/* Border-dashed line always starts right under the
                                heading (same start point as EXPLORE) for every
                                group. The group offset is applied as paddingTop
                                on the FIRST stage only, so the line itself spans
                                from the top all the way down to the (lower)
                                badge, instead of the whole block — border
                                included — shifting down. */}
                            <div>
                                {group.stages.map((stage, stageIdx) => {
                                    const Icon = stage.icon;
                                    return (
                                        <div
                                            key={stage.title}
                                            className="relative max-w-[92%] pl-6 border-l-2 border-dashed border-slate-300"
                                            style={{
                                                marginLeft: stageIdx === 0 ? 0 : `${stageIdx * 42}%`,
                                                marginTop: stageIdx === 0 ? 0 : "-1.25rem",
                                                paddingTop:
                                                    stageIdx === 0 && groupIdx > 0
                                                        ? `${groupIdx * GROUP_VERTICAL_STEP_REM}rem`
                                                        : 0,
                                                zIndex: stageIdx + 1,
                                            }}
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: stageIdx * 0.1 }}
                                                className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs sm:text-sm uppercase text-white shadow-sm"
                                                style={{
                                                    background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor})`,
                                                }}
                                            >
                                                <Icon size={16} strokeWidth={2.5} />
                                                {stage.title}
                                            </motion.div>

                                            <div className="relative mt-3">
                                                {stage.items.map((item, itemIdx) => (
                                                    <div
                                                        key={item}
                                                        className="relative py-2 flex items-center"
                                                    >
                                                        <span
                                                            className="absolute -left-[29px] w-3 h-3 rounded-full ring-4"
                                                            style={{
                                                                backgroundColor: primaryColor,
                                                                opacity: 0.9,
                                                                boxShadow: `0 0 0 4px ${primaryColor}1A`,
                                                            }}
                                                        />
                                                        <span
                                                            className="absolute -left-6 top-1/2 w-6 border-t-2 border-dashed"
                                                            style={{ borderColor: primaryColor, opacity: 0.5 }}
                                                        />
                                                        <p className="text-sm sm:text-base text-slate-700 font-medium">
                                                            {item}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}