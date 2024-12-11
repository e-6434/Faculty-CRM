'use client'
import { useEffect, useRef, useState } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { SearchLessonGroup } from "@/action/lesson_group";
import SearchUser_In_Client from "./searchElement";
 import { format, parseISO } from 'date-fns-jalali';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import ClassIcon from '@mui/icons-material/Class';
 import NewGroupLessonForm_For_Updat from "../addclass/add-group-lesson/NewGroupLessonForm_For_Updat";
import Link from "next/link";
type LessonGroupData={
  group_id:String  
  teacher_id: String  
  lesson_id : String 

  }
type Search={
  class:string
  term:string
  year:string
}




 

const Calendar = () => {
  const currentDate = new Date();

// دریافت سال، ماه و روز
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // ماه از 0 شروع می‌شود
const day = String(currentDate.getDate()).padStart(2, '0');

// ترکیب به فرمت YYYY-MM-DD
const formattedDate = `${year}-${month}-${day}`;
  const gregorianDate = formattedDate;
  const jalaliDate = format(parseISO(gregorianDate), 'yyyy/MM/dd');
 
  const [formData,setFormData] = useState<Search>({class:'6' , term:'' , year:jalaliDate.slice(0,4)});
  const [showData,setShowData] = useState<Search>({class:'6' , term:'' , year:jalaliDate.slice(0,4)});

  const [groupData,setGroupData] = useState<LessonGroupData[]>([]);

  const [sendData,setSendData] = useState<LessonGroupData >({group_id:'1'  ,  teacher_id: '1'  ,   lesson_id : '1' });
   


  const [day_0,setDay_0] = useState<LessonGroupData[]>([]); 
  
  const [day_1,setDay_1] = useState<LessonGroupData[]>([]);
  const [day_2,setDay_2] = useState<LessonGroupData[]>([]);
  const [day_3,setDay_3] = useState<LessonGroupData[]>([]);
  const [day_4,setDay_4] = useState<LessonGroupData[]>([]);
  const [day_5,setDay_5] = useState<LessonGroupData[]>([]);
  const [modal,setModal] = useState(false);
  const [updatemodal,setUpdatemodal] = useState(false);


 
  const handlChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
    const{name  , value} = event.target;
    setFormData((prevData)=>({
      ...prevData,
      [name]:value,
    }))
  
    };
