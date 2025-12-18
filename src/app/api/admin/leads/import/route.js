import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

function isAdminOrManager(session) {
  const roles = session?.user?.roles || [];
  return roles.includes('admin') || roles.includes('manager');
}

// tiny CSV parser for simple files
function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = (values[i] || '').trim();
    });
    return obj;
  });
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session || !isAdminOrManager(session)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!file || typeof file === 'string') {
    return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
  }

  const text = await file.text();
  const rows = parseCsv(text);

  if (!rows.length) {
    return NextResponse.json(
      { message: 'No valid rows found in CSV.' },
      { status: 400 }
    );
  }

  let created = 0;
  for (const row of rows) {
    const name = row.name || row.Name;
    const email = row.email || row.Email;
    if (!name || !email) continue;

    await prisma.lead.create({
      data: {
        name,
        email,
        phone: row.phone || row.Phone || null,
        whatsapp: row.whatsapp || row.Whatsapp || null,
        source: row.source || row.Source || 'import',
        campaign: row.campaign || row.Campaign || null,
        message: row.message || row.Message || null,
        status: row.status || row.Status || 'new',
        formType: row.formType || row.FormType || null,
        formKey: row.formKey || row.FormKey || null,
      },
    });
    created += 1;
  }

  return NextResponse.json({ ok: true, created }, { status: 201 });
}
