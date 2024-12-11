"use client";
import dynamic from "next/dynamic";
import React from "react";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import { getServerSession, Session } from "next-auth";
import { authOption } from "@/libs/next-auth";
import { useSession } from "next-auth/react";
import LoginForm from "../auth/login-form";
type NavbarRoutesProps ={
  session : Session | null;
  vertical?: boolean;
}
const MapOne = dynamic(() => import("@/components/Maps/MapOne"), {
  ssr: false,
});

 

const ECommerce  =   ( ) => {
 const { data: session, status } = useSession();
 
 
if ( !session  ){
return <LoginForm/>;
}
  return (
    <>
      <p>داشبورد</p>
    </>
  );
};

export default ECommerce;
