'use client'
import * as React from 'react';
import { useRef, useState } from "react";
 
 import Newww from './search';
import Link from 'next/link';
import SettingsIcon from '@mui/icons-material/Settings';
import RecentlyUser from './RecentlyUser';
import { Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { useSession } from 'next-auth/react';

import SubmitButton from '@/app/ui/submi-button';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { useEffect } from 'react';
import { SearchUser, SearchUserImage } from '@/action/auth-action';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
 
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import DeletLessonButton from '../delete-lesson-button';
 
 
 

 
  type ImageData={
    email:string
    image:any
    }

type Person={
  id:number
  name :String   
  family:String  
  email:String  
  education:String  
  expertise :string
  phon:number
  
}  
 

type Props = {
  data :Person[]
   

}

type FormData={
  name:string
  family:string
  
    
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
  type FormData3={
 
    name:string |null
    email:string |null
    
    family:string |null
    education:string |null
    expertise:string  |null
    phon:number |null
      
    }


export default function LeftSlideTeacher({data}:Props ) {
  const { data: session, status } = useSession();
  if(!session || session?.user.userRole !== 'ADMIN' ) return <div className="flex flex-col items-center justify-center h-96"> دسترسی غیر مجاز</div>
  
   
  const [formData,setFormFata] = useState<FormData3>({name:null ,  family: null , email:null  , education:null,expertise:null , phon:null });
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
            
           const user  = await SearchUser(formData  as FormData3);
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
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
              <div className="relative">
         
         <PersonSearchIcon/>
      <input
        onChange={handlChange}
 
        placeholder="شهرت..."
        className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-22 transition-all focus:w-64 outline-none"
        name="family"
        type="text"
      />
    </div>
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
              <div className="relative">
         
         <PersonSearchIcon/>
      <input
        onChange={handlChange}
 
        placeholder="تخصص..."
        className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-22 transition-all focus:w-64 outline-none"
        name="expertise"
        type="text"
      />
    </div>
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
              <div className="relative">
         
         <PersonSearchIcon/>
      <input
        onChange={handlChange}
 
        placeholder="تحصیلات..."
        className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-22 transition-all focus:w-64 outline-none"
        name="education"
        type="text"
      />
    </div>
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
              <div className="relative">
         
         <PersonSearchIcon/>
      <input
        onChange={handlChange}
 
        placeholder="شماره همراه..."
        className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-22 transition-all focus:w-64 outline-none"
        name="phon"
        type="number"
      />
    </div>
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                
              </th>
            </tr>
          </thead>
          {modal &&  formData2?.map((packageItem,key)=>(

          <tbody>
           
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.name}
                  </h5>
                
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.family}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.expertise}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.education}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {packageItem.phon}
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
                  <Link className="rounded-md p-4 bg-gray-100 text-blue-500 shadow-md hover:bg-gray-200" href={`/profile/${packageItem.id}`}>
                  <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
            </Link>
 
 
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

 