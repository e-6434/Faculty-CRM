'use client'

export const Day_c=  (number:string )=>{
  if (number==='0') {
    return 'شنبه'
  }
  else if (number==='1') {
    return 'یکشنبه'
  }
  else if (number==='2') {
    return 'دوشنبه'
  }
  else if (number==='3') {
    return 'سه شنبه'
  }
  else if (number==='4') {
    return 'چهارشنبه'
  }
  else if (number==='5') {
    return 'پنجشنبه'
  }else{
    return 'نامشخص'
  }

 
}
export const Term_c=  (number:string )=>{
  if (number==='0') {
    return 'تابستان'
  }
  else if (number==='1') {
    return 'مهر - بهمن'
  }
  else if (number==='2') {
    return 'بهمن - تیر'
  }
 else{
    return 'نامشخص'
  }

 
}
export const Hour_c=  (number:string )=>{
  if (number==='1') {
    return '07:20 - 08:50'
  }
  else if (number==='2') {
    return '09:00 - 10:30'
  }
  else if (number==='3') {
    return '10:40 - 12:10'
  }
  else if (number==='4') {
    return '14:00 - 15:30'
  }
  else if (number==='5') {
    return '15:45 - 1715'
  }
  else{
    return 'نامشخص'
  }

 
}
 