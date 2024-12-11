 
 
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ChartOne from "@/components/Charts/ChartOne";
import ChartTwo from "@/components/Charts/ChartTwo";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOption } from "@/libs/next-auth";
import AllweekforTeacher from "@/components/allweekforTeacher";
import AllClass from "@/components/allweek";
import SignUp from "./signup/page";
import SignIn from "./signin/page";

export const metadata: Metadata = {
  title: "Tavana| توانا ",
  description: "توانا بود هرکه دانا بود",
 
};
 
 
 

 
const Home= async()=> {
  
 const session = await getServerSession(authOption);
  if(!session  ) {
     return <SignIn/>
  }

  if( session?.user.userRole == 'TEACHER' ) {
     return (
      <>

      <DefaultLayout>
      <Breadcrumb pageName="" />
      <AllweekforTeacher/>
       </DefaultLayout>
    </>
     );
  }
  if( session?.user.userRole == 'USER' ) {
     return (
      <>

      <DefaultLayout>
      <Breadcrumb pageName="" />
        <AllClass/>
       </DefaultLayout>
    </>
     );
  }

  if( session?.user.userRole == 'ADMIN' ) {
        return (
          <>

            <DefaultLayout>
            <Breadcrumb pageName="" />

            <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
              <ChartOne />
              <ChartTwo />
            </div>
            </DefaultLayout>
          </>
        )

      }
}
export default Home;
