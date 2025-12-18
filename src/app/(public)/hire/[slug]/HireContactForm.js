
"use client"
import { useState } from 'react';

const HireContactForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    return (
        <div className="bg-gray-900 text-white p-8 rounded-xl h-fit sticky top-5">
            <h3 className="text-2xl font-bold mb-6 text-center">GET IN TOUCH</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name*"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address*"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number*"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                />
                <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-white border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 resize-none"
                />
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="privacy"
                        required
                        className="w-4 h-4"
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-300">
                        100% confidential and secure
                    </label>
                </div>
                <button
                    type="submit"
                    className="w-full bg-white text-black py-3 rounded-md font-semibold transition-colors"
                >
                    SUBMIT
                </button>
            </form>
        </div>
    )
}

export default HireContactForm