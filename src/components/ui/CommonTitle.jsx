// components/ui/CommonTitle.jsx
const CommonTitle = ({
    pill = null,
    title = "Our Portfolio",
    subtitle = null,
    gradientText = null,
    align = "center"  // "left" | "center" | "right"
}) => {
    const textAlignClass = {
        left: "text-left",
        center: "text-center", 
        right: "text-right"
    }[align] || "text-center";

      const containerClass = {
        left: "pl-4sm:pl-8lg:pl-12",
        center: "px-4 sm:px-6 lg:px-8 mx-auto",
        right: "pr-4 sm:pr-8 lg:pr-12 flex justify-end"
    }[align] || "px-4 sm:px-6 lg:px-8 mx-auto";

    const pillAlignClass = {
        left: "justify-start",
        center: "mx-auto",
        right: "ml-auto"
    }[align] || "mx-auto";

    return (
        <div className={`${textAlignClass} ${containerClass} mb-8 sm:mb-12`}>
            {/* Pill with alignment */}
            {pill && typeof pill === 'string' && (
                <div className={`inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 text-cyan-700 rounded-full text-sm font-medium border border-cyan-200 mb-4 ${pillAlignClass} max-w-max`}>
                    {pill}
                </div>
            )}
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-sky-900">
                {title ? title.split(' ')[0] : 'Title'}{' '}
                {gradientText && typeof gradientText === 'string' ? (
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-500">
                        {gradientText}
                    </span>
                ) : title ? (
                    title.split(' ').slice(1).join(' ')
                ) : (
                    'Subtitle'
                )}
            </h2>

            {subtitle && (
                <p className="text-sm sm:text-base md:text-lg text-gray-600">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default CommonTitle;


{/* <CommonTitle
    align="center"
    pill={section.pill}
    title={section.label}
    gradientText="Gallery"
    subtitle={section.description}
/> */}

{/* <CommonTitle
    align="center"
    pill="Our Mission"
    title="Our Core Values"
    gradientText="Gallery"
    subtitle="Description..."
/>

// ✅ Left align
<CommonTitle
    align="left"
    title="Our Services"
    gradientText="Services"
    subtitle="Professional solutions."
/>

// ✅ Right align  
<CommonTitle
    align="right"
    title="Contact Us"
    subtitle="Get in touch today."
/> */}




// FIXED CommonTitle.jsx - max-w-7xl ke saath RIGHT align PERFECT

// const CommonTitle = ({
//     pill = null,
//     title = "Our Portfolio",
//     subtitle = null,
//     gradientText = null,
//     align = "center"  // "left" | "center" | "right"
// }) => {
//     const textAlignClass = {
//         left: "text-left",
//         center: "text-center", 
//         right: "text-right"
//     }[align] || "text-center";

   
//     const containerClass = {
//         left: "pl-4sm:pl-8lg:pl-12",
//         center: "px-4 sm:px-6 lg:px-8 mx-auto",
//         right: "pr-4 sm:pr-8 lg:pr-12 flex justify-end"
//     }[align] || "px-4 sm:px-6 lg:px-8 mx-auto";

//     const pillAlignClass = {
//         left: "justify-start",
//         center: "mx-auto",
//         right: "ml-auto justify-end"
//     }[align] || "mx-auto";

//     return (
        
//         <div className={`${containerClass} ${textAlignClass} mb-8 sm:mb-12`}>
//             {/* Pill with proper alignment */}
//             {pill && typeof pill === 'string' && (
//                 <div className={`inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 text-cyan-700 rounded-full text-sm font-medium border border-cyan-200 mb-4 max-w-max ${pillAlignClass}`}>
//                     {pill}
//                 </div>
//             )}
            
//             <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-sky-900 leading-tight">
//                 {title ? title.split(' ')[0] : 'Title'}{' '}
//                 {gradientText && typeof gradientText === 'string' ? (
//                     <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-sky-500">
//                         {gradientText}
//                     </span>
//                 ) : title ? (
//                     title.split(' ').slice(1).join(' ')
//                 ) : (
//                     'Subtitle'
//                 )}
//             </h2>

//             {subtitle && (
//                 <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
//                     {subtitle}
//                 </p>
//             )}
//         </div>
//     );
// };

// export default CommonTitle;
