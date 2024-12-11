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
 
 const SearchUser_In_Client = ({data , lesson}:any) => {
  const [teacherDetail,setTeacherDetail ] = useState<FormData2[]>([]);
  const [lessonData,setLessonData ] = useState<LessonData[]>([]);  
  useEffect(() => {
    const fetchData = async () => {
        try {
         const UserData = await SearchUserById(parseInt(data));
         setTeacherDetail(UserData);
         const LessonData = await Search_Lesson_By_Id(lesson as any);
         setLessonData(LessonData);
        //  console.log('====================================');
        //  console.log('UserData' , UserData);
        //  console.log('LessonData' , LessonData);
        //  console.log('====================================');
        } catch (error) {
   
        }  
         
    };
  
    fetchData();
  },[]); // آرایه وابستگی خالی به این معنی است که این اثر فقط یک بار در بارگذاری اولیه اجرا می‌شود
 if (teacherDetail[0]?.name  && lessonData[0]?.name !== undefined) {
   return (
      <div className="flex flex-col items-center  ">
        <span className="text-sm"> { teacherDetail[0]?.name  }-{teacherDetail[0]?.family}</span> 
        <span className="text-sm"> { lessonData[0]?.name  } </span> 
      </div>
     );
 }else{

  return (
    <div className="flex flex-col items-center  ">
      <span className="text-sm">  **** - ****</span> 
      <span className="text-sm"> ****  </span> 
    </div>
   );
 }
     
 

 
  
 }
  
 export default SearchUser_In_Client;


