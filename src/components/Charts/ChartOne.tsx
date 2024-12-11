"use client";

import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {  SearchLessonGroupByTerm } from "@/action/lesson_group";
import { format, parseISO } from 'date-fns-jalali';
import { Term_c } from "../addclass/add-group-lesson/convert-data";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
type LessonGroupData={
  group_id:String  
  teacher_id: String  
  lesson_id : String 

  }
type Search={
   
  term:string
  year:string
}

const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: [
      "شنبه",
      "یکشنبه",
      "دوشنبه",
      "سه شنبه",
      "چهارشنبه",
      "پنجشنبه",
 
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 30,
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
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



const ChartOne: React.FC = () => {
  const [groupData,setGroupData] = useState<LessonGroupData[]>([]);
const [day_0,setDay_0] = useState<LessonGroupData[]>([]); 
const [day_1,setDay_1] = useState<LessonGroupData[]>([]);
const [day_2,setDay_2] = useState<LessonGroupData[]>([]);
const [day_3,setDay_3] = useState<LessonGroupData[]>([]);
const [day_4,setDay_4] = useState<LessonGroupData[]>([]);
const [day_5,setDay_5] = useState<LessonGroupData[]>([]);
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
    setDay_0  (groupData.filter(item => item.group_id.charAt(5) === '0'));
    setDay_1  (groupData.filter(item => item.group_id.charAt(5) === '1'));
    setDay_2  (groupData.filter(item => item.group_id.charAt(5) === '2'));
    setDay_3  (groupData.filter(item => item.group_id.charAt(5) === '3'));
    setDay_4  (groupData.filter(item => item.group_id.charAt(5) === '4'));
    setDay_5  (groupData.filter(item => item.group_id.charAt(5) === '5'));



      
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
        name: "تعداد کلاس ها",
        data: [day_0.length, day_1.length, day_2.length, day_3.length, day_4.length,day_5.length],
      },

 
    ]

  return (
 
  
    <div className="col-span-12 w-full rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">

      <div dir="rtl" className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        
          <div className="right-0 flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="  w-full">
              <p className="font-semibold text-primary">فشردگی کلاسی</p>
                
 
            
            </div>
          </div>
          <div className="right-0 flex min-w-47.5">
 
            <div className=" flex justify-center flex-col w-full">
              
            <div> سال:  <span className="font-semibold text-primary">{formData.year}</span></div> 
            <div> ترم:  <span className="font-semibold text-primary"> {Term_c( formData.term) }</span></div>
             
              
           
                
 
            
            </div>
          </div>

          
 
        
         
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
      <tr className="grid grid-cols-2 rounded-t-sm   text-white    ">
 
 
 <th className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">

     <select  onChange={handlChange} 
      name="year"
      className="bg-green-200  w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        >
          
          <option > </option>
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

export default ChartOne;
