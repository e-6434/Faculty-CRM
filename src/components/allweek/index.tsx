'use client'
import { useEffect, useState } from "react";
import { format, parseISO } from 'date-fns-jalali';
 
import { AllSearchLessonGroup, SearchLessonGroupByTerm } from "@/action/lesson_group";
 import '@/components/allweek/css.css'
 
import SearchTeacher_In_Client from "./searchTechar";
import SearchLesson_In_Client from "./searchLesson";
import DeletLessongroupButton from "./delete-lesson-button";
type LessonGroupData={
  group_id:String  
  teacher_id: String  
  lesson_id : String 
  number_group:string

  }
type Search={
 
  term:string
  year:string
}

const aa  = ['1','2','3','4','5','6']
const hour = ['1','2','3','4','5' ];
const currentDate = new Date();

// دریافت سال، ماه و روز
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // ماه از 0 شروع می‌شود
const day = String(currentDate.getDate()).padStart(2, '0');

// ترکیب به فرمت YYYY-MM-DD
const formattedDate = `${year}-${month}-${day}`;
  const gregorianDate = formattedDate;
  const jalaliDate = format(parseISO(gregorianDate), 'yyyy/MM/dd');




const AllClass = () => {


  const [groupData,setGroupData] = useState<LessonGroupData[]>([]);
  const [day_0,setDay_0] = useState<LessonGroupData[]>([]); 
  const [day_1,setDay_1] = useState<LessonGroupData[]>([]);
  const [day_2,setDay_2] = useState<LessonGroupData[]>([]);
  const [day_3,setDay_3] = useState<LessonGroupData[]>([]);
  const [day_4,setDay_4] = useState<LessonGroupData[]>([]);
  const [day_5,setDay_5] = useState<LessonGroupData[]>([]);
  const [formData,setFormData] = useState<Search>({ term:'' , year:jalaliDate.slice(0,4)});
  useEffect(() => {
    const fetchData5 = async () => {
        
         const GroupData = await  SearchLessonGroupByTerm(formData as any);
         setGroupData(GroupData as any);
       console.log('====================================');
       console.log();
       console.log('====================================');
          
         
         
    };
  
    fetchData5();
  },[formData]); 

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
     console.log(day_4);
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
    
    const handlChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
      const{name  , value} = event.target;
      setFormData((prevData)=>({
        ...prevData,
        [name]:value,
      }))
    
      };  
 
 
  return (

    <div className="mx-auto max-w-7xl ">
            <tr className="no-print grid grid-cols-2 rounded-t-sm   text-white    ">
 
 
 <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">

     <select  onChange={handlChange} 
      name="year"
      className="bg-green-200  w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        >
          
          <option > </option>
           <option value={String(parseInt(jalaliDate.slice(0,4))+2)} >{parseInt(jalaliDate.slice(0,4))+2}</option>
        <option  value={String(parseInt(jalaliDate.slice(0,4))+1)} >{parseInt(jalaliDate.slice(0,4))+1}</option>

         <option className="bg-orange-300" value={jalaliDate.slice(0,4)} >{  jalaliDate.slice(0,4)}</option>
         <option value={String(parseInt(jalaliDate.slice(0,4))-1)} >{parseInt(jalaliDate.slice(0,4))-1}</option>
         <option value={String(parseInt(jalaliDate.slice(0,4))-2)} >{parseInt(jalaliDate.slice(0,4))-2}</option>

     </select>
     <label className="  m-5 mb-3 block text-sm font-medium text-black dark:text-white">
     سال 
     </label>
 </th>

 <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">

      <select onChange={handlChange} 
      name="term"
      className="bg-green-200     w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        >
          
          
          <option > </option>      
             <option value="1"> مهر - بهمن</option>
         <option value="2"> بهمن - تیر</option>
         <option value="0">تابستان</option>
     </select>
     <label className=" m-5 mb-3 block text-sm font-medium text-black dark:text-white">
     ترم  
   </label>
 </th>



</tr>
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className=" no-print">
 
      {/* محتوای دیگر */}
      
 
<button  onClick={()=> window.print()} className="no-print print-btn fixed bottom-6 right-96 bg-blue-500 text-black p-3 rounded-full shadow-lg hover:bg-blue-600 transition">
  <span className="printer-wrapper">
    <span className="printer-container">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 92 75">
        <path
          stroke-width="5"
          stroke="black"
          d="M12 37.5H80C85.2467 37.5 89.5 41.7533 89.5 47V69C89.5 70.933 87.933 72.5 86 72.5H6C4.067 72.5 2.5 70.933 2.5 69V47C2.5 41.7533 6.75329 37.5 12 37.5Z"
        ></path>
        <mask fill="white" id="path-2-inside-1_30_7">
          <path
            d="M12 12C12 5.37258 17.3726 0 24 0H57C70.2548 0 81 10.7452 81 24V29H12V12Z"
          ></path>
        </mask>
        <path
          mask="url(#path-2-inside-1_30_7)"
          fill="black"
          d="M7 12C7 2.61116 14.6112 -5 24 -5H57C73.0163 -5 86 7.98374 86 24H76C76 13.5066 67.4934 5 57 5H24C20.134 5 17 8.13401 17 12H7ZM81 29H12H81ZM7 29V12C7 2.61116 14.6112 -5 24 -5V5C20.134 5 17 8.13401 17 12V29H7ZM57 -5C73.0163 -5 86 7.98374 86 24V29H76V24C76 13.5066 67.4934 5 57 5V-5Z"
        ></path>
        <circle fill="black" r="3" cy="49" cx="78"></circle>
      </svg>
    </span>

    <span className="printer-page-wrapper">
      <span className="printer-page"></span>
    </span>
  </span>
  پرینت
</button>

       
    </div>

         
        {/* جدول محتوا */}
        <div className=" flex flex-row justify-center items-center w-full "> 

                <div className="   border-black-2 w-full">
               {/* شنبه */}
                    <table dir="rtl"  className="border p-12 w-full text-center" >
                      <tr className="bg-slate-200 text-black">
                        <th>    </th>
                        <th>ساعت اول</th>
                        <th>ساعت دوم</th>
                        <th>ساعت سوم</th>
                        <th>ساعت چهارم</th>
                        <th>ساعت پنجم</th>
          
                      </tr>
                   <tr>
                   <td className="bg-slate-200 text-black writing-mode-vertical w-10   ">  شنبه </td>

                    {hour.map((hour,key)=>(

                     <td key={key}> <table   className="border p-12   w-full text-center" >

                      <tr className="bg-slate-400 text-white">
                        <th>نام درس</th>
                        <th>استاد</th>
                        <th>گروه</th>
                        <th>کلاس </th>
                        <th className="no-print">حذف </th>
                      </tr>
                      {day_0.filter(item => item.group_id.charAt(7) ===`${hour}`).map((element,key2)=>(
                       <tr key={key2}>
                          <td><SearchLesson_In_Client lesson={element.lesson_id} /> </td>
                          
                          <td><SearchTeacher_In_Client data={element.teacher_id} /></td>
                          <td>{element.number_group}</td>
                          <td>{element.group_id.charAt(6)}</td>
                          <td className="no-print">{<DeletLessongroupButton id={element.group_id as string}/>}</td>
                        </tr>
                      ))}
                      {day_0.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 4 && (
                         <tr >
                         <th>-</th>
                         <th>-</th>
                         <th>-</th>
                         <th>-</th>
                       </tr>
                      )}
                      {day_0.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 3 && (
                        <>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                        </>
                      )}
                      {day_0.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 2 && (
                        <>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                        </>
                      )}
                      {day_0.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 1 && (
                        <>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                        </>
                      )}
                      {day_0.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 0 && (
                        <>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                        </>
                      )}
  
   

                       
                            </table></td>))}
                        

 
                      
                          </tr>
                      
                    </table>
               {/* یکشنبه */}
               <table dir="rtl"  className="border p-12 w-full text-center" >
               <tr className="bg-slate-200 text-black">
                        <th>    </th>
                        <th>ساعت اول</th>
                        <th>ساعت دوم</th>
                        <th>ساعت سوم</th>
                        <th>ساعت چهارم</th>
                        <th>ساعت پنجم</th>
          
                      </tr>
                   <tr>
                   <td className="bg-slate-200 text-black   writing-mode-vertical w-10">  یکشنبه </td>

                    {hour.map((hour,key)=>(

                     <td key={key}> <table   className="border p-12   w-full text-center" >

                      <tr className="bg-slate-400 text-white">
                        <th>نام درس</th>
                        <th>استاد</th>
                        <th>گروه</th>
                        <th>کلاس </th>
                        <th className="no-print">حذف </th>
                      </tr>
                      {day_1.filter(item => item.group_id.charAt(7) ===`${hour}`).map((element,key2)=>(
                        
                       <tr key={key2}>
                          <td><SearchLesson_In_Client lesson={element.lesson_id} /> </td>
                          <td><SearchTeacher_In_Client data={element.teacher_id}   /></td>
                          <td>{element.number_group}</td>
                          <td>{element.group_id.charAt(6)}</td>
                          <td className="no-print">{<DeletLessongroupButton id={element.group_id as string}/>}</td>

                        </tr>
                      ))}
                      {day_1.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 4 && (
                         <tr >
                         <th>-</th>
                         <th>-</th>
                         <th>-</th>
                         <th>-</th>
                       </tr>
                      )}
                      {day_1.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 3 && (
                        <>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                        </>
                      )}
                      {day_1.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 2 && (
                        <>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                        </>
                      )}
                      {day_1.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 1 && (
                        <>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                        </>
                      )}
                      {day_1.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 0 && (
                        <>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                        </>
                      )}
  
   

                       
                            </table></td>))}
                        

 
                      
                          </tr>
                      
                    </table>
               {/* دوشنبه */}
               <table dir="rtl"  className="border p-12 w-full text-center" >
               <tr className="bg-slate-200 text-black">
                        <th>    </th>
                        <th>ساعت اول</th>
                        <th>ساعت دوم</th>
                        <th>ساعت سوم</th>
                        <th>ساعت چهارم</th>
                        <th>ساعت پنجم</th>
          
                      </tr>
                   <tr>
                   <td className="bg-slate-200 text-black   writing-mode-vertical w-10">  دوشنبه </td>

                    {hour.map((hour,key)=>(

                     <td key={key}> <table   className="border p-12   w-full text-center" >

                      <tr className="bg-slate-400 text-white">
                        <th>نام درس</th>
                        <th>استاد</th>
                        <th>گروه</th>
                        <th>کلاس </th>
                        <th className="no-print">حذف </th>
                      </tr>
                      {day_2.filter(item => item.group_id.charAt(7) ===`${hour}`).map((element,key2)=>(
                        
                       <tr key={key2}>
                          <td><SearchLesson_In_Client lesson={element.lesson_id} /> </td>
                          <td><SearchTeacher_In_Client data={element.teacher_id}   /></td>
                          <td>{element.number_group}</td>
                          <td>{element.group_id.charAt(6)}</td>
                          <td className="no-print">{<DeletLessongroupButton id={element.group_id as string}/>}</td>
                        </tr>
                      ))}
                      {day_2.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 4 && (
                         <tr >
                         <th>-</th>
                         <th>-</th>
                         <th>-</th>
                         <th>-</th>
                       </tr>
                      )}
                      {day_2.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 3 && (
                        <>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                        </>
                      )}
                      {day_2.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 2 && (
                        <>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                        </>
                      )}
                      {day_2.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 1 && (
                        <>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                        </>
                      )}
                      {day_2.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 0 && (
                        <>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                        </>
                      )}
  
   

                       
                            </table></td>))}
                        

 
                      
                          </tr>
                      
                    </table>
               {/* سه شنبه  */}
               <table dir="rtl"  className="border p-12 w-full text-center" >
               <tr className="bg-slate-200 text-black">
                        <th>    </th>
                        <th>ساعت اول</th>
                        <th>ساعت دوم</th>
                        <th>ساعت سوم</th>
                        <th>ساعت چهارم</th>
                        <th>ساعت پنجم</th>
          
                      </tr>
                   <tr>
                   <td className="bg-slate-200 text-black  writing-mode-vertical w-10">  سه شنبه  </td>

                    {hour.map((hour,key)=>(

                     <td key={key}> <table   className="border p-12   w-full text-center" >

                      <tr className="bg-slate-400 text-white">
                        <th>نام درس</th>
                        <th>استاد</th>
                        <th>گروه</th>
                        <th>کلاس </th>
                        <th className="no-print">حذف </th>
                      </tr>
                      {day_3.filter(item => item.group_id.charAt(7) ===`${hour}`).map((element,key2)=>(
                        
                       <tr key={key2}>
                          <td><SearchLesson_In_Client lesson={element.lesson_id} /> </td>
                          <td><SearchTeacher_In_Client data={element.teacher_id}   /></td>
                          <td>{element.number_group}</td>
                          <td>{element.group_id.charAt(6)}</td>
                          <td className="no-print">{<DeletLessongroupButton id={element.group_id as string}/>}</td>

                        </tr>
                      ))}
                      {day_3.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 4 && (
                         <tr >
                         <th>-</th>
                         <th>-</th>
                         <th>-</th>
                         <th>-</th>
                       </tr>
                      )}
                      {day_3.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 3 && (
                        <>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                        </>
                      )}
                      {day_3.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 2 && (
                        <>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                        </>
                      )}
                      {day_3.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 1 && (
                        <>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                        </>
                      )}
                      {day_3.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 0 && (
                        <>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                        </>
                      )}
  
   

                       
                            </table></td>))}
                        

 
                      
                          </tr>
                      
                    </table>
               {/* چهارشنبه */}
               <table dir="rtl"  className="border p-12 w-full text-center" >
               <tr className="bg-slate-200 text-black">
                        <th>    </th>
                        <th>ساعت اول</th>
                        <th>ساعت دوم</th>
                        <th>ساعت سوم</th>
                        <th>ساعت چهارم</th>
                        <th>ساعت پنجم</th>
          
                      </tr>
                   <tr>
                   <td className="bg-slate-200 text-black writing-mode-vertical w-10">چهارشنبه</td>

                    {hour.map((hour,key)=>(

                     <td key={key}> <table   className="border p-12   w-full text-center" >

                      <tr className="bg-slate-400 text-white">
                        <th>نام درس</th>
                        <th>استاد</th>
                        <th>گروه</th>
                        <th>کلاس </th>
                        <th className="no-print">حذف </th>
                      </tr>
                      {day_4.filter(item => item.group_id.charAt(7) ===`${hour}`).map((element,key2)=>(
                        
                       <tr key={key2}>
                          <td><SearchLesson_In_Client lesson={element.lesson_id} /> </td>
                          <td><SearchTeacher_In_Client data={element.teacher_id}   /></td>
                          <td>{element.number_group}</td>
                          <td>{element.group_id.charAt(6)}</td>
                          <td className="no-print">{<DeletLessongroupButton id={element.group_id as string}/>}</td>

                        </tr>
                      ))}
                      {day_4.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 4 && (
                         <tr >
                         <th>-</th>
                         <th>-</th>
                         <th>-</th>
                         <th>-</th>
                       </tr>
                      )}
                      {day_4.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 3 && (
                        <>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                        </>
                      )}
                      {day_4.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 2 && (
                        <>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                        </>
                      )}
                      {day_4.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 1 && (
                        <>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                        </>
                      )}
                      {day_4.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 0 && (
                        <>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                         <tr >
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                          <th>-</th>
                        </tr>
                        </>
                      )}
  
   

                       
                            </table></td>))}
                        

 
                      
                          </tr>
                      
                    </table>
               {/* پنجشنبه */}
               <table dir="rtl"  className="border p-12 w-full text-center" >
               <tr className="bg-slate-200 text-black">
                        <th>    </th>
                        <th>ساعت اول</th>
                        <th>ساعت دوم</th>
                        <th>ساعت سوم</th>
                        <th>ساعت چهارم</th>
                        <th>ساعت پنجم</th>
          
                      </tr>
    <tr>
    <td className="bg-slate-200 text-black writing-mode-vertical w-10">  پنجشنبه </td>

     {hour.map((hour,key)=>(

      <td key={key}> <table   className="border p-12   w-full text-center" >

       <tr className="bg-slate-400 text-white">
         <th>نام درس</th>
         <th>استاد</th>
         <th>گروه</th>
         <th>کلاس </th>
         <th className="no-print">حذف </th>
       </tr>
       {day_5.filter(item => item.group_id.charAt(7) ===`${hour}`).map((element,key2)=>(
         
        <tr key={key2}>
           <td><SearchLesson_In_Client lesson={element.lesson_id} /> </td>
           <td><SearchTeacher_In_Client data={element.teacher_id}   /></td>
           <td>{element.number_group}</td>
           <td>{element.group_id.charAt(6)}</td>
           <td className="no-print">{<DeletLessongroupButton id={element.group_id as string}/>}</td>

         </tr>
       ))}
       {day_5.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 4 && (
          <tr >
          <th>-</th>
          <th>-</th>
          <th>-</th>
          <th>-</th>
        </tr>
       )}
       {day_5.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 3 && (
         <>
          <tr >
           <th>-</th>
           <th>-</th>
           <th>-</th>
           <th>-</th>
         </tr>
          <tr >
           <th>-</th>
           <th>-</th>
           <th>-</th>
           <th>-</th>
         </tr>
         </>
       )}
       {day_5.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 2 && (
         <>
          <tr >
           <th>-</th>
           <th>-</th>
           <th>-</th>
           <th>-</th>
         </tr>
          <tr >
           <th>-</th>
           <th>-</th>
           <th>-</th>
           <th>-</th>
         </tr>
          <tr >
           <th>-</th>
           <th>-</th>
           <th>-</th>
           <th>-</th>
         </tr>
         </>
       )}
       {day_5.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 1 && (
         <>
          <tr >
           <th>-</th>
           <th>-</th>
           <th>-</th>
           <th>-</th>
         </tr>
          <tr >
           <th>-</th>
           <th>-</th>
           <th>-</th>
           <th>-</th>
         </tr>
          <tr >
           <th>-</th>
           <th>-</th>
           <th>-</th>
           <th>-</th>
         </tr>
          <tr >
           <th>-</th>
           <th>-</th>
           <th>-</th>
           <th>-</th>
         </tr>
         </>
       )}
       {day_5.filter(item => item.group_id.charAt(7) ===`${hour}`).length == 0 && (
         <>
          <tr >
           <th>-</th>
           <th>-</th>
           <th>-</th>
           <th>-</th>
         </tr>
          <tr >
           <th>-</th>
           <th>-</th>
           <th>-</th>
           <th>-</th>
         </tr>
          <tr >
           <th>-</th>
           <th>-</th>
           <th>-</th>
           <th>-</th>
         </tr>
          <tr >
           <th>-</th>
           <th>-</th>
           <th>-</th>
           <th>-</th>
         </tr>
          <tr >
           <th>-</th>
           <th>-</th>
           <th>-</th>
           <th>-</th>
         </tr>
         </>
       )}



        
             </table></td>))}
         


       
           </tr>
       
     </table>
                     
                </div>
        </div>
      
 
      </div>
     </div>
  );
};

export default AllClass;
