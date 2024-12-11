import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import NewLessonForm from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Tavana| نام نویسی",
  description: "احراز هویت",
  // other metadata
};

const SignUp: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName=" نام نویسی" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        
      <NewLessonForm/>
 
        
      </div>
    </DefaultLayout>
  );
};

export default SignUp;
