'use server'
 
import prismadb from "@/libs/prismadb";
import { revalidatePath } from "next/cache";
 
import fs from 'fs';
 
 
export const CreateBookAction = async (formdata2 :any , formData3:any)=>{
  // try{
 const filedata =formData3.get('pdf');
 console.log('====================================');
 console.log('1');
 console.log('====================================');
 const filePath = `./public/pdf_file/${filedata.name}`;
 console.log('====================================');
 console.log('2');
 console.log('====================================');
 const pdf2 = fs.readFileSync( filePath);
 console.log('====================================');
 console.log(pdf2);
 console.log('====================================');
 
    
    
    
   const subject =formdata2.subject;
   const  name =formdata2.name;
    const number_of_book=formdata2.number_of_book;
    const  writer=formdata2.writer;
    const  nashername=formdata2.nashername;
    const  chap=formdata2.chap;
    const  many=formdata2.many;
    const  shabk=formdata2.shabk;

    console.log('====================================');
    console.log('4');
    console.log('====================================');
    const post = await prismadb.post.create({
       data:{ 
        pdf:pdf2,
        chap:'1',
        many:1,
        name:'1',
        nashername:'1',
        number_of_book:1 ,
        shabk:'1',
        subject: '1',
        writer: '1',
       
      }
    })
    console.log('====================================');
    console.log('5');
    console.log('====================================');
    if (!post) return {success: false} ;
     


revalidatePath('./admin');
  return {success:true};
  // } catch (error) {
  //   console.log('CreatePostAction', error);
  // }

}

export const DeletPostActiom = async ( id:number)=>{
try {
  await prismadb.post.delete({
    where:{
      id ,
    }
  })
  revalidatePath('/admin')
} catch (error) {
  console.log('DeletPostActiom', error);
  
}
}

export const uploadFile = async (data:any) => {
try{
  
  // const image = data.getAll('image')[0]
  // const filePath = `./public/profile/${image.name}`;
  // const imageData = await fs.promises.readFile(filePath);
  
  // const page = await prismadb.post.create({
  //   data: {
  //       name:'123',
  //       body:'123',
  //       pdf:imageData,
  //       writer:'123',
  //       number_of_book:123,
        
  //   },})
 
}
catch(err){console.log('uploadFile ', err);
}
 
};