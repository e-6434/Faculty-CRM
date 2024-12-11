import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Link from "next/link";
import NewLessonForm from "@/components/addclass/addlesson/admin-add-class";
 import LeftSlideLesson from "@/components/addclass/addlesson/left-slid/left-main-lesson";
import AdminClassList from "@/components/addclass/addlesson/left-slid/recent-lesson";
 import { authOption } from "@/libs/next-auth";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Tavana | ثبت درس",
  description:
    "افزودن درس",
};

const FormLayout =async () => {
  const session = await getServerSession(authOption);
  console.log(session);
  
  if(!session || session?.user.userRole !== 'ADMIN' ) return <div className="flex flex-col items-center justify-center h-96"> دسترسی غیر مجاز</div>

  return (
    <DefaultLayout>
      <Breadcrumb pageName="ثبت درس" />
      {/* <div className="w-full p-2">*/}
      <NewLessonForm/>
    {/*</div>
    <div className="mt-5 block border-b shadow-md md:hidden"></div>
    <div className="w-full p-2 md:h-96 md:overflow-y-auto">
       <AdminClassList/>
    </div> */}
    </DefaultLayout>
  );
};

export default FormLayout;



 
 

 