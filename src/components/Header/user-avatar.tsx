// import prismadb from '@/libs/prismadb';
// import { getServerSession, Session } from 'next-auth';
// import Link from 'next/link';
 
// import DropdownUser from './DropdownUser';
// import { authOption } from '@/libs/next-auth';

// type UserAvatarProps = {
//   session: Session | null;
// };

 


// const UserAvatar = async ({ session }: UserAvatarProps ) => {


//   const user = await prismadb.user.findUnique({
//     where: {
//       id:parseInt(session?.user.userId  as string)
//     },
//   });

  
//   return <DropdownUser user={user as any}   />;
// };

// export default UserAvatar;