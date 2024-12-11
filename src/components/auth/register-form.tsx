'use client'

import { useEffect, useRef, useState } from "react";
 import { $Enums, user_role } from "@prisma/client";
  
import Table from '@mui/joy/Table';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { CreateUserAction, CreateUserActionImage } from "@/action/auth-action";
import SubmitButton from "@/app/ui/submi-button";
import Link from "next/link";
 
type FormData={
name:string
email:string
password :number
family:string
education:string
expertise:string
phon:number
  
}
 
//نکته این است که در این فورم ها که صفحه کاربر ثابت است ...باید بهد از سابمیت محتوای فورم پاک شود
const NewLessonForm: React.FC = () => {

  const [formData,setFormFata] = useState<FormData>({name:'نامی وارد نشده ' , email:  'نام کاربری وارد نشده', family: "شهرت وارد نشده " , education: 'تحصیلات وارد نشده ' , expertise:"تخصص وارد نشده  " ,password:0 , phon:0 });
  const [isModelOpen,setModelOpen] = useState(false);
  const [isModelOpen2,setModelOpen2] = useState(false);
  const [isModelOpen3,setModelOpen3] = useState(false);
  const [isModelOpen4,setModelOpen4] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  
  const handlChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
  const{name  , value} = event.target;
  setFormFata((prevData)=>({
    ...prevData,
    [name]:value,
  }))

  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        setImage(e.target.files[0]);
    }
};

