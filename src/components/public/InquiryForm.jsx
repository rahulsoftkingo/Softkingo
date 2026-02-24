// app/(public)/components/InquiryForm.jsx

"use client";

import { useEffect, useState } from "react";
import { FaPaperclip } from "react-icons/fa";
import { countryList } from "@/data/countries";
import PhoneField from "@/components/common/PhoneField";

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
      if (showCaptcha) {
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
            {/* <button type="submit" disabled={submitDisabled} className={`inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold transition-all w-full md:w-auto ${submitDisabled ? "bg-sky-200 text-sky-800 cursor-not-allowed" : `${colors.btn} text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5`}`}>
              {submitting ? "Submitting…" : submitLabel}
            </button> */}
            <button
              type="submit"
              disabled={submitting} // Only disable when actually submitting
              className={`inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold transition-all w-full md:w-auto text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer ${colors.btn} ${submitting ? 'opacity-70 cursor-wait' : ''}`}
            >
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