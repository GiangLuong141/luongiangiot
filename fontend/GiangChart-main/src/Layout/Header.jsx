import Button from "../Component/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate()
  const [text, setText] = useState('Dash Board');


 
  return (
   <div className="flex items-center justify-evenly w-full bg-header h-[8vh]"> 
   <div className="h-full w-[180px] text-3xl text-white font-bold flex items-center">
   <h1 className="">{text}</h1>
  </div>
    <div className="h-[72px] flex items-center justify-end gap-9">
      <Button onclick={() => {navigate('/dash-board')
    setText('Dash Board')}} text={'Dash Board'} />
      <Button onclick={() => {navigate('/data-senior')
    setText('Dash Senior')}} text={'Data Senior'} />
      <Button onclick={() => {navigate('/history')
    setText('History')
    }} text={'History'} />
      <Button onclick={() => {navigate('/profile')
    setText('Profile')}} text={'Profile'} />
    </div>
   
   </div>
  );
}

export default Header;