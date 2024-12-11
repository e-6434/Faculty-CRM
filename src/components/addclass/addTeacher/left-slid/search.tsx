'use client'
import SubmitButton from '@/app/ui/submi-button';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { useEffect, useRef, useState } from 'react';
import { SearchUser, SearchUserImage } from '@/action/auth-action';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import Link from 'next/link';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import SettingsIcon from '@mui/icons-material/Settings';
 
 

type FormData={
  name:string
  family:string
  }
  type FormData2={
    id:number;
    name:string;
    email:string;
    family:string;
    password:number;
    education:string;
    expertise:string;
    phon:number;
    }
  type ImageData={
    email:string
    image:any
    }
    
  

const Newww = () => {
  

  const [formData,setFormFata] = useState<FormData>({name:'' ,  family: ""  });
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
            
           const user  = await SearchUser(formData  as FormData);
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
  
 
<div className='flex flex-row justify-start  gap-6'>
 <form 
 


   ref={formRef} 
 >

 <div className="flex justify-between items-start flex-col gap-3">
   
   <div className="relative">
       <PersonSearchIcon/>
     <input
      onChange={handlChange}
       placeholder="نام..."
       className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none"
       name="name"
       type="text"
     />
   
   </div>
       
 
    <div className="relative">
         
        <PersonSearchIcon/>
     <input
       onChange={handlChange}

       placeholder="شهرت..."
       className="input shadow-lg focus:border-2 border-gray-300 px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none"
       name="family"
       type="text"
     />
   </div>
   <div className='flex flex-row gap-10'>
    {formData2[0] && modal && <Button dir='ltr' onClick={ ()=> { setModal(false) } }   variant="outlined" startIcon={<DeleteIcon />}>
    تمام
    </Button>}
    </div>
    </div>
 </form>
 {modal &&  formData2.map((e)=>(
   
   <div key={e.id}  className=" h-24 card card-compact bg-base-100 w-48  shadow-xl  sm:flex-col sm:rounded-md sm:border sm:pt-0 sm:shadow-lg sm:transition sm:duration-500 sm:ease-out sm:hover:scale-105 sm:hover:shadow-2xl">
 
 <div className="card-body">
     <h2 className="card-title">{e.name } { e.family} </h2>
     <h2>{e.phon}</h2>
     <div className="card-actions justify-end">
     </div>

   
 
     <Link className="flex justify-center bg-blue-700 px-4 py-1 text-slate-50 rounded-md z-10  transition-all duration-500   items-center   " href={`/addclass/addUser/${e.id}`}>
     <SettingsIcon fontSize='medium' />
             </Link>
  
   </div>
 </div>
 
 )  

)

  
  


}

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

   );
}
 
export default Newww;