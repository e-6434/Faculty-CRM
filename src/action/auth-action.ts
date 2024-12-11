'use server'
import prismadb from "@/libs/prismadb";
 import { hash } from "bcrypt";
import { revalidatePath } from "next/cache";
import fs from 'fs';
 import { error } from "console";
import { getServerSession } from "next-auth";
import { authOption } from "@/libs/next-auth";
import { user_role } from "@prisma/client";
  
type FormData2={
  id:number
  name:string
  email:string
  family:string
  password:string
  education:string
  expertise:string
  phon:number
     
  }
 
  type data={
    id:number
    name:string
    email:string
    family:string
    password:string
    education:string
    expertise:string
    phon:number
       
    }
   
export const CreateUserAction = async (formData:any , role:user_role)=>{
  try {

    const name = formData.name  
    const family = formData.family  
    const password = formData.password  
    const education = formData.education 
    const expertise = formData.expertise 
    const phon = formData.phon;
    const email = formData.email 
    
 
  
     const hashedPassword2  = await hash(password as string ,12);

 
     const user = await prismadb.user.create({
      data:{
          name : name as string,
          email: email as string,
          hashedPassword : hashedPassword2 as string,
          family :family as string,
          education:education as string,
          expertise:expertise as string,
          phon: phon as string,
          role: role as user_role
      }
     }); 

 

    if(user) return {success: true};
     
  
    

  } catch (error) {
    console.log('CreateUserAction', error);
    return {success: false};
  }

}
export const CreateUserActionImage = async (data:any)=>{
  try {
    const image = data.getAll('image')[0] 
    const email = data.getAll('email')[0]
    const filePath = `public/profile/${image.name}`;
     const imageData = fs.readFileSync( filePath);
 
     const user = await prismadb.user_image.create({
      data:{
          
          email:email,
          image: imageData
         
      }
     }); 

 

    if(user){ return {success: false};}
    

  } catch (error) {
    console.log('CreateUserAction', error);
    return {success: false};
  }

}

export const CheckUserEmail = async (formdata:FormData)=>{
  try {
    const { email } = Object.fromEntries(formdata);
    const user = await prismadb. user.findUnique({
      where:{
        email :email as string,
       
      }
    })

    if(!user) return {success: false};
    return {success: true} 

  } catch (error) {
    console.log('CreateUserid', error);

  }
}

export const SearchUser  = async (formdata:any)=>{
  
  try {
 const name = formdata.name as string
 const family = formdata.family as string
 const expertise = formdata.expertise as string
 const email = formdata.email as string
 const phon = formdata.phon
 const education = formdata.education as string
if (!name) {
 
}
    
     const user = await prismadb.user.findMany({
      where:{
        AND: [
          ...(name ? [{ name: { contains: name } }] : []), // شرط برای نام
          ...(family ? [{ family: { contains: family } }] : []), // شرط برای نام
           ...(expertise ? [{ expertise: { contains: expertise } }] : []), // شرط برای نام
          ...(email ? [{ email: { contains: email } }] : []), // شرط برای نام
          ...(phon ? [{ phon: { contains: phon } }] : []), // شرط برای نام
          ...(education ? [{ education: { contains: education } }] : []), // شرط برای نام
        ].filter(Boolean),
 
      }
    })
   
 
 
      return user as any 
 
    
    
  } catch (error) {
    console.log('SearchUser', error);
   
  }
}
export const SearchLesson  = async (formdata:any)=>{
  
  try {
 const name = formdata.name as string
  const value = formdata.value as string
 const book = formdata.book as string
     
     const lesson = await prismadb.lesson.findMany({
      where:{
        AND: [
          ...(name ? [{ name: { contains: name } }] : []), // شرط برای نام
            ...(value ? [{ value: { contains: value } }] : []), // شرط برای نام
          ...(book ? [{ book: { contains: book } }] : []), // شرط برای نام
           ].filter(Boolean),
 
      }
    })
   
 
 
      return lesson as any 
 
    
    
  } catch (error) {
    console.log('Searchlesson', error);
   
  }
}
 
export const SearchUserById  = async (id2:number)=>{
  try {
    const user2 = await prismadb.user.findMany({
      where:{
      id:id2
  }
})
if (!user2) {
  console.log('====================================');
  console.log('error' , error);
  console.log('====================================');
}
   return user2 as any; 
  } catch (error) {
      
    console.log('====================================');
    console.log('error' , error);
    console.log('====================================');
  }
//  const user = await prismadb.$queryRaw`SELECT user_image.image, user.name,user.family , user.phon , user.email ,user.id FROM user_image LEFT JOIN user ON user_image.email = user.email where user.id = ${id}   `;

 
 
}
 
export const SearchUserImage= async (data:string )=>{
  try {
      const userImage = await prismadb.user_image.findMany({
      where:{
        email: data 
      }
 })
 
 return userImage[0]?.image as any
 
  } catch (error) { 
    console.log('SearchUser', error);
   
  }
}

export const CheckUserSession= async (  )=>{
 
  try {
     
    const session = await getServerSession(authOption);
    const user = await prismadb.user.findUnique({
    where:{
      id:  parseInt(session?.user.userId as any) 
    }
})
 
return user as any

} catch (error) { 
  console.log('session server eror :', error);
  return null 
}
 
  
}

export const UpdateUserAction = async (formdata:any)=>{ 
  try {
    const id = formdata.id;
    const name = formdata.name as string;
   
    const family = formdata.family as string;
    const expertise = formdata.expertise as string;
    const education = formdata.education as string;
    const phon = formdata.phon as string;
 
    const lesson = await prismadb.user.update({
      where:{
        id:id
      },
      data:{
        name: name as string,
        family: family as string,
        expertise: expertise as string,
        education: education as string,
        phon: phon as string,
 
      }
    })
 
  } catch (error) {
    console.log('UpdateLessonAction', error);
  }

}
export const UpdateUserActionImage = async (data:any)=>{ 
  try {
    const image = data.getAll('image')[0] 
    const email = data.getAll('email')[0]
    const filePath = `public/profile/${image.name}`;
     const imageData = fs.readFileSync( filePath);
 
    const lesson = await prismadb.user_image.update({
      where:{
       email:email
      },
      data:{
      image:imageData
 
      }
    })
 
  } catch (error) {
    console.log('UpdateLessonAction', error);
  }

}