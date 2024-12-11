'use server'

import prismadb from "@/libs/prismadb";
  import LeftSlideTeacher from "./left-main-lesson";



const AdminClassList = async ( ) => {
  

  const user2 = await prismadb.user.findMany({
    take:5,
    orderBy:{
      id:'desc'
    }
  })

 
 
 
  
  return  <LeftSlideTeacher  data = {user2 as any} />
}
 
export default AdminClassList;