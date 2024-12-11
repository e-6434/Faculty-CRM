'use client'

import { useRef, useState } from "react";
//  import { $Enums } from "@prisma/client";
  
import Table from '@mui/joy/Table';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
// import {  CreateUserActionImage } from "@/action/auth-action";
// import SubmitButton from "@/components/ui/submi-button";
// import Image from "next/image";
import { CreateBookAction } from "@/action/post-action";

 

type FormData={
name:string
number_of_book:number
writer :string
nashername:string
chap:string
many:number
shabk:string
 
subject:string
}
 
//نکته این است که در این فورم ها که صفحه کاربر ثابت است ...باید بهد از سابمیت محتوای فورم پاک شود
const NewBookForm: React.FC = () => {

  const [formData,setFormFata] = useState<FormData>({name:'نامی وارد نشده ', shabk:'نامی وارد نشده '  ,subject:'نامی وارد نشده '  , number_of_book:  0, writer: "شهرت وارد نشده " , nashername: 'تحصیلات وارد نشده ' , chap:"تخصص وارد نشده  " , many:0  });
  const [isModelOpen,setModelOpen] = useState(false);
  const [isModelOpen2,setModelOpen2] = useState(false);
  const [isModelOpen3,setModelOpen3] = useState(false);
  const [isModelOpen4,setModelOpen4] = useState(false);
  // const [File, setFile] = useState<File | null>(null);
 
  
  const handlChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
  const{name  , value} = event.target;
  setFormFata((prevData)=>({
    ...prevData,
    [name]:value,
  }))

  };
//   const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     if (e.target.files) {
//       setFile(e.target.files[0]);
 
