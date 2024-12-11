'use client'
import Link from "next/link"
import * as React from 'react';
 
import Fab from '@mui/material/Fab';
 
import EditIcon from '@mui/icons-material/Edit';
 
 
 
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
type Person={
  id:number
  name :String   
  family:String  
  email:String  
  education:String  
  expertise :string
  phon:number
  
}  
  type Props = {
    data :Person[]
     
  
  }
const RecentlyUser = ({data}:Props) => {
  return ( 

    <div className="flex flex-col gap-3">
       
    {data.map((e)=>( 
  
  <div key={e.id} className="bg-base-100 collapse">
  <input type="checkbox" className="peer" />
  <div  
    className=" flex flex-row justify-around bg-gray-400 collapse-title text-white peer-checked:bg-gray-200 peer-checked:text-black">
      <p>{e.name} - {e.family} </p>
    <ArrowDropDownCircleIcon></ArrowDropDownCircleIcon>
  </div>
  <div
    className="collapse-content   text-primary-content peer-checked:bg-gray-200 peer-checked:text-black">
 <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
         
        <th>نام</th>
        <th>شهرت</th>
        <th>نام کاربری</th>
        <th> شماره تماس  </th>
        <th>  </th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr className="bg-base-200">
         
        <td> {e.name}</td>
        <td>{e.family} </td>
        <td>{e.email} </td>
        <td> {e.phon}</td>
        <td>   
      <Link href={`/addclass/addUser/${e.id}`}> 
      <Fab size="small" color="secondary" aria-label="edit">
        <EditIcon />
      </Fab>
    </Link>
    </td>
      </tr>

    </tbody>
  </table>
</div>
  </div>
</div>

   
  ))}
   
  
  </div>
   );
}
 
export default RecentlyUser;

 