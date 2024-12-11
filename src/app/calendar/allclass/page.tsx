import Calendar from "@/components/Calender";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getServerSession } from "next-auth";
import { authOption } from "@/libs/next-auth";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AllClass from "@/components/allweek";

export const metadata: Metadata = {
  title: "Tavana | یرنامه کلی",
  description:
    "مشاهده   برنامه ",
};

const CalendarPage =async () => {
  const session = await getServerSession(authOption);
 
  if(!session || session?.user.userRole !== 'ADMIN' ) return <div className="flex flex-col items-center justify-center h-96"> دسترسی غیر مجاز</div>
  return (
    <DefaultLayout >
      <Breadcrumb pageName="برنامه کلی  " />
       <AllClass/>
    </DefaultLayout>
  );
};

export default CalendarPage;