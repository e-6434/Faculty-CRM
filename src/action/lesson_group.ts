'use server'
import { authOption } from "@/libs/next-auth";
import prismadb from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

type LessonGroupData={
  lessonName : string  
  teacher  :string  
  hour :  string  
  year  : string 
  term:  string 
  class: string  
  grupID: string  |null
  day : string  
  }
export const SearchTeacher_For_Insert_LessonGroup= async ( )=>{
  
  try {
      const teacher = await prismadb.user.findMany({

        where:{
          role:'TEACHER'
        },
        orderBy:{
          id:'desc'
        }
    })
 return teacher as any 
 

  } catch (error) {
    console.log('SearchTeacher_For_Insert_LessonGroup', error);
   
  }
}
export const SearchLesson_For_Insert_LessonGroup= async ( )=>{
  
  try {
      const lesson = await prismadb.lesson.findMany({
        orderBy:{
          id:'desc'
        }
    })
 return lesson as any 
 

  } catch (error) {
    console.log('SearchLesson_For_Insert_LessonGroup', error);
   
  }
}
export const CreateLessonGroup= async (data :any )=>{
  const grupID = data.grupID as string;
      const lessonName = data.lessonName 
      const lesson_id = lessonName.split('-')[0]as string;
      const number_group = data.group;
      const teacher = data.teacher 
      const teacher_id = teacher.split('-')[0]as string;
 
         try {
    
      const lessonGroup = await prismadb.lesson_group.create({
        data:{
            group_id:grupID,
            lesson_id:lesson_id ,
            teacher_id:teacher_id  ,
            number_group:number_group,
  
        }
      })
      
   revalidatePath('./forms/groupLesson');
     
 
  console.log(parseInt(grupID));
  console.log( String(lesson_id)   );
  console.log( teacher_id  );
  
  
  
    return {success:true};
    } catch (error) {
      console.log('lessonGroup', error);
      return {success: false} 
      
    }
    }


    type Search={
      class:string
      term:string
      year:string
    }
    export const SearchLessonGroup= async (formData:Search)=>{
      
      
 
             try {
              const lessonGroupData  = await prismadb.$queryRaw`SELECT *  FROM lesson_group WHERE SUBSTRING(group_id,-2,1) = ${formData.class} and SUBSTRING(group_id,-4,1) = ${formData.term} and SUBSTRING(group_id,-8,4) = ${formData.year} ;`
         
 
 
        return lessonGroupData as any;
        } catch (error) {
          console.log('lessonGroup', error);
          return {success: false} 
          
        }
        }

    export const AllSearchLessonGroup= async ( )=>{
      try {
      const lessonGroupData  = await prismadb.lesson_group.findMany(); 
        return lessonGroupData as any;
        } catch (error) {
          console.log('lessonGroup', error);
          return {success: false} 
          
        }
        }

  
 export const UpdatLessonGroup = async (data:any ,data2:any)=>{ 
 
  try {
    const grupID = data.grupID as string;
    const lessonName = data.lessonName 
    const lesson_id = lessonName.split('-')[0]as string;

    const teacher = data.teacher 
    const teacher_id = teacher.split('-')[0]as string;
 
 
   
 const update = await prismadb.lesson_group.update({
  where:{
group_id:data2.group_id as string
  },
  data:{

    group_id:grupID,
    lesson_id:lesson_id ,
    teacher_id:teacher_id  ,

  }
 })  


 return {success:true}

  } catch (error) {
    console.log('UpdateLessonAction', error);
    return {success:false}
  }

}
  
 
export const SearchLessonGroupByTerm= async (formData:any )=>{
  try {
const lessonGroupData  = await prismadb.$queryRaw`SELECT *  FROM lesson_group WHERE  SUBSTRING(group_id,-4,1) = ${formData.term} and SUBSTRING(group_id,-8,4) = ${formData.year} ;`



return lessonGroupData as any;
} catch (error) {
console.log('lessonGroup', error);
return {success: false} 

}
    }
export const SearchLessonGroupByTeacher= async (formData:any )=>{
  const session = await getServerSession(authOption);
  const teacherid = session?.user.userId as string
  try {
const lessonGroupData  = await prismadb.$queryRaw`SELECT *  FROM lesson_group WHERE  SUBSTRING(group_id,-4,1) = ${formData.term} and SUBSTRING(group_id,-8,4) = ${formData.year} and teacher_id = ${teacherid} ;`



return lessonGroupData as any;
} catch (error) {
console.log('lessonGroup', error);
return {success: false} 

}
    }
 