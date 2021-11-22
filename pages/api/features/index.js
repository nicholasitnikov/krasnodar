// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const streets = await prisma.street.findMany({ 
    where: {
      type_zone: 2
    },
    select: {
      address: true,
      id_6993: true,
      idx: true
    },
   });
  res.status(200).json(streets)
}