//     }
// };

 
    
  const addSubmit= async( )=>{
       if ( !File) { return setModelOpen2(true); }  
      const formData3 = new FormData();

     
      // formData3.append('pdf', File); // تغییر نام به image
      
       
       const res = await CreateBookAction(formData as any , formData3 as any );
      
       if ((res?.success  ) === false) {
        setModelOpen3(true)
      } 
      if ((res?.success ) === true) {
        setModelOpen4(true)
      }
     
 
      
      setModelOpen(false)
  }

  const formRef = useRef<HTMLFormElement>(null)


   
  return ( <>

<div className="border rounded-lg py-4 text-center bg-slate-800 text-slate-200 ">
  <h1>  لطفا مشخصات کتاب را وارد کنید <ImportContactsIcon/></h1>
</div>

<form
 action={ ( )=>{
  // await CreateLessonAction(formData)
  // handleSubmit
  if ( !File ) {
    return setModelOpen2(true);
      }
    setModelOpen(true)

}}  
     
    
  ref={formRef} 
className=" w-full  border px-14 py-8">
 <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
        <input onChange={handlChange} type="text" name="name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">     نام کتاب   </label>
    </div>

    <div className="relative z-0 w-full mb-5 group">
        <input onChange={handlChange}   type="text" name="nashername" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">   نام ناشر    </label>
    </div>
  </div>
 <div className="grid md:grid-cols-3 md:gap-4">
    <div className="relative z-0 w-full mb-5 group">
        <input onChange={handlChange} type="text" name="chap" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">        نوبت چاپ   </label>
    </div>

    <div className="relative z-0 w-full mb-5 group">
        <input onChange={handlChange}   type="number" name="number_of_book" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">    تعداد موجود   </label>
    </div>

    <div className="relative z-0 w-full mb-5 group">
        <input onChange={handlChange}   type="number" name="many" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">  قیمت   </label>
    </div>
  </div>
 


  <div className="relative z-0 w-full mb-5 group">
      <input onChange={handlChange} type="text" name="writer" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">  نویسنده     </label> 
   </div>

  <div className="relative z-0 w-full mb-5 group">
      <input onChange={handlChange} type="text" name="shabk" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">  شابک     </label> 
      <span className="text-red-700 text-xs">توجه فرمایید که نام کاربری باید شامل یک @ باشد *  </span>
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input onChange={handlChange} type="text" name="subject" id="floating_password2" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_password2" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">  موضوع   </label>
  </div>





  

  {/* <div className="flex flex-row justify-between relative z-0 w-full mb-5 group">
 
  
  <input id="inputFile" type="file"  accept=".pdf"  onChange={handlePdfChange}  className="m-5 file-input file-input-bordered file-input-accent w-full max-w-xs" />
         <label htmlFor="inputFile" className="  peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">     لطفا فایل کتاب درسی را وارد کنید:     </label>

    </div> */}
      
                


  <button className="text-white bg-slate-800  hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-slate-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">ثبت</button>


</form>

{/* برای فرم تایید است */}
  {isModelOpen && (   
<div
 
className=" border backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="sm:-left-1/4  left-0 relative  p-12 w-full max-w-3xl max-h-full z-50">
      <div className=" relative bg-white rounded-lg shadow  dark:bg-slate-200">
          <div className="flex items-center justify-between  p-4 md:p-5 border-b rounded-t dark:border-slate-500 ">
             <h3 className="text-xl font-semibold text-slate-800 dark:text-black">
                لطفا اطلاعات زیر را تایید کنید
             </h3>
             <button onClick={() => setModelOpen(false)} className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-black" data-modal-hide="default-modal">
                 <span className="sr-only"> خروج</span>
             </button>
         </div>
         <Table size="lg"   color="neutral" dir="rtl" hoverRow>
      <tbody >
          <tr >
            <td>نام</td> 
            <td>{formData.name}</td>
          </tr>
          <tr >
            <td>شابک</td> 
            <td>{formData.shabk}</td>
          </tr>
          <tr >
            <td> نام ناشر  </td> 
            <td>{formData.nashername}</td>
          </tr>          <tr >
            <td>  نوبت جاپ </td> 
            <td>{formData.chap}</td>
          </tr>          <tr >
            <td> قیمت</td> 
            <td>{formData.many}</td>
          </tr>          <tr >
            <td> نویسنده   </td> 
            <td>{formData.writer}</td>
          </tr>
          <tr >
            <td>تعداد موجود</td> 
            <td>{formData.number_of_book}</td>
          </tr>
          <tr >
            <td> موضوع </td> 


            <td>{formData.subject}</td>
          </tr>
      </tbody>
    </Table>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
             {/* <SubmitButton/> */}
             <button onClick={addSubmit} className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-black dark:hover:bg-gray-700">ثبت</button>

             <button onClick={() => setModelOpen(false)} className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-black dark:hover:bg-gray-700">حذف</button>
         </div>
     </div>
 </div>
</div>
 )} 
{/* برای مشکل نبود عکس */}
{isModelOpen2 && (   
<div
 
className=" border backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="sm:-left-1/4  left-0 relative  p-12 w-full max-w-3xl max-h-full z-50">
      <div className=" relative  rounded-lg shadow    bg-red-300  gap-5  ">
          <div className="flex items-center justify-between  p-4 md:p-5 border-b rounded-t  border-slate-500 gap-5">
             <h3 className="text-xl font-semibold   text-black">
                مشکلی رخ داده است
             </h3>
 
         </div>
         <div className="flex items-center justify-between  p-4 md:p-5 border-b rounded-t  border-slate-500 gap-5">
 
            <p>    ممکن ایت برخی فیلد ها از جمله تصویر خالی باشد </p>

         </div>
           
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
          
 
             <button onClick={() => setModelOpen2(false)} className="py-2.5 px-5 ms-3 text-sm font-medium   focus:outline-none bg-white rounded-lg border      focus:z-10 focus:ring-4    focus:ring-gray-700 dark:bg-white dark:text-gray-400  border-gray-200  hover:text-black  hover:bg-gray-200">فهمیدم</button>
         </div>
     </div>
 </div>
</div>
 )} 
 {/* برای عدم ثبت داده در دیتابیس */}
{isModelOpen3 && (   
<div
 
className=" border backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="sm:-left-1/4  left-0 relative  p-12 w-full max-w-3xl max-h-full z-50">
      <div className=" relative  rounded-lg shadow    bg-red-300  gap-5  ">
          <div className="flex  items-center justify-between bg-red-700  p-4 md:p-5 border-b rounded-t  border-slate-700 gap-5">
             <h1 className="text-xl font-semibold   text-black">
               مشکلی در ثبت داده ها  وجود دارد
             </h1>
     
         </div>
         <div className="flex items-center justify-center  p-4 md:p-5 border-b rounded-t  ">
         <p> برخی خطا های رایج:</p>

          </div>
         <div className="flex items-center justify-between  p-4 md:p-5 border-b rounded-t  border-slate-500 gap-5">
         <p> ثبت فرد با نام کاربری یکسان</p>

          </div>
         <div className="flex items-center justify-between  p-4 md:p-5 border-b rounded-t  border-slate-500 gap-5">
          <p>قطع ارتباط سرور </p>
          </div>
         <div className="flex items-center justify-between  p-4 md:p-5 border-b rounded-t  border-slate-500 gap-5">
                     <p> پوشه مبدا تصویر را چک کنید </p>

          </div>
            

       
           
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
          
 
             <button onClick={() => setModelOpen3(false)} className="py-2.5 px-5 ms-3 text-sm font-medium   focus:outline-none bg-white rounded-lg border      focus:z-10 focus:ring-4    focus:ring-gray-700 dark:bg-white dark:text-gray-400  border-gray-200  hover:text-black  hover:bg-gray-200">فهمیدم</button>
         </div>
     </div>
 </div>
</div>
 )} 
 {/* برای ثبت موفقیت امیز */}
 {isModelOpen4 && (   
 <div className=" border backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
       <div className="sm:-left-1/4  left-0 relative  p-12 w-full max-w-3xl max-h-full z-50">
 <div className="modal-box">
    
   <p className="py-4">  <span > کاربر      <span className="text-xl ">{formData.name}{formData.name}</span >     با موفقیت ثبت شد </span>
</p>
   <div className="modal-action">
     <form method="dialog">
       {/* if there is a button in form, it will close the modal */}
       <button className="btn"  onClick={() => setModelOpen4(false)} >حله</button>
     </form>
   </div>
 </div>
 </div>
 </div>

)} 

 
</>
  );
 

   }

 
 
export default NewBookForm;




 