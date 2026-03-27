import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

const BlogCategorySelector = ({ value, onChange, className = "" }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/admin/blog-categories');
                if (!res.ok) throw new Error('Failed to fetch categories');
                const data = await res.json();
                setCategories(data.categories || []);
            } catch (err) {
                console.error('Error fetching blog categories:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className={`flex items-center gap-2 text-slate-400 text-xs h-[38px] px-3 border border-slate-200 rounded-lg bg-slate-50 ${className}`}>
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Loading categories...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`flex items-center gap-2 text-rose-500 text-xs h-[38px] px-3 border border-rose-200 rounded-lg bg-rose-50 ${className}`}>
                <AlertCircle className="h-3 w-3" />
                <span>Error loading categories</span>
            </div>
        );
    }

    return (
        <select
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={className}
        >
            <option value="">Latest / All Blogs (Default)</option>
            {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                    {cat.name}
                </option>
            ))}
        </select>
    );
};

export default BlogCategorySelector;
