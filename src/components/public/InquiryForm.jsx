// app/(public)/components/InquiryForm.jsx

"use client";

import { useEffect, useState, useRef } from "react";
import { FaPaperclip, FaChevronDown, FaSearch } from "react-icons/fa";

// --- 1. COUNTRIES DATA (Codes must be correct ISO 2-digit) ---
const countryList = [
  { name: "United States", code: "US", dial: "+1" },
  { name: "India", code: "IN", dial: "+91" },
  { name: "Afghanistan", code: "AF", dial: "+93" },
  { name: "Albania", code: "AL", dial: "+355" },
  { name: "Algeria", code: "DZ", dial: "+213" },
  { name: "Andorra", code: "AD", dial: "+376" },
  { name: "Angola", code: "AO", dial: "+244" },
  { name: "Antigua and Barbuda", code: "AG", dial: "+1268" },
  { name: "Argentina", code: "AR", dial: "+54" },
  { name: "Armenia", code: "AM", dial: "+374" },
  { name: "Australia", code: "AU", dial: "+61" },
  { name: "Austria", code: "AT", dial: "+43" },
  { name: "Azerbaijan", code: "AZ", dial: "+994" },
  { name: "Bahamas", code: "BS", dial: "+1242" },
  { name: "Bahrain", code: "BH", dial: "+973" },
  { name: "Bangladesh", code: "BD", dial: "+880" },
  { name: "Barbados", code: "BB", dial: "+1246" },
  { name: "Belarus", code: "BY", dial: "+375" },
  { name: "Belgium", code: "BE", dial: "+32" },
  { name: "Belize", code: "BZ", dial: "+501" },
  { name: "Benin", code: "BJ", dial: "+229" },
  { name: "Bhutan", code: "BT", dial: "+975" },
  { name: "Bolivia", code: "BO", dial: "+591" },
  { name: "Bosnia and Herzegovina", code: "BA", dial: "+387" },
  { name: "Botswana", code: "BW", dial: "+267" },
  { name: "Brazil", code: "BR", dial: "+55" },
  { name: "Brunei", code: "BN", dial: "+673" },
  { name: "Bulgaria", code: "BG", dial: "+359" },
  { name: "Burkina Faso", code: "BF", dial: "+226" },
  { name: "Burundi", code: "BI", dial: "+257" },
  { name: "Cambodia", code: "KH", dial: "+855" },
  { name: "Cameroon", code: "CM", dial: "+237" },
  { name: "Canada", code: "CA", dial: "+1" },
  { name: "Cape Verde", code: "CV", dial: "+238" },
  { name: "Central African Republic", code: "CF", dial: "+236" },
  { name: "Chad", code: "TD", dial: "+235" },
  { name: "Chile", code: "CL", dial: "+56" },
  { name: "China", code: "CN", dial: "+86" },
  { name: "Colombia", code: "CO", dial: "+57" },
  { name: "Comoros", code: "KM", dial: "+269" },
  { name: "Congo (DRC)", code: "CD", dial: "+243" },
  { name: "Congo (Republic)", code: "CG", dial: "+242" },
  { name: "Costa Rica", code: "CR", dial: "+506" },
  { name: "Croatia", code: "HR", dial: "+385" },
  { name: "Cuba", code: "CU", dial: "+53" },
  { name: "Cyprus", code: "CY", dial: "+357" },
  { name: "Czech Republic", code: "CZ", dial: "+420" },
  { name: "Denmark", code: "DK", dial: "+45" },
  { name: "Djibouti", code: "DJ", dial: "+253" },
  { name: "Dominica", code: "DM", dial: "+1767" },
  { name: "Dominican Republic", code: "DO", dial: "+1" },
  { name: "Ecuador", code: "EC", dial: "+593" },
  { name: "Egypt", code: "EG", dial: "+20" },
  { name: "El Salvador", code: "SV", dial: "+503" },
  { name: "Equatorial Guinea", code: "GQ", dial: "+240" },
  { name: "Eritrea", code: "ER", dial: "+291" },
  { name: "Estonia", code: "EE", dial: "+372" },
  { name: "Eswatini", code: "SZ", dial: "+268" },
  { name: "Ethiopia", code: "ET", dial: "+251" },
  { name: "Fiji", code: "FJ", dial: "+679" },
  { name: "Finland", code: "FI", dial: "+358" },
  { name: "France", code: "FR", dial: "+33" },
  { name: "Gabon", code: "GA", dial: "+241" },
  { name: "Gambia", code: "GM", dial: "+220" },
  { name: "Georgia", code: "GE", dial: "+995" },
  { name: "Germany", code: "DE", dial: "+49" },
  { name: "Ghana", code: "GH", dial: "+233" },
  { name: "Greece", code: "GR", dial: "+30" },
  { name: "Grenada", code: "GD", dial: "+1473" },
  { name: "Guatemala", code: "GT", dial: "+502" },
  { name: "Guinea", code: "GN", dial: "+224" },
  { name: "Guinea-Bissau", code: "GW", dial: "+245" },
  { name: "Guyana", code: "GY", dial: "+592" },
  { name: "Haiti", code: "HT", dial: "+509" },
  { name: "Honduras", code: "HN", dial: "+504" },
  { name: "Hong Kong", code: "HK", dial: "+852" },
  { name: "Hungary", code: "HU", dial: "+36" },
  { name: "Iceland", code: "IS", dial: "+354" },
  
  { name: "Indonesia", code: "ID", dial: "+62" },
  { name: "Iran", code: "IR", dial: "+98" },
  { name: "Iraq", code: "IQ", dial: "+964" },
  { name: "Ireland", code: "IE", dial: "+353" },
  { name: "Israel", code: "IL", dial: "+972" },
  { name: "Italy", code: "IT", dial: "+39" },
  { name: "Ivory Coast", code: "CI", dial: "+225" },
  { name: "Jamaica", code: "JM", dial: "+1876" },
  { name: "Japan", code: "JP", dial: "+81" },
  { name: "Jordan", code: "JO", dial: "+962" },
  { name: "Kazakhstan", code: "KZ", dial: "+7" },
  { name: "Kenya", code: "KE", dial: "+254" },
  { name: "Kiribati", code: "KI", dial: "+686" },
  { name: "Kuwait", code: "KW", dial: "+965" },
  { name: "Kyrgyzstan", code: "KG", dial: "+996" },
  { name: "Laos", code: "LA", dial: "+856" },
  { name: "Latvia", code: "LV", dial: "+371" },
  { name: "Lebanon", code: "LB", dial: "+961" },
  { name: "Lesotho", code: "LS", dial: "+266" },
  { name: "Liberia", code: "LR", dial: "+231" },
  { name: "Libya", code: "LY", dial: "+218" },
  { name: "Liechtenstein", code: "LI", dial: "+423" },
  { name: "Lithuania", code: "LT", dial: "+370" },
  { name: "Luxembourg", code: "LU", dial: "+352" },
  { name: "Macau", code: "MO", dial: "+853" },
  { name: "Madagascar", code: "MG", dial: "+261" },
  { name: "Malawi", code: "MW", dial: "+265" },
  { name: "Malaysia", code: "MY", dial: "+60" },
  { name: "Maldives", code: "MV", dial: "+960" },
  { name: "Mali", code: "ML", dial: "+223" },
  { name: "Malta", code: "MT", dial: "+356" },
  { name: "Marshall Islands", code: "MH", dial: "+692" },
  { name: "Mauritania", code: "MR", dial: "+222" },
  { name: "Mauritius", code: "MU", dial: "+230" },
  { name: "Mexico", code: "MX", dial: "+52" },
  { name: "Micronesia", code: "FM", dial: "+691" },
  { name: "Moldova", code: "MD", dial: "+373" },
  { name: "Monaco", code: "MC", dial: "+377" },
  { name: "Mongolia", code: "MN", dial: "+976" },
  { name: "Montenegro", code: "ME", dial: "+382" },
  { name: "Morocco", code: "MA", dial: "+212" },
  { name: "Mozambique", code: "MZ", dial: "+258" },
  { name: "Myanmar", code: "MM", dial: "+95" },
  { name: "Namibia", code: "NA", dial: "+264" },
  { name: "Nauru", code: "NR", dial: "+674" },
  { name: "Nepal", code: "NP", dial: "+977" },
  { name: "Netherlands", code: "NL", dial: "+31" },
  { name: "New Zealand", code: "NZ", dial: "+64" },
  { name: "Nicaragua", code: "NI", dial: "+505" },
  { name: "Niger", code: "NE", dial: "+227" },
  { name: "Nigeria", code: "NG", dial: "+234" },
  { name: "North Korea", code: "KP", dial: "+850" },
  { name: "North Macedonia", code: "MK", dial: "+389" },
  { name: "Norway", code: "NO", dial: "+47" },
  { name: "Oman", code: "OM", dial: "+968" },
  { name: "Pakistan", code: "PK", dial: "+92" },
  { name: "Palau", code: "PW", dial: "+680" },
  { name: "Palestine", code: "PS", dial: "+970" },
  { name: "Panama", code: "PA", dial: "+507" },
  { name: "Papua New Guinea", code: "PG", dial: "+675" },
  { name: "Paraguay", code: "PY", dial: "+595" },
  { name: "Peru", code: "PE", dial: "+51" },
  { name: "Philippines", code: "PH", dial: "+63" },
  { name: "Poland", code: "PL", dial: "+48" },
  { name: "Portugal", code: "PT", dial: "+351" },
  { name: "Qatar", code: "QA", dial: "+974" },
  { name: "Romania", code: "RO", dial: "+40" },
  { name: "Russia", code: "RU", dial: "+7" },
  { name: "Rwanda", code: "RW", dial: "+250" },
  { name: "Saint Kitts and Nevis", code: "KN", dial: "+1869" },
  { name: "Saint Lucia", code: "LC", dial: "+1758" },
  { name: "Saint Vincent", code: "VC", dial: "+1784" },
  { name: "Samoa", code: "WS", dial: "+685" },
  { name: "San Marino", code: "SM", dial: "+378" },
  { name: "Sao Tome and Principe", code: "ST", dial: "+239" },
  { name: "Saudi Arabia", code: "SA", dial: "+966" },
  { name: "Senegal", code: "SN", dial: "+221" },
  { name: "Serbia", code: "RS", dial: "+381" },
  { name: "Seychelles", code: "SC", dial: "+248" },
  { name: "Sierra Leone", code: "SL", dial: "+232" },
  { name: "Singapore", code: "SG", dial: "+65" },
  { name: "Slovakia", code: "SK", dial: "+421" },
  { name: "Slovenia", code: "SI", dial: "+386" },
  { name: "Solomon Islands", code: "SB", dial: "+677" },
  { name: "Somalia", code: "SO", dial: "+252" },
  { name: "South Africa", code: "ZA", dial: "+27" },
  { name: "South Korea", code: "KR", dial: "+82" },
  { name: "South Sudan", code: "SS", dial: "+211" },
  { name: "Spain", code: "ES", dial: "+34" },
  { name: "Sri Lanka", code: "LK", dial: "+94" },
  { name: "Sudan", code: "SD", dial: "+249" },
  { name: "Suriname", code: "SR", dial: "+597" },
  { name: "Sweden", code: "SE", dial: "+46" },
  { name: "Switzerland", code: "CH", dial: "+41" },
  { name: "Syria", code: "SY", dial: "+963" },
  { name: "Taiwan", code: "TW", dial: "+886" },
  { name: "Tajikistan", code: "TJ", dial: "+992" },
  { name: "Tanzania", code: "TZ", dial: "+255" },
  { name: "Thailand", code: "TH", dial: "+66" },
  { name: "Timor-Leste", code: "TL", dial: "+670" },
  { name: "Togo", code: "TG", dial: "+228" },
  { name: "Tonga", code: "TO", dial: "+676" },
  { name: "Trinidad and Tobago", code: "TT", dial: "+1868" },
  { name: "Tunisia", code: "TN", dial: "+216" },
  { name: "Turkey", code: "TR", dial: "+90" },
  { name: "Turkmenistan", code: "TM", dial: "+993" },
  { name: "Tuvalu", code: "TV", dial: "+688" },
  { name: "Uganda", code: "UG", dial: "+256" },
  { name: "Ukraine", code: "UA", dial: "+380" },
  { name: "United Arab Emirates", code: "AE", dial: "+971" },
  { name: "United Kingdom", code: "GB", dial: "+44" },
  
  { name: "Uruguay", code: "UY", dial: "+598" },
  { name: "Uzbekistan", code: "UZ", dial: "+998" },
  { name: "Vanuatu", code: "VU", dial: "+678" },
  { name: "Vatican City", code: "VA", dial: "+39" },
  { name: "Venezuela", code: "VE", dial: "+58" },
  { name: "Vietnam", code: "VN", dial: "+84" },
  { name: "Yemen", code: "YE", dial: "+967" },
  { name: "Zambia", code: "ZM", dial: "+260" },
  { name: "Zimbabwe", code: "ZW", dial: "+263" },
];
const colorMap = {
  sky: { btn: "bg-sky-500 hover:bg-sky-600" },
  cyan: { btn: "bg-cyan-500 hover:bg-cyan-600" },
  blue: { btn: "bg-blue-500 hover:bg-blue-600" },
};

