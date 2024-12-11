'use client'
import * as React from 'react';
import { useRef, useState } from "react";
import { useSession } from 'next-auth/react';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { useEffect } from 'react';
import { SearchLesson } from '@/action/auth-action';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import DeletLessonButton from '../delete-lesson-button';
 
 
 

 
 

type lesson={

  id:number
  name:String  
  value:String  
  about:String 
  book:String
  pishniaz_id :number

}  
 

type Props = {
  data :lesson[];
}


  type FormData2 ={

    id:number
    name:String  
    value:String  
    about:String 
    book:String
    pishniaz_id :number 

    }

  type FormData3 ={
     name:String |null 
    value:String  |null
    
    book:String|null
  
    }


export default function LeftSlideTeacher({data}:Props ) {
  const { data: session } = useSession();
  if(!session || session?.user.userRole !== 'ADMIN' ) return <div className="flex flex-col items-center justify-center h-96"> دسترسی غیر مجاز</div>
  
   
  const [formData,setFormFata] = useState<FormData3>({name:null , value:null  , book:null });
  const [formData2,setFormFata2] = useState<FormData2[]>([]);
 
  const [modal,setModal] = useState(false);
  const [nullmodal,setNullModal] = useState(false);

  const handlChange = (event: React.ChangeEvent  <HTMLInputElement | HTMLSelectElement>)=>{
    const{name  , value} = event.target;
    setFormFata((prevData)=>({
      ...prevData,
      [name]:value,
    }))
    };

 

    useEffect(() => {
      const fetchData = async () => {
          try {
            setModal(false);
            setNullModal(false);
            
           const user  = await SearchLesson(formData  as FormData3);
            setFormFata2(user);
             console.log(user);
             
           
            setModal(true);
             
         
            
            

          } catch (error) {
                 setNullModal(true)
                 setModal(false);
          }  
           
      };

      fetchData();
  },[formData]); // آرایه وابستگی خالی به این معنی است که این اثر فقط یک بار در بارگذاری اولیه اجرا می‌شود

 
  const formRef = useRef<HTMLFormElement>(null)

  return ( 
    <>
 
    <div className="flex flex-col gap-3">
     <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table dir='rtl' className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-right dark:bg-meta-4">
            <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
آی دی
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
            <div className="relative">
       <PersonSearchIcon/>
     <input
      onChange={handlChange}
       placeholder="نام..."
       className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-22 transition-all focus:w-64 outline-none"
       name="name"
       type="text"
     />
   
   </div>
              </th>
 

              <th className="px-4 py-4 font-medium text-black dark:text-white">
              <div className="relative">
         
         <PersonSearchIcon/>
      <input
        onChange={handlChange}
 
        placeholder="کتاب..."
        className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-22 transition-all focus:w-64 outline-none"
        name="book"
        type="text"
      />
    </div>
              </th>
 
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
              <div className="relative">
         
         <PersonSearchIcon/>
      <input
        onChange={handlChange}
 
        placeholder="تعداد واحد..."
        className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-22 transition-all focus:w-64 outline-none"
        name="value"
        type="text"
      />
    </div>
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                ای دی پیشنیاز
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
               </th>
            </tr>
          </thead>
          {modal &&  formData2?.map((packageItem,key)=>(

          <tbody>
           
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.id}
                  </h5>
                
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.name}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.book}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.value}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.pishniaz_id}
                  </p>
                </td>
                {/* <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      packageItem. === "Paid"
                        ? "bg-success text-success"
                        : packageItem.status === "Unpaid"
                          ? "bg-danger text-danger"
                          : "bg-warning text-warning"
                    }`}
                  >
                    {packageItem.status}
                  </p>
                </td> */}
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                  <DeletLessonButton id={packageItem.id}/>

 
                  </div>
                </td>
              </tr>
        
          </tbody>
)  )}

        </table>
      </div>
    </div>
  
  </div>
 
  <div className='flex flex-row justify-start  gap-6'>
 


   
 
 
 



  
  



{nullmodal && (
 <div className="card card-compact bg-base-100 w-72 shadow-lg sm:flex-col sm:rounded-md sm:border sm:pt-0 sm:shadow-lg sm:transition sm:duration-500 sm:ease-out sm:hover:scale-105 sm:hover:shadow-2xl ">
  
  <div className="card-body" >
    <h1 className="text-center"> <NewReleasesIcon fontSize='large'/>...!...<NewReleasesIcon fontSize='large'/></h1>
    <p>موردی یافت نشد</p>
    
    <Button dir='ltr'onClick={()=>setModal(false)}   variant="outlined" startIcon={<DeleteIcon />}>
  تمام
</Button>
    <div className="card-actions justify-end">

    </div>
  </div>
</div>
)
}
</div>
 </>
  );
}

 