// src/components/admin/BlogActions.jsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Trash2, Edit } from 'lucide-react';

export default function BlogActions({ blogId }) {
  const router = useRouter();

  const handleSoftDelete = async () => {
    // User confirmation
    if (!confirm('Are you sure you want to move this post to the trash?')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/blogs/${blogId}`, {
        method: 'PATCH', // Using PATCH for partial update (soft delete)
      });

      if (!res.ok) {
        throw new Error('Failed to delete the post.');
      }

      // Refresh the page to show the updated list
      router.refresh();
      alert('Post moved to trash.');

    } catch (error) {
      console.error(error);
      alert('Error: Could not move the post to trash.');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Link href={`/admin/blog/edit/${blogId}`} passHref>
        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-md">
          <Edit size={16} />
        </button>
      </Link>
      <button onClick={handleSoftDelete} className="p-2 text-red-600 hover:bg-red-100 rounded-md">
        <Trash2 size={16} />
      </button>
    </div>
  );
}