useEffect(() => {
  const timer = setTimeout(() => {
     setModelOpen3(false); // تغییر وضعیت به ناپدید شدن بعد از ۳ ثانیه
    setModelOpen4(false); // تغییر وضعیت به ناپدید شدن بعد از ۳ ثانیه
  }, 3000); // ۳۰۰۰ میلی‌ثانیه = ۳ ثانیه

  return () => clearTimeout(timer); // پاک کردن تایمر هنگام unmount
}, [isModelOpen4,isModelOpen3]);
    
  const addSubmit= async( )=>{
       if ( !image) { return setModelOpen2(true); }  
      const formData3 = new FormData();
      formData3.append('image', image); // تغییر نام به image
      formData3.append('email', formData.email); // تغییر نام به image
       const role = 'USER';
       const res = await CreateUserAction(formData as any , role as user_role);
       const res2 = await CreateUserActionImage(formData3 as any);
       if ((res?.success || res2?.success) === false) {
        setModelOpen3(true)
      } 
      if ((res?.success || res2?.success) === true) {
        setModelOpen4(true)
      }
     
 
      
      setModelOpen(false)
  }

  const formRef = useRef<HTMLFormElement>(null)



 
  return ( <>

 <div dir="rtl"  className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
               ورود اطلاعات
              </h3>
            </div>
            <form 
            action={ ( )=>{
              // await CreateLessonAction(formData)
              // handleSubmit
              if ( !image ) {
                return setModelOpen2(true);
                  }
                setModelOpen(true)
            
            }}  
                 
               ref={formRef} >

              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row  ">
                  <div className="w-full xl:w-1/2 ">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                     نام  
                    </label>
                    <input onChange={handlChange} type="text" name="name" id="floating_first_name"                      className="bg-slate-200 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
 placeholder=" " required />

                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    شهرت
                    </label>
                    <input onChange={handlChange}   type="text" name="family" id="floating_last_name"                      className="bg-slate-200 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      placeholder=" " required />

                  </div>
                </div>
 
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                 <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  نام کاربری    
                  </label>
                  <input onChange={handlChange} type="email" name="email" id="floating_password"                      className="bg-slate-200 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                placeholder=" " required />

                 </div>

                 <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  رمز عبور 
                  </label>
                  <input onChange={handlChange} type="password" name="password" id="floating_password2"                      className="bg-slate-200 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder=" " required />

                 </div>

                 <div className="w-full xl:w-1/2">
                    <label className="  mb-3 block text-sm font-medium text-black dark:text-white">
                    مقطع تحصیلی  
                    </label>
                    <select  onChange={handlChange} 
                     name="education"
                     className="bg-slate-200 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                       >
               <option >---</option>
                <option value="دیپلم">دیپلم</option>
                <option value="کاردانی">کاردانی</option>
                <option value="کارشناسی">کارشناسی</option>
                <option value="کارشناسی ارشد">کارشناسی ارشد</option>
                <option value="دکترا ">  دکترا </option>
                    </select>
                    
                  </div>
              </div>

  

                 <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className= "  mb-3 block text-sm font-medium text-black dark:text-white">
                    تخصص 
                    </label>
                    <input onChange={handlChange}   type="text" name="expertise" id="floating_last_name"                      className="bg-slate-200 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder=" " required />


                  </div>
                  
                  <div className="w-full xl:w-1/2">
 
                  <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                   شماره همراه
                  </label>
                  <input onChange={handlChange} type="number" name="phon" id="floating_repeat_password2" className="bg-slate-200 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder=" " required />

                 </div>
                        <div className="w-full xl:w-1/2">
                        <input type="file" accept="image/*"  onChange={handleImageChange}  className="file-input file-input-bordered file-input-accent w-full max-w-xs" />
                        </div>
                        
                    </div>
                   
                   
                    
                     
                  </div>



              


                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  ثبت
                </button>
              </div> 
            </form>
            <Link href='/signin' className="hover:text-blue-600">
        <p className="text-center"> نام نویسی کرده اید؟برای ورود کلیک کنید</p>
      </Link>
          </div>



 




{/* برای فرم تایید است */}
  {isModelOpen && (   
<div
 
className=" border backdrop-blur-sm overflow-y-auto   fixed top-0 right-0  justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="sm:-right-1/4  right-0 relative top-10  p-12 w-full max-w-3xl max-h-full z-50">
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
            <td> شهرت  </td> 
            <td>{formData.family}</td>
          </tr>          <tr >
            <td> نام کاربری</td> 
            <td>{formData.email}</td>
          </tr>          <tr >
            <td> پسورد</td> 
            <td>{formData.password}</td>
          </tr>          <tr >
            <td> شماره تلفن</td> 
            <td>{formData.phon}</td>
          </tr>
          <tr >
            <td>تخصص</td> 
            <td>{formData.expertise}</td>
          </tr>
          <tr >
            <td>مقطع تحصیلی</td> 
            <td>{formData.education}</td>
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
      <div className="sm:-right-2/4  right-0 relative  p-12 w-full max-w-3xl max-h-full z-50">
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
  <div dir="rtl" className="fixed    inset-115   bg-opacity-70 flex justify-start items-center z-50 top-0 right-75"  >
  
  <div className=" w-90      relative"   >
    
        <div className=" w-9 h-10 absolute  ml-7 mr-5  text-gray-500 z-99 hover:text-gray-700"  >
        <div className="countdown"></div>
        </div>
  
        <div className="flex top-9 right-9     border-l-6 border-[#d63939] bg-red-100     shadow-md   dark:bg-[#1B1B24] dark:bg-opacity-30 py-1 ">
                            <div  className="  ml-7 mr-5 flex h-9  py-1 w-full max-w-[36px] items-center justify-center rounded-full bg-[#A73121]">
                            <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.4917 7.65579L11.106 12.2645C11.2545 12.4128 11.4715 12.5 11.6738 12.5C11.8762 12.5 12.0931 12.4128 12.2416 12.2645C12.5621 11.9445 12.5623 11.4317 12.2423 11.1114C12.2422 11.1113 12.2422 11.1113 12.2422 11.1113C12.242 11.1111 12.2418 11.1109 12.2416 11.1107L7.64539 6.50351L12.2589 1.91221L12.2595 1.91158C12.5802 1.59132 12.5802 1.07805 12.2595 0.757793C11.9393 0.437994 11.4268 0.437869 11.1064 0.757418C11.1063 0.757543 11.1062 0.757668 11.106 0.757793L6.49234 5.34931L1.89459 0.740581L1.89396 0.739942C1.57364 0.420019 1.0608 0.420019 0.740487 0.739944C0.42005 1.05999 0.419837 1.57279 0.73985 1.89309L6.4917 7.65579ZM6.4917 7.65579L1.89459 12.2639L1.89395 12.2645C1.74546 12.4128 1.52854 12.5 1.32616 12.5C1.12377 12.5 0.906853 12.4128 0.758361 12.2645L1.1117 11.9108L0.758358 12.2645C0.437984 11.9445 0.437708 11.4319 0.757539 11.1116C0.757812 11.1113 0.758086 11.111 0.75836 11.1107L5.33864 6.50287L0.740487 1.89373L6.4917 7.65579Z"
                    fill="#ffffff"
                    stroke="#ffffff"
                  ></path>
                </svg>
                            </div>
  
                            <div className="w-full"> 
                              <h5 className="mb-3 text-sm font-semibold text-black dark:text-[#34D399] ">
                                  مشکلی در ثبت داده وجود دارد   
                              </h5>
                              <p className="text-xm leading-relaxed text-body">
                              
                              </p>
                            </div>
  
          </div>
  
  </div>
  </div>  
 )} 
 {/* برای ثبت موفقیت امیز */}
 {isModelOpen4 && (   
  <div dir="rtl" className="fixed    inset-115   bg-opacity-70 flex justify-start items-center z-50 top-0 right-75"  >
  
  <div className=" w-90      relative right-0"   >
    
        <div className=" w-9 h-10 absolute  ml-7 mr-5  text-gray-500 z-99 hover:text-gray-700"  >
        <div className="countdown"></div>
        </div>

        <div className="flex top-9 right-9      bg-green-100 w-full h-18 border-l-6 border-[#34D399]     shadow-md   dark:bg-[#1B1B24] dark:bg-opacity-30 py-1 ">
                            <div  className="  ml-7 mr-5 flex h-9  py-1 w-full max-w-[36px] items-center justify-center rounded-full bg-[#34D399]">
                              <svg
                                
                                width="16"
                                height="12"
                                viewBox="0 0 16 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                                  fill="white"
                                  stroke="white"
                                ></path>
                              </svg>
                            </div>

                            <div className="w-full"> 
                              <h5 className="mb-3 text-sm font-semibold text-black dark:text-[#34D399] ">
                                     با موفقیت ثبت گردید    
                              </h5>
                              <p className="text-xm leading-relaxed text-body">
                              کاربر : {formData.name} - {formData.family}
                              </p>
                            </div>

          </div>

  </div>
</div>

  )}   

 
</>
  );
 

   }

 
 
export default NewLessonForm;




              // , ,  ,  ,  ,,phon,image