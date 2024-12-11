'use server'

import prismadb from "@/libs/prismadb";
import { revalidatePath } from "next/cache";


export const CreateLessonAction = async (  formdata:any)=>{
  try {
    const id = formdata.id as string;
    const name = formdata.name as string;
    const pishniaz_id = formdata.pishniaz_id as string;
    const value = formdata.value as string;
    const about = formdata.about as string;
    const book = formdata.book as string;
 
    const lesson = await prismadb.lesson.create({
      data:{
        id:parseInt(id as string),
        name: name as string,
        about: about as string,
        book: book as string,
        pishniaz_id:parseInt(pishniaz_id as string),
        value: value as string


      }
    })

    if (!lesson) return {success: false} ;
    revalidatePath('./admin');



  return {success:true};
  } catch (error) {
    console.log('CreateLessonAction', error);
  }

}

export const DeletLessonActiom = async ( id:number)=>{
  try {
    await prismadb.lesson.delete({
      where:{
        id
      }

    })
    revalidatePath('/forms/search/searchLesson')
  } catch (error) {
    console.log('DeletLessonActiom', error);
    
  }
  }

export const DeletLessonGroupActiom = async ( id:string)=>{
  try {
    await prismadb.lesson_group.delete({
      where:{
        group_id:id
      }

    })
    revalidatePath('/forms/search/searchLesson')
  } catch (error) {
    console.log('DeletLessonActiom', error);
    
  }
  }
export const DeletUserActiom = async ( id:number)=>{
  try {
    await prismadb.user.delete({
      where:{
        id
      }

    })
    revalidatePath('/forms/search/searchTeacher')
  } catch (error) {
    console.log('DeletTeacherActiom', error);
    
  }
  }

  export const UpdateLessonAction = async (  formdata:any)=>{ 
    try {
      const id = formdata.id;
      const name = formdata.name as string;
      const pishniaz_id = formdata.pishniaz_id as string;
      const value = formdata.value as string;
      const about = formdata.about as string;
      const book = formdata.book as string;
   
      const lesson = await prismadb.lesson.update({
        where:{
          id:id
        },
        data:{
          name: name as string,
          about: about as string,
          book: book as string,
          pishniaz_id:parseInt(pishniaz_id),
          value: value as string
        }
      })
    revalidatePath('/')
    } catch (error) {
      console.log('UpdateLessonAction', error);
    }
  
  }
  

  export const SearchLesson= async ( )=>{
  
    try {
        const lesson = await prismadb.lesson.findMany({
          orderBy:{
            id:'desc'
          }
      })
   return lesson as any 
   
  
    } catch (error) {
      console.log('SearchUser', error);
     
    }
  }
  export const Search_Lesson_By_Id= async (number:any )=>{
  
    try {
        const lesson = await prismadb.lesson.findMany({
          where:{
            id: parseInt(number) 
          }
      })
   return lesson as any 
   
  
    } catch (error) {
      console.log('SearchUser', error);
     
    }
  }


 