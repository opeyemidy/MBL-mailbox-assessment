import 'dotenv/config';
import { PrismaClient } from '@/lib/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.message.deleteMany();
  await prisma.user.deleteMany();

  const jim = await prisma.user.create({
    data: { name: 'Jim' },
  });
  const John = await prisma.user.create({
    data: { name: 'John' },
  });

  await prisma.message.createMany({
    data: [
      {
        userId: jim.id,
        subject: 'Welcome aboard!',
        content:
          "Hey Jim, welcome to the team! We're really excited to have you with us. Feel free to reach out if you need anything at all.",
        isRead: true,
        createdAt: new Date('2026-06-01T08:00:00Z'),
      },
      {
        userId: jim.id,
        subject: 'Project kickoff tomorrow',
        content:
          'Just a reminder that the project kickoff meeting is scheduled for tomorrow at 10am. Please review the brief beforehand so we can hit the ground running.',
        isRead: true,
        createdAt: new Date('2026-06-02T09:30:00Z'),
      },
      {
        userId: jim.id,
        subject: 'Quick question about the report',
        content:
          'Hi Jim, I had a quick question about the Q2 report you sent over. Specifically the revenue figures on page 4 — can you double check those numbers?',
        isRead: true,
        createdAt: new Date('2026-06-03T11:00:00Z'),
      },
      {
        userId: jim.id,
        subject: 'Lunch plans?',
        content:
          "Hey, a few of us are heading out for lunch around 1pm. You're welcome to join if you're free! We're thinking the Italian place around the corner.",
        isRead: true,
        createdAt: new Date('2026-06-03T12:15:00Z'),
      },
      {
        userId: jim.id,
        subject: 'Updated design files',
        content:
          "I've uploaded the updated design files to the shared drive. There are quite a few changes so please take a look when you get a chance and let me know your thoughts.",
        isRead: true,
        createdAt: new Date('2026-06-04T08:45:00Z'),
      },
      {
        userId: jim.id,
        subject: 'Hi Again',
        content:
          'Just wanted to check on you. Hope everything is going well on your end. Let me know if you need anything from me!',
        isRead: true,
        createdAt: new Date('2026-06-04T10:00:00Z'),
      },
      {
        userId: jim.id,
        subject: 'Server downtime notice',
        content:
          'Please be aware that the main server will be going down for scheduled maintenance this Saturday from 2am to 6am. Plan your work accordingly.',
        isRead: false,
        createdAt: new Date('2026-06-04T13:00:00Z'),
      },
      {
        userId: jim.id,
        subject: 'Invoice #1042 due',
        content:
          'This is a reminder that invoice #1042 for $3,200 is due on June 10th. Please process the payment at your earliest convenience to avoid any late fees.',
        isRead: false,
        createdAt: new Date('2026-06-04T14:30:00Z'),
      },
      {
        userId: jim.id,
        subject: 'Hi Friend',
        content:
          "Just wanted to let you know I'm doing great! Things have been busy but in a good way. Let's catch up soon over coffee.",
        isRead: false,
        createdAt: new Date('2026-06-04T16:00:00Z'),
      },
      {
        userId: jim.id,
        subject: 'Action required: approve PR #88',
        content:
          "Your review is needed on pull request #88. The changes include the new authentication flow and some bug fixes. Please take a look when you're available.",
        isRead: false,
        createdAt: new Date('2026-06-04T17:45:00Z'),
      },
    ],
  });

  console.log('✅ Seed complete: 1 user, 10 messages (6 read, 4 unread)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
