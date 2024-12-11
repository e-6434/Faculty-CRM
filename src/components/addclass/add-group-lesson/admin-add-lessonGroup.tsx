'use client'

import { useEffect, useRef, useState } from "react";
 
  
import Table from '@mui/joy/Table';
 
import React from 'react';
import { format, parseISO } from 'date-fns-jalali';
import { CreateLessonGroup, SearchLesson_For_Insert_LessonGroup, SearchTeacher_For_Insert_LessonGroup } from "@/action/lesson_group";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import EventIcon from '@mui/icons-material/Event';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import ClassIcon from '@mui/icons-material/Class';
import DateRangeIcon from '@mui/icons-material/DateRange';
 import '@/components/addclass/addTeacher/left-slid/css.css'
import { Day_c, Hour_c, Term_c } from "./convert-data";
type FormData={
name:string
email:string
password :number
family:string
education:string
expertise:string
phon:number
  
}
type FormData2={
  id:number ;
  name:string
  email:string
  password :number
  family:string
  education:string
  expertise:string 
  phon:number
    
  }
type LessonData={
  id : number
  name  :string
  value :  string
  about  : string
  book:  string
  pishniaz_id: number
    
  }
type LessonGroupData={
  lessonName : string  
  teacher  :string  
  hour :  string  
  year  : string 
  term:  string 
  class: string  
  grupID: string  |null
  day : string  
  group:string
  }

  
 
