// src/app/api/admin/hrms/payroll/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  })();

  const where = { payPeriod: period };

  const [salaries, totalBase, totalNet] = await Promise.all([
    prisma.employeeSalary.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, department: true, title: true } },
        payslips: {
          where: { period },
          select: { netPay: true, workedDays: true }
        }
      },
      orderBy: { baseSalary: 'desc' }
    }),
    prisma.employeeSalary.aggregate({
      where,
      _sum: { baseSalary: true },
      _count: true
    }),
    prisma.employeeSalary.aggregate({
      where,
      _sum: { netSalary: true }
    })
  ]);

  return NextResponse.json({ 
    salaries, 
    period,
    summary: {
      totalEmployees: totalBase._count,
      totalBaseSalary: Number(totalBase._sum.baseSalary || 0),
      totalNetSalary: Number(totalNet._sum.netSalary || 0)
    }
  });
}
