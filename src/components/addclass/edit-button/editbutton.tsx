'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { UpdateLessonAction } from '@/action/add-lesson';
 
  
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
   
};
type Person={
  id :number     
  name :String   
  value:String  
  about:String  
  book:String  
  pishniaz_id :number
   
}  
type Props = {
  data :Person;
}

const EditButton = ({data}:Props)=> {
  const [open, setOpen] = React.useState(false);

   
  
  const [formData, setFormData] = React.useState<{  id:number;  name :String ;  value:String ;   about:String ;   book:String ;  pishniaz_id :number; }>(
    {id:data.id,  name : data.name,  value: data.value,   about:data.about,   book:data.book , pishniaz_id:data.pishniaz_id }
  )     
   
   

  
    
  
  

  const handleChange2 = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const {name ,value}=event.target;
    setFormData({...formData,[name]:value})
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
   return (
    
    <div >
      
      <Button onClick={handleOpen}><div className="text-2xl"> ویرایش</div></Button>
      <Modal
       
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <form
 action={ 
  async( )=>{
  await UpdateLessonAction(formData)
  window.history.pushState(null,'tt',`${formData.id}`)
  window.location.reload();
  setOpen(false)
  
}
    
  

}  
     
    
  
className="max-w-4xl  mx-auto bg-slate-50 border px-14 py-8">
  <div className=" relative z-0 w-full mb-5 group">
      <input value={formData.name as string}   onChange={handleChange2} type="text" name="name" id="floating_email" className="text-2xl block py-2.5 px-0 w-full   text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-xl text-black  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">نام درس</label>
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input value={formData.pishniaz_id}  onChange={handleChange2}  type="number" name="pishniaz_id" id="floating_password" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-xl text-black  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> پیشنیاز این درس   </label>
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input value={formData.book as string} onChange={handleChange2}  type="text" name="book" id="floating_password2" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_password2" className="peer-focus:font-medium absolute text-xl text-black  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> کتاب مورد نیاز</label>
  </div>

  <div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
        <input value={data.id} onChange={handleChange2}  type="number" name="id" id="floating_first_name" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-xl text-black  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">    شماره درس  </label>
    </div>

    <div className="relative z-0 w-full mb-5 group">
        <input value={formData.value as string} onChange={handleChange2} max={3} min={0} type="number" name="value" id="floating_last_name" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-xl text-black  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">   تعداد واحد </label>
    </div>
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input value={formData.about as string}  onChange={handleChange2} type="text" name="about" id="floating_repeat_password2" className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label htmlFor="floating_repeat_password2" className="peer-focus:font-medium absolute text-xl text-black  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">  درباره کتاب  </label>
  </div>
  <button  className="text-white bg-slate-800  hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-slate-900 font-medium rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center ">ثبت</button>


</form>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
   
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
export default EditButton;
