// app/(public)/components/InquiryForm.jsx
"use client";

import { useEffect, useState } from "react";
import { FaPaperclip } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import BudgetSlider from "@/components/footer/BudgetSlider";

const colorMap = {
  sky: {
    btn: "bg-sky-500 hover:bg-sky-600",
    pill: "text-sky-700 border-sky-100 bg-sky-50",
  },
  cyan: {
    btn: "bg-cyan-500 hover:bg-cyan-600",
    pill: "text-cyan-700 border-cyan-100 bg-cyan-50",
  },
  blue: {
    btn: "bg-blue-500 hover:bg-blue-600",
    pill: "text-blue-700 border-blue-100 bg-blue-50",
  },
};

const InquiryForm = ({
  showHeader = true,
  title = "Hey! there 🙂",
  subtitle = "Share a bit about your project and we’ll get back quickly.",
  tagline = "Quick inquiry",
  submitLabel = "Submit Form",
  primaryColor = "sky", // 'sky' | 'cyan' | 'blue'

  // NEW: lead meta, default inquiry + home
  formType = "inquiry",
  formKey = "home-inquiry",
}) => {
  const [phone, setPhone] = useState("");
  const [fileName, setFileName] = useState("");
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [touched, setTouched] = useState(false);
  const [ndaChecked, setNdaChecked] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message }

  const colors = colorMap[primaryColor] || colorMap.sky;

  useEffect(() => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    setNum1(a);
    setNum2(b);
  }, []);

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

  const submitDisabled = !isCorrect || !ndaChecked || submitting;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitDisabled) return;

    setSubmitting(true);
    setToast(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const company = formData.get("company");
    const message = formData.get("message");
    const phoneValue = formData.get("phone") || phone;

    const file = formData.get("fileInput");
    const attachmentName =
      typeof file === "object" && file?.name ? file.name : fileName || null;

    const budgetLabel = formData.get("budgetLabel") || null;

    try {
      const res = await fetch("/api/public/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phoneValue,
          company,
          message,
          budgetLabel,
          formType,        // from props
          formKey,         // from props
          ndaAccepted: ndaChecked,
          attachmentName,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setToast({
          type: "error",
          message: data.message || "Something went wrong. Please try again.",
        });
        setSubmitting(false);
        return;
      }

      setToast({
        type: "success",
        message: "Thank you! Your inquiry has been submitted.",
      });

      // optional: clear basic fields (captcha + nda reset bhi)
      e.target.reset();
      setPhone("");
      setFileName("");
      setUserAnswer("");
      setIsCorrect(false);
      setTouched(false);
      setNdaChecked(false);
    } catch (err) {
      console.error(err);
      setToast({
        type: "error",
        message: "Unable to submit right now. Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      {/* Toast */}
      {toast && (
        <div
          className={`pointer-events-none absolute inset-x-0 -top-10 flex justify-center z-10`}
        >
          <div
            className={`pointer-events-auto rounded-full px-4 py-2 text-xs font-medium shadow-md flex items-center gap-2 ${
              toast.type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                : "bg-rose-50 text-rose-700 border border-rose-100"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            <span>{toast.message}</span>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="ml-1 text-[10px] text-slate-400 hover:text-slate-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-sky-100 shadow-[0_24px_60px_rgba(15,23,42,0.12)] overflow-hidden w-full">
        {showHeader && (
          <div className="px-5 pt-4 pb-3 border-b border-slate-100 text-center space-y-1">
            {tagline && (
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-400">
                {tagline}
              </p>
            )}
            <h3 className="text-xl md:text-2xl font-semibold text-sky-700">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs md:text-sm text-slate-500 max-w-sm mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="px-5 md:px-6 py-5 space-y-4">
          {/* Basic fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FloatingInput
              id="name"
              name="name"
              label="Your Name"
              required
              placeholder="Enter your name"
            />
            <FloatingInput
              id="email"
              name="email"
              type="email"
              label="Email address"
              required
              placeholder="Enter your email"
            />
            <PhoneField phone={phone} setPhone={setPhone} />
            <FloatingInput
              id="company"
              name="company"
              label="Company"
              required
              placeholder="Company Name"
            />
          </div>

          {/* Budget slider */}
          <div className="mt-1 h-14 rounded-lg border border-slate-300 bg-white px-3 flex items-center">
            {/* make sure BudgetSlider internally sets a hidden input name="budgetLabel" */}
            <BudgetSlider />
          </div>

          {/* Message */}
          <div className="rounded-lg border border-slate-300 bg-white px-3 pt-1 pb-2">
            <label
              className="inline-block px-1 text-[11px] text-slate-500 bg-white relative -top-2 left-1"
              htmlFor="message"
            >
              Message<span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Brief about the project"
              rows={4}
              className="w-full border-none outline-none resize-none text-sm text-slate-700 bg-transparent pb-1"
            />
          </div>

          {/* Attachment */}
          <div className="h-14 rounded-lg border border-slate-300 bg-white px-3 flex flex-col justify-center">
            <label
              className="inline-block px-1 text-[11px] text-slate-500 bg-white relative -top-3 left-1"
              htmlFor="fileInput"
            >
              Attachment
            </label>
            <div className="relative -top-1 flex items-center gap-2 text-sm text-slate-600">
              <input
                type="file"
                id="fileInput"
                name="fileInput"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
              <FaPaperclip className="text-slate-500" size={18} />
              <span className="truncate">
                {fileName || "Choose a file..."}
              </span>
            </div>
          </div>

          {/* NDA */}
          <label className="mt-2 flex items-start gap-2 text-xs md:text-sm text-slate-700 max-w-lg">
            <input
              type="checkbox"
              className="mt-1 accent-[#00B7FF]"
              checked={ndaChecked}
              onChange={(e) => setNdaChecked(e.target.checked)}
            />
            <span>
              I agree to sign a mutual <span className="font-semibold">NDA</span>{" "}
              before sharing detailed project information.
            </span>
          </label>

          {/* Captcha + Submit row */}
          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Captcha */}
            <div className="flex flex-col gap-1">
              <span className="text-sm text-slate-600">
                Prove you&apos;re not a robot
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-10 h-10 flex items-center justify-center border border-slate-300 rounded-md text-slate-700 bg-white">
                  {num1}
                </span>
                <span className="text-lg text-slate-700 font-semibold">+</span>
                <span className="w-10 h-10 flex items-center justify-center border border-slate-300 rounded-md text-slate-700 bg-white">
                  {num2}
                </span>
                <span className="text-lg text-slate-700 font-semibold">=</span>
                <input
                  type="number"
                  className="w-[60px] h-10 border border-slate-300 rounded-md px-2 text-sm outline-none focus:ring-2 focus:ring-sky-300 bg-white"
                  value={userAnswer}
                  onChange={handleCaptchaChange}
                  placeholder="?"
                />
              </div>
              {touched && !isCorrect && (
                <p className="text-xs text-red-500">
                  Wrong answer! Try again.
                </p>
              )}
              {touched && isCorrect && (
                <p className="text-xs text-emerald-600">
                  Great! Captcha verified.
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={submitDisabled}
              className={`inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                submitDisabled
                  ? "bg-sky-200 text-sky-800 cursor-not-allowed"
                  : `${colors.btn} text-white shadow-[0_12px_30px_rgba(0,183,255,0.45)]`
              }`}
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

/* Helper fields */

function FloatingInput({
  id,
  name,
  label,
  placeholder,
  type = "text",
  required,
}) {
  return (
    <div className="h-14 border border-slate-300 rounded-lg bg-white px-3 relative">
      <label
        htmlFor={id}
        className="inline-block px-1 text-[11px] text-slate-500 bg-white relative -top-2 left-1"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        name={name || id}
        type={type}
        placeholder={placeholder}
        maxLength={70}
        required={required}
        className="w-full border-none outline-none bg-transparent text-sm text-slate-700 relative -top-1"
      />
    </div>
  );
}

function PhoneField({ phone, setPhone }) {
  return (
    <div className="relative h-14 border border-slate-300 rounded-lg bg-white px-2">
      <label className="inline-block px-1 text-[11px] text-slate-500 bg-white relative -top-2 left-1">
        Phone Number<span className="text-red-500">*</span>
      </label>
      <div className="relative -top-1">
        <PhoneInput
          country={"in"}
          value={phone}
          onChange={(value) => setPhone(value)}
          inputProps={{
            name: "phone",
            required: true,
          }}
          containerStyle={{
            border: "none",
            width: "100%",
          }}
          inputStyle={{
            border: "none",
            boxShadow: "none",
            backgroundColor: "transparent",
            width: "100%",
            fontSize: "0.875rem",
          }}
          buttonStyle={{
            border: "none",
            backgroundColor: "transparent",
            borderRight: "1px solid #CBD5E1",
          }}
        />
      </div>
    </div>
  );
}
