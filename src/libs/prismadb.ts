import { PrismaClient } from "@prisma/client";
const prismaClientsingleton=()=>{
  return new PrismaClient();
};

type PrismaClientsingleton= ReturnType<typeof prismaClientsingleton>;
const globalForPrisma = globalThis as unknown as {
  prisma : PrismaClientsingleton |undefined;
};
const prismadb = globalForPrisma.prisma ?? prismaClientsingleton();

export default prismadb;
if(process.env.NODE_ENV!== 'production') globalForPrisma.prisma = prismadb;