import { Search_Lesson_By_Id } from "@/action/add-lesson";
import { SearchUserById } from "@/action/auth-action";
import { useEffect, useState } from "react";

 
  type LessonData={
    id : number
    name  :string
    value :  string
    about  : string
    book:  string
    pishniaz_id: number
      
    }
 
 const SearchLesson_In_Client = ({ lesson}:any) => {
 
  const [lessonData,setLessonData ] = useState<LessonData[]>([]);  
  useEffect(() => {
    const fetchData = async () => {
        try {

         const LessonData = await Search_Lesson_By_Id(lesson as any);
         setLessonData(LessonData);
 
        } catch (error) {
   
        }  
         
    };
  
    fetchData();
  },[]); // آرایه وابستگی خالی به این معنی است که این اثر فقط یک بار در بارگذاری اولیه اجرا می‌شود
 if (lessonData[0]?.name !== undefined) {
   return (
 
 
        <span className="text-xs "> { lessonData[0]?.name  } </span> 
 
     );
 }else{

  return (
 
      <span className="text-xs"> ****  </span> 
 
   );
 }
     
 

 
  
 }
  
 export default SearchLesson_In_Client;


