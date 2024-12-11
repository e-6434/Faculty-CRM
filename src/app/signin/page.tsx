import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import LoginForm from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Tavana| ورود",
  description: "احراز هویت",
};

const SignIn: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="ورود" />

       <LoginForm/>
  
      
    </DefaultLayout>
  );
};

export default SignIn;
