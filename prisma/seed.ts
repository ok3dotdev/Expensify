import { hashPassword } from '@/lib/auth';
import { db } from '@/lib/db';

async function main() {
  const user = await db.user.upsert({
    where: { email: 'admin@ok3.com' },
    update: {},
    create: {
      email: 'admin@ok3.com',
      firstName: 'ok3',
      lastName: 'admin',
      password: await hashPassword('password'),
    },
  });
  console.log(user);
}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
