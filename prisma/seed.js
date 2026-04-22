// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Admin@123', 10);

  // create roles if not exist
  const roleData = [
    { name: 'admin', displayName: 'Administrator', description: 'Full access to all modules.', defaultRoute: '/admin/dashboard' },
    { name: 'manager', displayName: 'Manager', description: 'Manage leads, tickets, and content.', defaultRoute: '/admin/dashboard' },
    { name: 'writer', displayName: 'Content Writer', description: 'Create and edit blog posts and pages.', defaultRoute: '/admin/blog' },
    { name: 'agent', displayName: 'Support Agent', description: 'Handle support tickets and chats.', defaultRoute: '/admin/tickets' },
    { name: 'hr', displayName: 'HR Manager', description: 'Manage employee directory and attendance.', defaultRoute: '/admin/users' },
    { name: 'employee', displayName: 'Employee', description: 'View own attendance and profile.', defaultRoute: '/admin/profile' },
  ];

  for (const role of roleData) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: role,
      create: role,
    });
  }

  const adminRole = await prisma.role.findUnique({ where: { name: 'admin' } });

  // create admin user
  const adminUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      name: 'Ansh',
      email: 'admin@softkingo.com',
      username: 'admin',
      passwordHash,
      status: 'active',
      profileImage: '/images/ansh.jpeg',
    },
  });

  // link role
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: adminUser.id,
        roleId: adminRole.id,
      },
    },
    update: {},
    create: {
      userId: adminUser.id,
      roleId: adminRole.id,
    },
  });

  console.log('Seeded roles and admin user:');
  console.log('Roles: admin, manager, writer, agent, hr, employee');
  console.log('Admin login: admin / Admin@123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
