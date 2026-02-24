// src/components/common/PhoneField.jsx

'use client';

import { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { countryList } from "@/data/countries";

/**
 * Shared PhoneField component with country selector and flag logic.
 */
export default function PhoneField({
    phone,
    setPhone,
    label = "Phone Number",
    placeholder = "Enter phone number",
    selectedCountry,
    setSelectedCountry,
    required = true,
    name = "phone"
}) {
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
                {label}{required && <span className="text-red-500 ml-0.5">*</span>}
            </label>

            <div className="relative -top-2 flex items-center gap-2 w-full">
                {/* Country Selector Button */}
                <div ref={dropdownRef} className="relative flex-shrink-0">
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-1.5 py-1 rounded-md transition-colors cursor-pointer min-w-[65px]"
                    >
                        <img
                            src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
                            alt={selectedCountry.code}
                            className="w-4 h-2.5 object-cover rounded-sm"
                        />
                        <span className="text-[11px] font-bold text-slate-700">{selectedCountry.dial}</span>
                        <FaChevronDown className={`text-[7px] text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-hidden z-50 flex flex-col animate-in fade-in zoom-in-95 duration-100">
                            <div className="p-2 border-b border-slate-100 bg-slate-50 sticky top-0">
                                <div className="flex items-center gap-2 bg-white px-2 py-1.5 rounded-lg border border-slate-200 focus-within:border-sky-400">
                                    <FaSearch className="text-slate-400 text-xs" />
                                    <input
                                        className="w-full text-xs bg-transparent outline-none placeholder:text-slate-400 text-slate-700"
                                        placeholder="Search country..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                            </div>
                            <div className="overflow-y-auto flex-1 p-1 no-scrollbar">
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
                                            className="w-4 h-2.5 object-cover rounded-sm shadow-sm"
                                        />
                                        <span className="text-xs font-medium flex-1 truncate">{c.name}</span>
                                        <span className="text-xs text-slate-400 font-mono">{c.dial}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <input
                    type="tel"
                    name={name}
                    placeholder={placeholder}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 w-full border-none outline-none bg-transparent text-sm text-slate-800 focus:ring-0 placeholder:text-slate-300"
                    maxLength={15}
                    required={required}
                />
            </div>
        </div>
    );
}
