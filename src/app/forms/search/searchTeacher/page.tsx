import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import NewLessonForm from "@/components/addclass/addTeacher/admin-add-class";
import { authOption } from "@/libs/next-auth";
import { getServerSession } from "next-auth";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AdminClassList from "@/components/addclass/addTeacher/left-slid/recent-lesson";
import TableThree from "@/components/Tables/TableThree";

export const metadata: Metadata = {
  title: "Tavana | جست و جوی استاد  ",
  description:
    "جست وجوی استاد",
};

const searchTeacher =async () => {
  const session = await getServerSession(authOption);
 
  if(!session || session?.user.userRole !== 'ADMIN' ) return <div className="flex flex-col items-center justify-center h-96"> دسترسی غیر مجاز</div>
  return (
    
    <DefaultLayout>
       <Breadcrumb pageName=" جست و جوس استاد" />
 
   <div dir="rtl"  className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
               ورود اطلاعات
              </h3>
            </div>
            {/* <TableThree /> */}
       <AdminClassList/>
</div>
    </DefaultLayout>
  );
};

export default searchTeacher;