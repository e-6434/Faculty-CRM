'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import AddHomeIcon from '@mui/icons-material/AddHome';
import { useRouter } from 'next/navigation';


const actions = [
  { icon: <AddHomeIcon />, name: 'کتاب',href:'addclass/admin' },
  { icon: <PlaylistAddCheckCircleIcon />, name: 'گروه درسی',href:'addclass/addGroupLesson' },
  { icon: <NoteAddIcon />, name: 'درس' ,href:'addclass/addLeson'},
  { icon: <PersonAddAlt1Icon />, name: 'استاد',href:'addclass/addUser' },
];

const ControlledOpenSpeedDial:React.FC =( )=> {

  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{
    setOpen(false);
  } 
  const router = useRouter();
  return (
    
    <Box  sx={{ height: 580, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
         
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={()=> router.push(`${action.href}`) }
          />
        ))}
      </SpeedDial>
    </Box>

  );
 
}
 export default  ControlledOpenSpeedDial;