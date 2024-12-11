"use client";

import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { format, parseISO } from 'date-fns-jalali';
import { SearchLessonGroupByTerm } from "@/action/lesson_group";
import { Term_c } from "../addclass/add-group-lesson/convert-data";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "bar",
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: "25%",
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: "25%",
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "last",
    },
  },
  dataLabels: {
    enabled: false,
  },

  xaxis: {
    categories: ["کلاس 1", "کلاس 2", "کلاس 3", "کلاس 4", "کلاس 5", "کلاس 6" ],
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    fontFamily: "Satoshi",
    fontWeight: 500,
    fontSize: "14px",

 
  },
  fill: {
    opacity: 1,
  },
};

interface ChartTwoState {
  series: {
    name: string;
    data: number[];
  }[];
}
type LessonGroupData={
  group_id:String  
  teacher_id: String  
  lesson_id : String 

  }
type Search={
  
  term:string
  year:string
}

const currentDate = new Date();

// دریافت سال، ماه و روز
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // ماه از 0 شروع می‌شود
const day = String(currentDate.getDate()).padStart(2, '0');

// ترکیب به فرمت YYYY-MM-DD
const formattedDate = `${year}-${month}-${day}`;
  const gregorianDate = formattedDate;
  const jalaliDate = format(parseISO(gregorianDate), 'yyyy/MM/dd');
const ChartTwo: React.FC = () => {
  const [groupData,setGroupData] = useState<LessonGroupData[]>([]);
  const [class_0,setClass_0] = useState<LessonGroupData[]>([]); 
  const [class_1,setClass_1] = useState<LessonGroupData[]>([]);
  const [class_2,setClass_2] = useState<LessonGroupData[]>([]);
  const [class_3,setClass_3] = useState<LessonGroupData[]>([]);
  const [class_4,setClass_4] = useState<LessonGroupData[]>([]);
  const [class_5,setClass_5] = useState<LessonGroupData[]>([]);
  const [formData,setFormData] = useState<Search>({ term:'' , year:jalaliDate.slice(0,4)});
  
  const handlChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
    const{name  , value} = event.target;
    setFormData((prevData)=>({
      ...prevData,
      [name]:value,
    }))
  
    };  
    
   
  
  useEffect(() => {
    const fetchData2 = async () => {
      setClass_0  (groupData.filter(item => item.group_id.charAt(5) === '0'));
      setClass_1  (groupData.filter(item => item.group_id.charAt(5) === '1'));
      setClass_2  (groupData.filter(item => item.group_id.charAt(5) === '2'));
      setClass_3  (groupData.filter(item => item.group_id.charAt(5) === '3'));
      setClass_4  (groupData.filter(item => item.group_id.charAt(5) === '4'));
      setClass_5  (groupData.filter(item => item.group_id.charAt(5) === '5'));
  
  
  
        
    };
  
    fetchData2();
     },[groupData]); 
    
     useEffect(() => {
      const fetchData5 = async () => {
          
           const GroupData = await  SearchLessonGroupByTerm(formData as any);
           setGroupData(GroupData as any);
         
            
           
           
      };
    
      fetchData5();
    },[formData]); 
    useEffect(() => {
      const date = async () => {
        if ( parseInt(jalaliDate.slice(5,7)) >= 7 && parseInt(jalaliDate.slice(5,7)) <= 11 ) {
          setFormData((prevData)=>({
            ...prevData,
            term:'1'
          }))
        }else if (parseInt(jalaliDate.slice(5,7)) >=11 && parseInt(jalaliDate.slice(5,7)) <= 4) {
          setFormData((prevData)=>({
            ...prevData,
            term:'2'
          }))
        }else{
          setFormData((prevData)=>({
            ...prevData,
            term:'0' 
          }))
        }
           
      };
    
      date();
    },[]); // آرایه وابستگی خالی به این معنی است که این اثر فقط یک بار در بارگذاری اولیه اجرا می‌شود
    
  


  const series = [
    
    {
      name: "تعداد کلاس",
      data: [class_0.length, class_1.length, class_2.length, class_3.length, class_4.length, class_5.length ],
    },
  ];

  return (
    <div className="col-span-12  rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">

      <div dir="rtl" className="mb-4 justify-between gap-4 sm:flex">
        
        <div>
          <h4  className="text-xl font-semibold text-black dark:text-white">
            فشردگی کلاس ها در طول هفته
          </h4>
        </div>
        <div>
 
        </div>
        
      </div>
      <div dir="rtl" className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        
 
        <div className="right-0 flex min-w-47.5">
           <div className=" flex justify-around flex-row w-full">
           <div> سال:  <span className="font-semibold text-primary">{formData.year}</span></div> 
          <div> ترم:  <span className="font-semibold text-primary"> {Term_c( formData.term) }</span></div>
           
 
          </div>
        </div>

        

      
       
    </div>

      <div>
        <div id="chartTwo" className="-mb-9 -ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
      <tr className="grid grid-cols-2 rounded-t-sm mt-5  text-white    ">
 
 
 <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">

     <select  onChange={handlChange} 
      name="year"
      className="bg-green-200  w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        >
          
          <option    > </option>
        <option value={String(parseInt(jalaliDate.slice(0,4))+2)} >{parseInt(jalaliDate.slice(0,4))+2}</option>
        <option  value={String(parseInt(jalaliDate.slice(0,4))+1)} >{parseInt(jalaliDate.slice(0,4))+1}</option>

         <option className="bg-orange-300" value={jalaliDate.slice(0,4)} >{  jalaliDate.slice(0,4)}</option>
         <option value={String(parseInt(jalaliDate.slice(0,4))-1)} >{parseInt(jalaliDate.slice(0,4))-1}</option>
         <option value={String(parseInt(jalaliDate.slice(0,4))-2)} >{parseInt(jalaliDate.slice(0,4))-2}</option>

     </select>
     <label className="  m-5 mb-3 block text-sm font-medium text-black dark:text-white">
     سال 
     </label>
 </th>

 <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">

      <select onChange={handlChange} 
      name="term"
      className="bg-green-200     w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        >
          
          
          <option > </option>
         <option value="1"> مهر - بهمن</option>
         <option value="2"> بهمن - تیر</option>
         <option value="0">تابستان</option>
     </select>
     <label className=" m-5 mb-3 block text-sm font-medium text-black dark:text-white">
     ترم  
   </label>
 </th>



</tr>
    </div>
  );
};

export default ChartTwo;
