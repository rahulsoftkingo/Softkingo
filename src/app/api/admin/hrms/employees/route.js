// src/app/api/admin/hrms/employees/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const department = searchParams.get('department') || '';
  const status = searchParams.get('status') || 'active';

  const where = {
    department: { not: null }, // Only HR employees
    ...(q && {
      OR: [
        { name: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
        { title: { contains: q, mode: 'insensitive' } },
        { department: { contains: q, mode: 'insensitive' } }
      ]
    }),
    ...(department && { department }),
    ...(status !== 'all' && { status })
  };

  const [employees, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true, name: true, email: true, department: true, title: true, phone: true,
        employeeSalary: {
          select: { 
            id: true, baseSalary: true, netSalary: true, payPeriod: true, status: true 
          }
        },
        attendances: {
          where: { clockOut: null }, // Current active attendance
          take: 1
        }
      },
      orderBy: { name: 'asc' }
    }),
    prisma.user.count({ where })
  ]);

  return NextResponse.json({ employees, total });
}
