'use client'

import { useEffect, useRef, useState } from "react";
import SubmitButton from "@/app/ui/submi-button";
import { $Enums } from "@prisma/client";
import { CreateLessonAction, SearchLesson } from "@/action/add-lesson";
import Table from '@mui/joy/Table';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';

type FormData={
  id:number   
name:string
book:string
pishniaz_id :number
value:number
about:string
  
}
type lessonData={
  id:number   
  name:string
  value:number
}

//نکته این است که در این فورم ها که صفحه کاربر ثابت است ...باید بهد از سابمیت محتوای فورم پاک شود
const NewLessonForm=  () => {
  const [lessonData,setLessonData] = useState ([]);
  const [ formData, setFormFata] = useState<FormData>({name:'نامی دارد نشده است' , value: -1, book: "کتابی وارد نشده است" , pishniaz_id: -1 , about:"موردی ثبت نشده است" ,id:0});
  const [isModelOpen,setModelOpen] = useState(false);
  const [isModelOpen4,setModelOpen4] = useState(false);
  const [isModelOpen3,setModelOpen3] = useState(false);



  
  const handlChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
  const{name  , value} = event.target;
  setFormFata((prevData)=>({
    ...prevData,
    [name]:value,
  }))

  };

 
  const addSubmit= async()=>{
 const res = await CreateLessonAction(formData as any)
if(res?.success){
  setModelOpen4(true);
}else{
  setModelOpen3(true);
}
  setModelOpen(false)
   
  }

  const formRef = useRef<HTMLFormElement>(null)
  useEffect(() => {
    const fetchData = async () => {
        try {
           
           setLessonData(  await SearchLesson()  )
          
           
          } catch (error) {
         }  
         
    };

    fetchData();
},[formData]); // آرایه وابستگی خالی به این معنی است که این اثر فقط یک بار در بارگذاری اولیه اجرا می‌شود
useEffect(() => {
  const timer = setTimeout(() => {
     setModelOpen3(false); // تغییر وضعیت به ناپدید شدن بعد از ۳ ثانیه
    setModelOpen4(false); // تغییر وضعیت به ناپدید شدن بعد از ۳ ثانیه
  }, 3000); // ۳۰۰۰ میلی‌ثانیه = ۳ ثانیه

  return () => clearTimeout(timer); // پاک کردن تایمر هنگام unmount
}, [isModelOpen4,isModelOpen3]);
 
 
 
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
             setModelOpen(true)
            
            }}  
               ref={formRef} >

              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row  ">
                  <div className="w-full xl:w-1/2 ">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      نام درس
                    </label>
                    <input
                     onChange={handlChange} 
                     type="text"
                      name="name"
                      placeholder="مهندسی نرم افزار"
                      className="bg-slate-100 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      پیشنیاز درس  
                    </label>
                    {/* <input
                    onChange={handlChange} 
                    type="number"
                     name="pishniaz_id"
                      placeholder="21313131"
                      className="bg-slate-100 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    /> */}
                   <select onChange={handlChange} 
                    name="pishniaz_id"
                     className="bg-slate-100 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                       >
                        <option value={0} > بدون پیش نیاز</option>
                        {lessonData.map((ee:any)=>( 
                          <option key={ee.id} value={ee.id}  >{ee.name} --({ee.value})</option>
                         
                        ))}
 
                    </select>
                  </div>
                </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                 <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                       کتاب مورد نیاز  
                  </label>
                  <input
                    onChange={handlChange} type="text" name="book" 
                    placeholder="ریاضیات"
                    className="bg-slate-100 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                 </div>

                 <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    شماره درس
                  </label>
                  <input
                    onChange={handlChange} type="number" name="id" 
                    placeholder="123456789"
                    className="bg-slate-100 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                 </div>

 
              </div>

              <div className="mb-4.5">
                  {/* <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    تعداد واحد
                  </label>

                 </div> */}

                 <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className= "  mb-3 block text-sm font-medium text-black dark:text-white">
                      تعداد واحد
                    </label>
                  
                   
                    
                       <input 
                      onChange={handlChange} max={3} min={0} type="number" name="value" id="123" maxLength={1}
                      placeholder=" "
                      className="bg-slate-100 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    /> 
                    
                      
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="  mb-3 block text-sm font-medium text-black dark:text-white">
                      درباره کتاب  
                    </label>
                    <input
                     onChange={handlChange} type="text" name="about"
                      placeholder="  '' "
                      className="bg-slate-100 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                </div>
 

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  ثبت
                </button>
              </div> 
              </div>
            </form>
          </div>

{/* <form
 action={ ( )=>{
  // await CreateLessonAction(formData)
  // handleSubmit
 setModelOpen(true)

}}  
     
    
  ref={formRef} 
className="max-w-xl mx-auto bg-slate-50 border px-14 py-8">
  <div className="relative z-0 w-full mb-5 group">
      <input onChange={handlChange} type="text" name="name" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">نام درس</label>
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input onChange={handlChange} type="number" name="pishniaz_id" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> پیشنیاز این درس   </label>
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input onChange={handlChange} type="text" name="book" id="floating_password2" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_password2" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> کتاب مورد نیاز</label>
  </div>

  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
        <input onChange={handlChange} type="number" name="id" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">    شماره درس  </label>
    </div>

    <div className="relative z-0 w-full mb-5 group">
        <input onChange={handlChange} max={3} min={0} type="number" name="value" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">   تعداد واحد </label>
    </div>
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input onChange={handlChange} type="text" name="about" id="floating_repeat_password2" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_repeat_password2" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">  درباره کتاب  </label>
  </div>
  <button className="text-white bg-slate-800  hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-slate-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">ثبت</button>


</form> */}


  {isModelOpen && (   
<div
 
className=" border backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-10 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="sm:-right-1/4  right-0 top-10 relative  p-12 w-full max-w-3xl max-h-full z-50">
      <div className=" relative bg-white rounded-lg shadow  dark:bg-slate-200">
          <div className="flex items-center justify-between  p-4 md:p-5 border-b rounded-t dark:border-slate-500">
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
            <td>تعداد واحد</td> 
            <td>{formData.value}</td>
          </tr>          <tr >
            <td>   شماره درس</td> 
            <td>{formData.id}</td>
          </tr>          <tr >
            <td>درس پیشنیاز</td> 
            <td>{formData.pishniaz_id}</td>
          </tr>          <tr >
            <td>کتاب مورد نیاز</td> 
            <td>{formData.book}</td>
          </tr>
          <tr >
            <td>درباره</td> 
            <td>{formData.about}</td>
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
 درس با این شماره قبلا ثبت شده است

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
                              درس : {formData.name} - {formData.value}
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




