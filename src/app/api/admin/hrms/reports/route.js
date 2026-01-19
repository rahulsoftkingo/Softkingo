// src/app/api/admin/hrms/reports/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // ✅ FIXED: Proper Date objects
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
  
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const [attendanceToday, totalLeavesPending, totalEmployees, payrollThisMonth] = await Promise.all([
    // ✅ FIXED: Today attendance
    prisma.attendance.count({
      where: {
        clockIn: {
          gte: todayStart,  // ✅ Date object
          lte: todayEnd     // ✅ Date object
        }
      }
    }),
    // Pending leaves
    prisma.leaveRequest.count({ where: { status: 'pending' } }),
    // Total employees (with department)
    prisma.user.count({ where: { department: { not: null } } }),
    // This month payroll
    prisma.employeeSalary.aggregate({
      where: { payPeriod: currentMonth },
      _sum: { netSalary: true },
      _count: true
    })
  ]);

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    stats: {
      attendanceToday,
      leavesPending: totalLeavesPending,
      totalEmployees,
      payrollThisMonth: {
        totalAmount: Number(payrollThisMonth._sum?.netSalary || 0),
        employeeCount: payrollThisMonth._count
      }
    }
  });
}