const InquiryForm = ({
  showHeader = true,
  title = "Hey! there ",
  subtitle = "Share a bit about your project and we’ll get back quickly.",
  tagline = "Quick inquiry",
  submitLabel = "Submit Form",
  primaryColor = "sky",
  formType = "inquiry",
  formKey = "home-inquiry",
  showName = true,
  showEmail = true,
  showPhone = true,
  showCompany = true,
  showMessage = true,
  showAttachment = true,
  showNDA = true,
  showCaptcha = true,
  nameLabel = "Your Name",
  namePlaceholder = "Enter your name",
  emailLabel = "Email address",
  emailPlaceholder = "Enter your email",
  phoneLabel = "Phone Number",
  phonePlaceholder = "Enter phone number",
  companyLabel = "Company",
  companyPlaceholder = "Company Name",
  messageLabel = "Message",
  messagePlaceholder = "Brief about the project",
  attachmentLabel = "Attachment (optional)",
}) => {
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countryList[0]); 
  const [fileName, setFileName] = useState("");
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [touched, setTouched] = useState(false);
  const [ndaChecked, setNdaChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const colors = colorMap[primaryColor] || colorMap.sky;

  useEffect(() => {
    if (showCaptcha) {
      setNum1(Math.floor(Math.random() * 9) + 1);
      setNum2(Math.floor(Math.random() * 9) + 1);
    } else {
      setIsCorrect(true);
    }
  }, [showCaptcha]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : "");
  };

  const handleCaptchaChange = (e) => {
    const value = e.target.value;
    setUserAnswer(value);
    setTouched(true);
    setIsCorrect(Number(value) === num1 + num2);
  };

  const isCaptchaValid = showCaptcha ? isCorrect : true;
  const isNDAValid = showNDA ? ndaChecked : true;
  const submitDisabled = !isCaptchaValid || !isNDAValid || submitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitDisabled) return;
    setSubmitting(true);
    setToast(null);

    const formData = new FormData(e.currentTarget);
    const rawPhone = formData.get("phone") || phone;
    const fullPhone = `(${selectedCountry.dial}) ${rawPhone}`;

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: fullPhone,
      company: formData.get("company"),
      message: formData.get("message"),
      budgetLabel: "N/A",
      formType,
      formKey,
      ndaAccepted: ndaChecked,
      attachmentName: typeof formData.get("fileInput") === "object" && formData.get("fileInput")?.name 
        ? formData.get("fileInput").name 
        : fileName || null,
    };

    try {
      const res = await fetch("/api/public/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setToast({ type: "error", message: data.message || "Something went wrong." });
        setSubmitting(false);
        return;
      }

      setToast({ type: "success", message: "Thank you! Your inquiry has been submitted." });
      e.target.reset();
      setPhone("");
      setFileName("");
      setUserAnswer("");
      if(showCaptcha) {
          setIsCorrect(false);
          setNum1(Math.floor(Math.random() * 9) + 1);
          setNum2(Math.floor(Math.random() * 9) + 1);
      }
      setTouched(false);
      setNdaChecked(false);
    } catch (err) {
      setToast({ type: "error", message: "Unable to submit right now." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      {/* Toast */}
      {toast && (
        <div className="pointer-events-none absolute inset-x-0 -top-10 flex justify-center z-10">
          <div className={`pointer-events-auto rounded-full px-4 py-2 text-xs font-medium shadow-md flex items-center gap-2 ${toast.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100"}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            <span>{toast.message}</span>
            <button type="button" onClick={() => setToast(null)} className="ml-1 text-[10px] text-slate-400 hover:text-slate-600">Close</button>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-sky-100 shadow-[0_24px_60px_rgba(15,23,42,0.12)] overflow-hidden w-full">
        {showHeader && (
          <div className="px-5 pt-4 pb-3 border-b border-slate-100 text-center space-y-1">
            {tagline && <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">{tagline}</p>}
            <h3 className="text-xl md:text-2xl font-semibold text-sky-700">{title}</h3>
            {subtitle && <p className="text-xs md:text-sm text-slate-500 max-w-sm mx-auto">{subtitle}</p>}
          </div>
        )}

        <form onSubmit={handleSubmit} className="px-5 md:px-6 py-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {showName && <FloatingInput id="name" name="name" label={nameLabel} required placeholder={namePlaceholder} />}
            {showEmail && <FloatingInput id="email" name="email" type="email" label={emailLabel} required placeholder={emailPlaceholder} />}
            
            {showPhone && (
              <PhoneField 
                phone={phone} 
                setPhone={setPhone} 
                label={phoneLabel} 
                placeholder={phonePlaceholder}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
              />
            )}
            
            {showCompany && <FloatingInput id="company" name="company" label={companyLabel} placeholder={companyPlaceholder} />}
          </div>

          {showMessage && (
            <div className="rounded-lg border border-slate-300 bg-white px-3 pb-2">
              <label className="inline-block px-1 text-[11px] text-slate-500 bg-white relative -top-4 left-1" htmlFor="message">
                {messageLabel}<span className="text-red-500">*</span>
              </label>
              <textarea id="message" name="message" placeholder={messagePlaceholder} rows={3} className="w-full border-none outline-none resize-none text-sm text-slate-700 bg-transparent pb-1 -mt-2" required />
            </div>
          )}

          {showAttachment && (
            <div className="h-14 rounded-lg border border-slate-300 bg-white px-3 flex flex-col justify-center">
              <label className="inline-block px-1 text-[11px] text-slate-500 bg-white relative -top-4 left-1 w-fit" htmlFor="fileInput">{attachmentLabel}</label>
              <div className="relative -top-2 flex items-center gap-2 text-sm text-slate-600">
                <input type="file" id="fileInput" name="fileInput" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} />
                <FaPaperclip className="text-slate-500" size={18} />
                <span className="truncate">{fileName || "Choose a file..."}</span>
              </div>
            </div>
          )}

          {showNDA && (
            <label className="mt-2 flex items-start gap-2 text-xs md:text-sm text-slate-700 max-w-lg cursor-pointer">
              <input type="checkbox" className="mt-1 accent-[#00B7FF] cursor-pointer" checked={ndaChecked} onChange={(e) => setNdaChecked(e.target.checked)} />
              <span>I agree to sign a mutual <span className="font-semibold">NDA</span> before sharing detailed project information.</span>
            </label>
          )}

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {showCaptcha && (
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-slate-600">Prove you&apos;re not a robot</span>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="w-10 h-10 flex items-center justify-center border border-slate-300 rounded-md text-slate-700 bg-white">{num1}</span>
                        <span className="text-lg text-slate-700 font-semibold">+</span>
                        <span className="w-10 h-10 flex items-center justify-center border border-slate-300 rounded-md text-slate-700 bg-white">{num2}</span>
                        <span className="text-lg text-slate-700 font-semibold">=</span>
                        <input type="number" className="w-16 h-10 border border-slate-300 rounded-md px-2 text-sm outline-none focus:ring-2 focus:ring-sky-300 bg-white" value={userAnswer} onChange={handleCaptchaChange} placeholder="?" />
                    </div>
                    {touched && !isCorrect && <p className="text-xs text-red-500">Wrong answer! Try again.</p>}
                    {touched && isCorrect && <p className="text-xs text-emerald-600">Great! Captcha verified.</p>}
                </div>
            )}
            <button type="submit" disabled={submitDisabled} className={`inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold transition-all w-full md:w-auto ${submitDisabled ? "bg-sky-200 text-sky-800 cursor-not-allowed" : `${colors.btn} text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5`}`}>
              {submitting ? "Submitting…" : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InquiryForm;

/* --- HELPER COMPONENTS --- */

function FloatingInput({ id, name, label, placeholder, type = "text", required }) {
  return (
    <div className="h-12 border border-slate-300 rounded-lg bg-white px-3 relative focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-200 transition-all">
      <label htmlFor={id} className="inline-block px-1 text-[11px] text-slate-500 bg-white relative -top-4 left-1 font-medium">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input id={id} name={name || id} type={type} placeholder={placeholder} maxLength={70} required={required} className="w-full border-none outline-none bg-transparent text-sm text-slate-800 relative -top-4 placeholder:text-slate-400" />
    </div>
  );
}

// -----------------------------------------------------
// UPDATED PHONE FIELD WITH REAL IMAGES (FLAGCDN)
// -----------------------------------------------------
function PhoneField({ phone, setPhone, label, placeholder, selectedCountry, setSelectedCountry }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const filteredCountries = countryList.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.dial.includes(search)
  );

  return (
    <div className="relative h-12 border border-slate-300 rounded-lg bg-white px-2 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-200 transition-all z-20">
      <label className="inline-block px-1 text-[11px] text-slate-500 bg-white relative -top-4 left-1 font-medium">
        {label}<span className="text-red-500 ml-0.5">*</span>
      </label>
      
      <div className="relative -top-2 flex items-center gap-2">
        {/* Country Selector Button */}
        <div ref={dropdownRef} className="relative">
            <button 
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2 py-1 rounded-md transition-colors cursor-pointer min-w-[70px]"
            >
                {/* Real Image Flag */}
                <img 
                    src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`} 
                    alt={selectedCountry.code} 
                    className="w-5 h-3.5 object-cover rounded-sm"
                />
                <span className="text-xs font-bold text-slate-700">{selectedCountry.dial}</span>
                <FaChevronDown className={`text-[8px] text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-hidden z-50 flex flex-col animate-in fade-in zoom-in-95 duration-100">
                    <div className="p-2 border-b border-slate-100 bg-slate-50 sticky top-0">
                        <div className="flex items-center gap-2 bg-white px-2 py-1.5 rounded-lg border border-slate-200 focus-within:border-sky-400">
                            <FaSearch className="text-slate-400 text-xs"/>
                            <input 
                                className="w-full text-xs bg-transparent outline-none placeholder:text-slate-400 text-slate-700"
                                placeholder="Search country..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="overflow-y-auto flex-1 p-1">
                        {filteredCountries.map((c) => (
                            <button
                                key={c.code}
                                type="button"
                                onClick={() => {
                                    setSelectedCountry(c);
                                    setIsOpen(false);
                                    setSearch("");
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-sky-50 rounded-lg transition-colors ${selectedCountry.code === c.code ? 'bg-sky-50 text-sky-700' : 'text-slate-600'}`}
                            >
                                <img 
                                    src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`} 
                                    alt={c.code} 
                                    className="w-5 h-3.5 object-cover rounded-sm shadow-sm"
                                />
                                <span className="text-xs font-medium flex-1 truncate">{c.name}</span>
                                <span className="text-xs text-slate-400 font-mono">{c.dial}</span>
                            </button>
                        ))}
                        {filteredCountries.length === 0 && (
                            <div className="p-3 text-center text-xs text-slate-400">No countries found</div>
                        )}
                    </div>
                </div>
            )}
        </div>

        <input
          type="tel"
          name="phone"
          placeholder={placeholder}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="flex-1 border-none outline-none bg-transparent text-sm text-slate-800 pl-1 focus:ring-0 placeholder:text-slate-400"
          maxLength={15}
          required
        />
      </div>
    </div>
  );
}