// // سال 
//   console.log(jalaliDate.slice(0,4)); 
//   // ماه
//   console.log(jalaliDate.slice(5,7));
//   // روز
//   console.log(jalaliDate.slice(8,10));
  
 
useEffect(() => {
  const fetchData11 = async () => {
      


    if(formData.term === '1'){
      setShowData((prevData)=>({
        ...prevData,
        term:'مهر -بهمن'
      }))
    }else if (formData.term === '2'){
      setShowData((prevData)=>({
        ...prevData,
        term:'بهمن - تیر'
      }))

    }else{
      setShowData((prevData)=>({
        ...prevData,
        term:'تابستان'
      }))

    }
     

        
       
       
  };

  fetchData11();
},[formData]);

  useEffect(() => {
    const fetchData5 = async () => {
        
         const GroupData = await  SearchLessonGroup(formData as any);
         setGroupData(GroupData as any);
       
          
         
         
    };
  
    fetchData5();
  },[formData]);
  

 
  useEffect(() => {
    const date = async () => {
      if ( parseInt(jalaliDate.slice(5,7)) >= 7 && parseInt(jalaliDate.slice(5,7)) <= 11 ) {
        setFormData((prevData)=>({
          ...prevData,
          term:'1'
        }))
      }else if (parseInt(jalaliDate.slice(5,7)) >=11 && parseInt(jalaliDate.slice(5,7)) <= 4) {
        setFormData((prevData)=>({
          ...prevData,
          term:'2'
        }))
      }else{
        setFormData((prevData)=>({
          ...prevData,
          term:'0' 
        }))
      }
         
    };
  
    date();
  },[]); // آرایه وابستگی خالی به این معنی است که این اثر فقط یک بار در بارگذاری اولیه اجرا می‌شود
  
 
  useEffect(() => {
    const fetchData2 = async () => {
      setDay_0  (groupData.filter(item => item.group_id.charAt(5) === '0'));
      setDay_1  (groupData.filter(item => item.group_id.charAt(5) === '1'));
      setDay_2  (groupData.filter(item => item.group_id.charAt(5) === '2'));
      setDay_3  (groupData.filter(item => item.group_id.charAt(5) === '3'));
      setDay_4  (groupData.filter(item => item.group_id.charAt(5) === '4'));
      setDay_5  (groupData.filter(item => item.group_id.charAt(5) === '5'));

 
  
         
    };
  
    fetchData2();
  },[groupData]);  
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setModal(false); // تغییر وضعیت به ناپدید شدن بعد از ۳ ثانیه
      
    }, 15000); // ۳۰۰۰ میلی‌ثانیه = ۳ ثانیه

    return () => clearTimeout(timer); // پاک کردن تایمر هنگام unmount
  }, [modal]);

  const formRef = useRef<HTMLFormElement>(null)

 
 


  return (
    <div className="mx-auto max-w-7xl  ">
      <Breadcrumb pageName="برنامه کلاسی" />
{updatemodal && (  
  <div  className=" border backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed  z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
 
        <div className="sm:-right-1/4 top-20 right-0 relative  p-12 w-full max-w-3xl max-h-full z-50">
        <div className=" relative bg-white rounded-lg shadow  dark:bg-slate-200">

   
 <button onClick={()=>setUpdatemodal(false)} className="flex  w-1/4   justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  بستن
                </button>
 <NewGroupLessonForm_For_Updat data={sendData as any}/>

 </div>
 </div>
 </div>
          )}
      {/* <!-- ====== Calendar Section Start ====== --> */}
      {modal && (  
            <tr className="grid grid-cols-3 rounded-t-sm   text-white    ">
 
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
              <label className= "  mb-3 block text-sm font-medium text-black dark:text-white">
              <ClassIcon/>   کلاس 
                  </label>
                  <select onChange={handlChange} 
                   name="class"
                   className="bg-green-200       w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                     >
                        
                      <option   >   </option>
                      <option value='1' >کلاس یک</option>
                      <option value='2'>کلاس دو</option>
                      <option value='3' >کلاس سه</option>
                      <option value='4' > کلاس چهار</option>
                      <option value='5' >  کلاس پنج </option>
                      <option value='6'>  کلاس شش </option>
                  </select>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
              <label className="  mb-3 block text-sm font-medium text-black dark:text-white">
                  <DateRangeIcon/> سال 
                  </label>
                  <select  onChange={handlChange} 
                   name="year"
                   className="bg-green-200  w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                     >
                       
                       <option   >   </option>

                       <option value={String(parseInt(jalaliDate.slice(0,4))+2)} >{parseInt(jalaliDate.slice(0,4))+2}</option>
                      <option  value={String(parseInt(jalaliDate.slice(0,4))+1)} >{parseInt(jalaliDate.slice(0,4))+1}</option>

                      <option className="bg-orange-300" value={jalaliDate.slice(0,4)} >{  jalaliDate.slice(0,4)}</option>
                      <option value={String(parseInt(jalaliDate.slice(0,4))-1)} >{parseInt(jalaliDate.slice(0,4))-1}</option>
                      <option value={String(parseInt(jalaliDate.slice(0,4))-2)} >{parseInt(jalaliDate.slice(0,4))-2}</option>

                  </select>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                <CastForEducationIcon/>  ترم  
                </label>
                   <select onChange={handlChange} 
                   name="term"
                   className="bg-green-200     w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                     >
                       
                       
                       <option   >   </option>
                      <option value="1"> مهر - بهمن</option>
                      <option value="2"> بهمن - تیر</option>
                      <option value="0">تابستان</option>
                  </select>
              </th>
 
 
            </tr>
          )}


      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-3 rounded-t-sm bg-green-200    dark:bg-black  dark:text-white   text-black     ">
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                کلاس : {formData.class}
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
              سال : {formData.year} 
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                  ترم : {showData.term}  
              </th>
            </tr>
            <tr className="grid grid-cols-6 rounded-t-sm bg-primary dark:border-strokedark    text-white">
              <th className="flex h-15 items-center justify-center rounded-tl-sm p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> 15:45 - 1715 </span>
                <span className="block lg:hidden">  15:45 - 1715 </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> 14:00 - 15:30 </span>
                <span className="block lg:hidden"> 14:00 - 15:30 </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> 10:40 - 12:10 </span>
                <span className="block lg:hidden"> 10:40 - 12:10 </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block"> 09:00 - 10:30</span>
                <span className="block lg:hidden"> 09:00 - 10:30</span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                <span className="hidden lg:block">07:20 - 08:50 </span>
                <span className="block lg:hidden"> 07:20 - 08:50 </span>
              </th>
              <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                {/* <span className="hidden lg:block"> </span>
                <span className="block lg:hidden"> </span> */}
            
<button onClick={()=>setModal(true)}
  className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
>
  <span
    className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
  >
    <span
      className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
    ></span>
  </span>
  <span
    className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
  >
    <span
      className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
    ></span>
  </span>
  <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-stone-200 rounded-md group-hover:translate-x-0"  > </span>


  <span
    className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-black"> جست وجو  </span>

  
</button>

              </th>
 
            </tr>

          </thead>

          <tbody>
 {/* ***********************************شنبه***************************************************         */}

 
 <tr className="grid grid-cols-6">
 { day_0.filter(item => item.group_id.charAt(7) === '5').length != 0 && (  
                <button onClick={()=>{ setSendData( day_0.filter(e=>e.group_id.charAt(7) ==='5')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_0.filter(e=>e.group_id.charAt(7) ==='5')[0]?.teacher_id as any} lesson ={day_0.filter(e=>e.group_id.charAt(7) ==='5')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_0.filter(item => item.group_id.charAt(7) === '5').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            { day_0.filter(item => item.group_id.charAt(7) === '4').length != 0 && (  
               <button onClick={()=>{ setSendData( day_0.filter(e=>e.group_id.charAt(7) ==='4')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_0.filter(e=>e.group_id.charAt(7) ==='4')[0]?.teacher_id as any} lesson ={day_0.filter(e=>e.group_id.charAt(7) ==='4')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_0.filter(item => item.group_id.charAt(7) === '4').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            { day_0.filter(item => item.group_id.charAt(7) === '3').length != 0 && (  
              <button onClick={()=>{ setSendData( day_0.filter(e=>e.group_id.charAt(7) ==='3')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_0.filter(e=>e.group_id.charAt(7) ==='3')[0]?.teacher_id as any} lesson ={day_0.filter(e=>e.group_id.charAt(7) ==='3')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_0.filter(item => item.group_id.charAt(7) === '3').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            { day_0.filter(item => item.group_id.charAt(7) === '2').length != 0 && (  
               <button onClick={()=>{ setSendData( day_0.filter(e=>e.group_id.charAt(7) ==='2')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_0.filter(e=>e.group_id.charAt(7) ==='2')[0]?.teacher_id as any} lesson ={day_0.filter(e=>e.group_id.charAt(7) ==='2')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_0.filter(item => item.group_id.charAt(7) === '2').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            { day_0.filter(item => item.group_id.charAt(7) === '1').length != 0 && (  
               <button onClick={()=>{ setSendData( day_0.filter(e=>e.group_id.charAt(7) ==='1')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_0.filter(e=>e.group_id.charAt(7) ==='1')[0]?.teacher_id as any} lesson ={day_0.filter(e=>e.group_id.charAt(7) ==='1')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_0.filter(item => item.group_id.charAt(7) === '1').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
              <td className=" rounded-t-sm bg-primary text-white    flex   items-center justify-center   text-xs font-semibold sm:text-base xl:p-5 ease relative h-20   border border-stroke p-2 transition duration-500   dark:border-strokedark dark:  md:h-25 md:p-6 xl:h-31">
                <span className="hidden lg:block">شنبه</span>
                <span className="block lg:hidden">شنبه</span>
              </td>
 
            </tr> 
            
 {/* **************************************یکشنبه************************************************         */}
           
            <tr className="grid grid-cols-6">
            { day_1.filter(item => item.group_id.charAt(7) === '5').length != 0 && (  
               <button onClick={()=>{ setSendData( day_1.filter(e=>e.group_id.charAt(7) ==='5')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_1.filter(e=>e.group_id.charAt(7) ==='5')[0]?.teacher_id as any} lesson ={day_1.filter(e=>e.group_id.charAt(7) ==='5')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_1.filter(item => item.group_id.charAt(7) === '5').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            { day_1.filter(item => item.group_id.charAt(7) === '4').length != 0 && (  
              <button onClick={()=>{ setSendData( day_1.filter(e=>e.group_id.charAt(7) ==='4')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_1.filter(e=>e.group_id.charAt(7) ==='4')[0]?.teacher_id as any} lesson ={day_1.filter(e=>e.group_id.charAt(7) ==='4')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_1.filter(item => item.group_id.charAt(7) === '4').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            { day_1.filter(item => item.group_id.charAt(7) === '3').length != 0 && (  
              <button onClick={()=>{ setSendData( day_1.filter(e=>e.group_id.charAt(7) ==='3')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_1.filter(e=>e.group_id.charAt(7) ==='3')[0]?.teacher_id as any} lesson ={day_1.filter(e=>e.group_id.charAt(7) ==='3')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_1.filter(item => item.group_id.charAt(7) === '3').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            { day_1.filter(item => item.group_id.charAt(7) === '2').length != 0 && (  
              <button onClick={()=>{ setSendData( day_1.filter(e=>e.group_id.charAt(7) ==='2')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_1.filter(e=>e.group_id.charAt(7) ==='2')[0]?.teacher_id as any} lesson ={day_1.filter(e=>e.group_id.charAt(7) ==='2')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_1.filter(item => item.group_id.charAt(7) === '2').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            { day_1.filter(item => item.group_id.charAt(7) === '1').length != 0 && (  
              <button onClick={()=>{ setSendData( day_1.filter(e=>e.group_id.charAt(7) ==='1')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_1.filter(e=>e.group_id.charAt(7) ==='1')[0]?.teacher_id as any} lesson ={day_1.filter(e=>e.group_id.charAt(7) ==='1')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_1.filter(item => item.group_id.charAt(7) === '1').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
              <td className=" rounded-t-sm bg-primary text-white    flex   items-center justify-center   text-xs font-semibold sm:text-base xl:p-5 ease relative h-20   border border-stroke p-2 transition duration-500   dark:border-strokedark dark:  md:h-25 md:p-6 xl:h-31">
                <span className="hidden lg:block">یکشنبه</span>
                <span className="block lg:hidden">یکشنبه</span>
              </td>

            </tr>
{/* ***********************************دوشنبه***************************************************         */}

 
            <tr className="grid grid-cols-6">

            { day_2.filter(item => item.group_id.charAt(7) === '5').length != 0 && (  
              <button onClick={()=>{ setSendData( day_2.filter(e=>e.group_id.charAt(7) ==='5')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_2.filter(e=>e.group_id.charAt(7) ==='5')[0]?.teacher_id as any} lesson ={day_2.filter(e=>e.group_id.charAt(7) ==='5')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_2.filter(item => item.group_id.charAt(7) === '5').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            { day_2.filter(item => item.group_id.charAt(7) === '4').length != 0 && (  
              <button onClick={()=>{ setSendData( day_2.filter(e=>e.group_id.charAt(7) ==='4')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_2.filter(e=>e.group_id.charAt(7) ==='4')[0]?.teacher_id as any} lesson ={day_2.filter(e=>e.group_id.charAt(7) ==='4')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_2.filter(item => item.group_id.charAt(7) === '4').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            { day_2.filter(item => item.group_id.charAt(7) === '3').length != 0 && (  
             <button onClick={()=>{ setSendData( day_2.filter(e=>e.group_id.charAt(7) ==='3')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_2.filter(e=>e.group_id.charAt(7) ==='3')[0]?.teacher_id as any} lesson ={day_2.filter(e=>e.group_id.charAt(7) ==='3')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_2.filter(item => item.group_id.charAt(7) === '3').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            { day_2.filter(item => item.group_id.charAt(7) === '2').length != 0 && (  
              <button onClick={()=>{ setSendData( day_2.filter(e=>e.group_id.charAt(7) ==='2')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_2.filter(e=>e.group_id.charAt(7) ==='2')[0]?.teacher_id as any} lesson ={day_2.filter(e=>e.group_id.charAt(7) ==='2')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_2.filter(item => item.group_id.charAt(7) === '2').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            { day_2.filter(item => item.group_id.charAt(7) === '1').length != 0 && (  
              <button onClick={()=>{ setSendData( day_2.filter(e=>e.group_id.charAt(7) ==='1')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_2.filter(e=>e.group_id.charAt(7) ==='1')[0]?.teacher_id as any} lesson ={day_2.filter(e=>e.group_id.charAt(7) ==='1')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_2.filter(item => item.group_id.charAt(7) === '1').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            



              <td className=" rounded-t-sm bg-primary text-white    flex   items-center justify-center   text-xs font-semibold sm:text-base xl:p-5 ease relative h-20   border border-stroke p-2 transition duration-500   dark:border-strokedark dark:  md:h-25 md:p-6 xl:h-31">
                <span className="hidden lg:block">دوشنبه</span>
                <span className="block lg:hidden">  دوشنبه </span>
              </td>
 
            </tr>
{/* ***********************************سه شنبه***************************************************         */}

            <tr className="grid grid-cols-6">
            { day_3.filter(item => item.group_id.charAt(7) === '5').length != 0 && (  
              <button onClick={()=>{ setSendData( day_3.filter(e=>e.group_id.charAt(7) ==='5')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_3.filter(e=>e.group_id.charAt(7) ==='5')[0]?.teacher_id as any} lesson ={day_3.filter(e=>e.group_id.charAt(7) ==='5')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_3.filter(item => item.group_id.charAt(7) === '5').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            { day_3.filter(item => item.group_id.charAt(7) === '4').length != 0 && (  
              <button onClick={()=>{ setSendData( day_3.filter(e=>e.group_id.charAt(7) ==='4')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_3.filter(e=>e.group_id.charAt(7) ==='4')[0]?.teacher_id as any} lesson ={day_3.filter(e=>e.group_id.charAt(7) ==='4')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_3.filter(item => item.group_id.charAt(7) === '4').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            { day_3.filter(item => item.group_id.charAt(7) === '3').length != 0 && (  
              <button onClick={()=>{ setSendData( day_3.filter(e=>e.group_id.charAt(7) ==='3')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_3.filter(e=>e.group_id.charAt(7) ==='3')[0]?.teacher_id as any} lesson ={day_3.filter(e=>e.group_id.charAt(7) ==='3')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_3.filter(item => item.group_id.charAt(7) === '3').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            { day_3.filter(item => item.group_id.charAt(7) === '2').length != 0 && (  
               <button onClick={()=>{ setSendData( day_3.filter(e=>e.group_id.charAt(7) ==='2')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_3.filter(e=>e.group_id.charAt(7) ==='2')[0]?.teacher_id as any} lesson ={day_3.filter(e=>e.group_id.charAt(7) ==='2')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_3.filter(item => item.group_id.charAt(7) === '2').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            { day_3.filter(item => item.group_id.charAt(7) === '1').length != 0 && (  
               <button onClick={()=>{ setSendData( day_3.filter(e=>e.group_id.charAt(7) ==='1')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_3.filter(e=>e.group_id.charAt(7) ==='1')[0]?.teacher_id as any} lesson ={day_3.filter(e=>e.group_id.charAt(7) ==='1')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_3.filter(item => item.group_id.charAt(7) === '1').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
              <td className=" rounded-t-sm bg-primary text-white    flex   items-center justify-center   text-xs font-semibold sm:text-base xl:p-5 ease relative h-20   border border-stroke p-2 transition duration-500   dark:border-strokedark dark:  md:h-25 md:p-6 xl:h-31">
                <span className="hidden lg:block">سه شنبه</span>
                <span className="block lg:hidden">سه شنبه</span>
              </td>
            </tr>
 {/* ***********************************چهارشنبه***************************************************         */}

            <tr className="grid grid-cols-6">
            { day_4.filter(item => item.group_id.charAt(7) === '5').length != 0 && (  
               <button onClick={()=>{ setSendData( day_4.filter(e=>e.group_id.charAt(7) ==='5')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_4.filter(e=>e.group_id.charAt(7) ==='5')[0]?.teacher_id as any} lesson ={day_4.filter(e=>e.group_id.charAt(7) ==='5')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_4.filter(item => item.group_id.charAt(7) === '5').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            { day_4.filter(item => item.group_id.charAt(7) === '4').length != 0 && (  
             <button onClick={()=>{ setSendData( day_4.filter(e=>e.group_id.charAt(7) ==='4')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_4.filter(e=>e.group_id.charAt(7) ==='4')[0]?.teacher_id as any} lesson ={day_4.filter(e=>e.group_id.charAt(7) ==='4')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_4.filter(item => item.group_id.charAt(7) === '4').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            { day_4.filter(item => item.group_id.charAt(7) === '3').length != 0 && (  
              <button onClick={()=>{ setSendData( day_4.filter(e=>e.group_id.charAt(7) ==='3')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_4.filter(e=>e.group_id.charAt(7) ==='3')[0]?.teacher_id as any} lesson ={day_4.filter(e=>e.group_id.charAt(7) ==='3')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_4.filter(item => item.group_id.charAt(7) === '3').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            { day_4.filter(item => item.group_id.charAt(7) === '2').length != 0 && (  
              <button onClick={()=>{ setSendData( day_4.filter(e=>e.group_id.charAt(7) ==='2')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_4.filter(e=>e.group_id.charAt(7) ==='2')[0]?.teacher_id as any} lesson ={day_4.filter(e=>e.group_id.charAt(7) ==='2')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_4.filter(item => item.group_id.charAt(7) === '2').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            { day_4.filter(item => item.group_id.charAt(7) === '1').length != 0 && (  
              <button onClick={()=>{ setSendData( day_4.filter(e=>e.group_id.charAt(7) ==='1')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_4.filter(e=>e.group_id.charAt(7) ==='1')[0]?.teacher_id as any} lesson ={day_4.filter(e=>e.group_id.charAt(7) ==='1')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_4.filter(item => item.group_id.charAt(7) === '1').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
              <td className=" rounded-t-sm bg-primary text-white    flex   items-center justify-center   text-xs font-semibold sm:text-base xl:p-5 ease relative h-20   border border-stroke p-2 transition duration-500   dark:border-strokedark dark:  md:h-25 md:p-6 xl:h-31">
                <span className="hidden lg:block">چهارشنبه</span>
                <span className="block lg:hidden">چهارشنبه</span>
              </td>
 
            </tr>
 {/* ***********************************پنجشنبه***************************************************         */}

            <tr className="grid grid-cols-6">
            { day_5.filter(item => item.group_id.charAt(7) === '5').length != 0 && (  
              <button onClick={()=>{ setSendData( day_5.filter(e=>e.group_id.charAt(7) ==='5')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_5.filter(e=>e.group_id.charAt(7) ==='5')[0]?.teacher_id as any} lesson ={day_5.filter(e=>e.group_id.charAt(7) ==='5')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_5.filter(item => item.group_id.charAt(7) === '5').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            { day_5.filter(item => item.group_id.charAt(7) === '4').length != 0 && (  
             <button onClick={()=>{ setSendData( day_5.filter(e=>e.group_id.charAt(7) ==='4')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_5.filter(e=>e.group_id.charAt(7) ==='4')[0]?.teacher_id as any} lesson ={day_5.filter(e=>e.group_id.charAt(7) ==='4')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_5.filter(item => item.group_id.charAt(7) === '4').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            { day_5.filter(item => item.group_id.charAt(7) === '3').length != 0 && (  
              <button onClick={()=>{ setSendData( day_5.filter(e=>e.group_id.charAt(7) ==='3')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_5.filter(e=>e.group_id.charAt(7) ==='3')[0]?.teacher_id as any} lesson ={day_5.filter(e=>e.group_id.charAt(7) ==='3')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_5.filter(item => item.group_id.charAt(7) === '3').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            { day_5.filter(item => item.group_id.charAt(7) === '2').length != 0 && (  
              <button onClick={()=>{ setSendData( day_5.filter(e=>e.group_id.charAt(7) ==='2')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_5.filter(e=>e.group_id.charAt(7) ==='2')[0]?.teacher_id as any} lesson ={day_5.filter(e=>e.group_id.charAt(7) ==='2')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_5.filter(item => item.group_id.charAt(7) === '2').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
            { day_5.filter(item => item.group_id.charAt(7) === '1').length != 0 && (  
              <button onClick={()=>{ setSendData( day_5.filter(e=>e.group_id.charAt(7) ==='1')[0]) , setUpdatemodal(true)}} className="ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
                <span className="font-medium text-black dark:text-white">
                <SearchUser_In_Client data={day_5.filter(e=>e.group_id.charAt(7) ==='1')[0]?.teacher_id as any} lesson ={day_5.filter(e=>e.group_id.charAt(7) ==='1')[0]?.lesson_id as any} />
 
                </span>
              </button>
               )}
            { day_5.filter(item => item.group_id.charAt(7) === '1').length == 0 && ( 
              <td className="flex items-center justify-center  bg-slate-200 dark:bg-slate-600 ease relative h-20 cursor-pointer border border-white p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31">
              <span className="font-medium text-black dark:text-white items-center">
               خالی
              </span>
            </td>) }
          {/* --------------------- */}
              <td className=" rounded-t-sm bg-primary text-white    flex   items-center justify-center   text-xs font-semibold sm:text-base xl:p-5 ease relative h-20   border border-stroke p-2 transition duration-500   dark:border-strokedark dark:  md:h-25 md:p-6 xl:h-31">
                <span className="hidden lg:block">پنجشنبه</span>
                <span className="block lg:hidden">پنجشنبه</span>
              </td>
 
            </tr>
  {/* **************************************************************************************         */}

          </tbody>

          
        </table>
        <Link href='/calendar/allclass'> wwwwwwwwww</Link >

      </div>
     
    </div>
  );
};

export default Calendar;
