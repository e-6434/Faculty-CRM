import { Search_Lesson_By_Id } from "@/action/add-lesson";
import { SearchUserById } from "@/action/auth-action";
import { useEffect, useState } from "react";

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
 
 const SearchTeacher_In_Client = ({data}:any) => {
  const [teacherDetail,setTeacherDetail ] = useState<FormData2[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
        try {
         const UserData = await SearchUserById(parseInt(data));
         setTeacherDetail(UserData);
 
        } catch (error) {
   
        }  
         
    };
  
    fetchData();
  },[]); // آرایه وابستگی خالی به این معنی است که این اثر فقط یک بار در بارگذاری اولیه اجرا می‌شود
 if (teacherDetail[0]?.name   !== undefined) {
   return (
      
        <span className="text-xs"> { teacherDetail[0]?.name  }-{teacherDetail[0]?.family}</span> 
  
     );
 }else{

  return (
 
      <span className="text-xs ">  **** - ****</span> 
  
 
   );
 }
     
 

 
  
 }
  
 export default SearchTeacher_In_Client;


