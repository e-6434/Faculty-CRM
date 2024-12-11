 
import React from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import NewLessonForm from "@/components/addclass/addTeacher/admin-add-class";
 import LeftSlideLesson from "@/components/addclass/addTeacher/left-slid/left-main-lesson";
import AdminClassList from "@/components/addclass/addTeacher/left-slid/recent-lesson";
  import { authOption } from "@/libs/next-auth";
import { getServerSession } from "next-auth";
 
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AddNewTeacherForm from "@/components/addclass/addTeacher/admin-add-class";

export const metadata: Metadata = {
  title: "Tavana | ثبت استاد ",
  description:
    "افزودن استاد",
};

const FormElementsPage =async () => {
  const session = await getServerSession(authOption);
 
  if(!session || session?.user.userRole !== 'ADMIN' ) return <div className="flex flex-col items-center justify-center h-96"> دسترسی غیر مجاز</div>
  return (
    
    <DefaultLayout>
       <Breadcrumb pageName="ثبت استاد" />
   
      <AddNewTeacherForm/>
 
    </DefaultLayout>
  );
};

export default FormElementsPage;




 

 