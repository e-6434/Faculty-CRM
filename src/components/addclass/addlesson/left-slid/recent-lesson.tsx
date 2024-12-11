'use server'

import prismadb from "@/libs/prismadb";
  import LeftSlideTeacher from "./left-main-lesson";



const AdminClassList2 = async ( ) => {
  

  const lesson = await prismadb.lesson.findMany({
    take:5,
    orderBy:{
      id:'desc'
    }
  })

 
 
 
  
  return  <LeftSlideTeacher  data = {lesson as any} />
}
 
export default AdminClassList2;