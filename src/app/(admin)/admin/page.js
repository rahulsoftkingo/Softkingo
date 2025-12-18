// src/app/(admin)/admin/page.jsx
import { redirect } from 'next/navigation';

export default function AdminRootPage() {
  redirect('/admin/dashboard');
}