//نکته این است که در این فورم ها که صفحه کاربر ثابت است ...باید بهد از سابمیت محتوای فورم پاک شود
const NewGroupLessonForm: React.FC = () => {

  const [formData,setFormFata] = useState<LessonGroupData>({lessonName:'null' , teacher:'null' ,hour:'null' ,year:'null' ,term:'null' ,class:'null' ,grupID:null, day:'null',group:''});

   

    
 
    
// year + term  +  day + class + hour





  const [isModelOpen,setModelOpen] = useState(false);
  const [isModelOpen2,setModelOpen2] = useState(false);
  const [isModelOpen3,setModelOpen3] = useState(false);

  const [image, setImage] = useState<File | null>(null);
  const [image2, setImage2] = useState('');
  const [teacherDetail,setTeacherDetail ] = useState<FormData2[]>([]);
  const [lessonDetail,setLessonDetail ] = useState<LessonData[]>([]);

  
  const handlChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{


  const{name  , value} = event.target;
  setFormFata((prevData)=>({
    ...prevData,
    [name]:value,
  }))

  };
  const handleSubmit = (event:any) => {
    event.preventDefault(); // جلوگیری از ارسال پیش‌فرض فرم
    const lessonGroupId = formData.year + formData.term + formData.day + formData.class +formData.hour  ;
   
    setFormFata(prevFormData => ({
      ...prevFormData, // کپی مقادیر قبلی
      grupID: lessonGroupId, // به‌روزرسانی grupID
    }));
    if (!formData) {
      alert("لطفاً یک درس را انتخاب کنید!"); // نمایش پیام خطا
      return;
    }
    // ادامه با ارسال فرم
    console.log("درس انتخاب شده:", formData);
     setModelOpen2(true)
  };
 


      useEffect(() => {
    const timer = setTimeout(() => {
      setModelOpen(false); // تغییر وضعیت به ناپدید شدن بعد از ۳ ثانیه
      setModelOpen3(false); // تغییر وضعیت به ناپدید شدن بعد از ۳ ثانیه
    }, 3000); // ۳۰۰۰ میلی‌ثانیه = ۳ ثانیه

    return () => clearTimeout(timer); // پاک کردن تایمر هنگام unmount
  }, [isModelOpen,isModelOpen3]);
 






useEffect(() => {
  const fetchData = async () => {
      try {
       const Teacher = await  SearchTeacher_For_Insert_LessonGroup();
       setTeacherDetail(Teacher);
       const  Lesson = await  SearchLesson_For_Insert_LessonGroup();
       setLessonDetail(Lesson);
      } catch (error) {
 
      }  
       
  };

  fetchData();
},[]); // آرایه وابستگی خالی به این معنی است که این اثر فقط یک بار در بارگذاری اولیه اجرا می‌شود


  const addSubmit= async( )=>{
    const result =  await CreateLessonGroup(formData as any)
    if(result.success){
       setModelOpen2(false)
       setModelOpen(true)
    }else{
      setModelOpen3(true)
      setModelOpen2(false)
    }
       
 
      
     
  }
 
  const formRef = useRef<HTMLFormElement>(null)
  const currentDate = new Date();

// دریافت سال، ماه و روز
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // ماه از 0 شروع می‌شود
const day = String(currentDate.getDate()).padStart(2, '0');

// ترکیب به فرمت YYYY-MM-DD
const formattedDate = `${year}-${month}-${day}`;


  const gregorianDate = formattedDate;
  const jalaliDate = format(parseISO(gregorianDate), 'yyyy/MM/dd');
  
  // console.log(jalaliDate); // نمایش تاریخ شمسی
   
  return ( <>

<div dir="rtl"  className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
               ورود اطلاعات
              </h3>
            </div>
            <form onSubmit={handleSubmit}
 
               ref={formRef} >

              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row  ">
                  <div className="w-full xl:w-1/2 ">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                   <MenuBookOutlinedIcon/>   نام درس
                    </label>
                    <select onChange={handlChange} 
                     name="lessonName"
                     className="bg-slate-200 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                       >
                        <option >--------</option>
                        {lessonDetail.map((element,key)=>(
                           <option key={key} value={element.id +'-'+element.name}>{element.name}</option>
                        ))}
                       
                     </select>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    <PersonAddAltOutlinedIcon/>    استاد مورد نظر 
                    </label>
                    <select onChange={handlChange} 
                     name="teacher"
                     className="bg-slate-200 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                       >
                        <option >--------</option>
                        {teacherDetail.map((element,key)=>(
                           <option key={key} value={element.id +'-'+ element.name +' '+ element.family}>{element.name} {element.family}</option>
                        ))}
                       
                     </select>
                  </div>
                </div>
 
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                 <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  <EventIcon/>   روز   <span className="text-meta-1">*</span>
                  </label>
                  <select onChange={handlChange} 
                     name="day"
                     className="bg-slate-200 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                       >
                        <option >---</option>
                        <option value="0">  شنبه     </option>
                        <option value="1"> یکشنبه   </option>
                        <option value="2"> دوشنبه   </option>
                        <option value="3"> سه شنبه  </option>
                        <option value="4"> چهارشنبه </option>
                        <option value="5"> پنجشنبه  </option>
 
                    </select>
                 </div>

                 <div className="w-full xl:w-1/2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                   <QueryBuilderIcon/> ساعت
                  </label>
                  <select onChange={handlChange} 
                     name="hour"
                     className="bg-slate-200 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                       >
                        <option >---</option>
                        <option value="1">07:20 - 08:50</option>
                        <option value="2">09:00 - 10:30</option>
                        <option value="3"> 10:40 - 12:10</option>
                        <option value="4"> 14:00 - 15:30 </option>
                        <option value="5"> 15:45 - 1715 </option>
                    </select>
                 </div>

                 <div className="w-full xl:w-1/2">
                    <label className="  mb-3 block text-sm font-medium text-black dark:text-white">
                    <DateRangeIcon/> سال 
                    </label>
                    <select  onChange={handlChange} 
                     name="year"
                     className="bg-slate-200 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                       >
                        <option >---</option>
                        <option value={jalaliDate.slice(0,4)} >{  jalaliDate.slice(0,4)}</option>
                        <option value={String(parseInt(jalaliDate.slice(0,4))+1)} >{parseInt(jalaliDate.slice(0,4))+1}</option>
                        <option value={String(parseInt(jalaliDate.slice(0,4))+2)} >{parseInt(jalaliDate.slice(0,4))+2}</option>
 
                    </select>
                    
                  </div>
              </div>

  

                 <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className= "  mb-3 block text-sm font-medium text-black dark:text-white">
                <ClassIcon/>   کلاس 
                    </label>
                    <select onChange={handlChange} 
                     name="class"
                     className="bg-slate-200 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                       >
                        <option >---</option>
                        <option value='1' >کلاس یک</option>
                        <option value='2'>کلاس دو</option>
                        <option value='3' >کلاس سه</option>
                        <option value='4' > کلاس چهار</option>
                        <option value='5' >  کلاس پنج </option>
                        <option value='6'>  کلاس شش </option>
                    </select>

                  </div>
                  
                  <div className="w-full xl:w-1/2">
 
                  <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  <CastForEducationIcon/>  ترم  
                  </label>
                     <select onChange={handlChange} 
                     name="term"
                     className="bg-slate-200 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                       >
                        <option >---</option>
                        <option value="0">تابستان</option>
                        <option value="1"> مهر - بهمن</option>
                        <option value="2"> بهمن - تیر</option>
                    </select>
                 </div>


                    </div>
                  <div className="w-full xl:w-1/2">
 
                  <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  <CastForEducationIcon/>  گروه درسی  
                  </label>
                  <input
                     onChange={handlChange} 
                     type="number"
                      name="group"
                      placeholder=" 123456"
                      className="bg-slate-100 w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                 </div>


                    </div>
                   
                   
                    
                     
                  </div>



              


                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  ثبت
                </button>
              </div> 
            </form>
          </div>
          
{/*  مودال اوکی   */}
          {isModelOpen && (  

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
                            گروه : {formData.grupID} - {formData.group}
                            </p>
                          </div>

        </div>

</div>
</div>
               
                 
                    
 )} 
 {/* مودال خطا */}
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
                                لطفا زمان انتخابی خود را تغییر دهید
                            </h5>
                            <h6 className="mb-3 text-sm font-semibold text-black dark:text-[#34D399] ">
                              قبلا این زمان پر شده است
                            </h6>
                            <p className="text-xm leading-relaxed text-body">
                            
                            </p>
                          </div>

        </div>

</div>
</div>          
                 
                    
 )} 
 {/*    فرم تایید   */}
          {isModelOpen2 && (  
    <div dir="rtl" className="fixed  top-20 inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"  >
  
        <div className="bg-white w-150 rounded-lg shadow-lg p-6 relative"   >

 

              <div className="flex w-full border-l-6   px-7 py-8 shadow-md z-999999 dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
          
                <div className="w-full"> 
                                                          <div className="flex items-center justify-between   md: border-b rounded-t dark:border-slate-500 ">
                                                            <h3 className="text-xl font-semibold text-slate-800 dark:text-black">
                                                              لطفا اطلاعات زیر را تایید کنید
                                                            </h3>
       
                                                        </div>
                                                        <Table size="lg"   color="neutral" dir="rtl" hoverRow>
                                                    <tbody >
                                                        <tr >
                                                          <td> نام درس</td> 
                                                          <td>{formData.lessonName.split('-')[1]} </td>
                                                        </tr>
                                                        <tr >
                                                          <td> استاد مورد نظر  </td> 
                                                          <td>{formData.teacher.split('-')[1]}</td>
                                                        </tr>          <tr >
                                                          <td> روز</td> 
                                                          <td>{Day_c(formData.day)}</td>
                                                        </tr>          <tr >
                                                          <td> سال </td> 
                                                          <td>{formData.year}</td>
                                                        </tr>          <tr >
                                                          <td> کلاس</td> 
                                                          <td> کلاس شماره :{formData.class}</td>
                                                        </tr>
                                                        <tr >
                                                          <td>ترم تحصیلی</td> 
                                                          <td>{Term_c(formData.term)}</td>
                                                        </tr>
                                                        <tr >
                                                          <td>ساعت </td> 
                                                          <td>{Hour_c(formData.hour) }</td>
                                                        </tr>
                                                        <tr className="bg-red-300" >
                                                          <td >شماره گروه </td> 
                                                          <td>{formData.grupID}</td>
                                                        </tr>
                                                    </tbody>
                                                  </Table>
                                                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                                            {/* <SubmitButton/> */}
                                                            <button onClick={addSubmit} className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-black dark:hover:bg-gray-700">ثبت</button>
                                              
                                                            <button onClick={() => setModelOpen2(false)} className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-black dark:hover:bg-gray-700">حذف</button>
                                                        </div>
                    </div>

                    </div>
            
                </div>
              </div>

 
 
   
                 
                    
 )} 
 

 
</>
  );
 

   }

 
 
export default NewGroupLessonForm;




