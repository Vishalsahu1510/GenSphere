import {assets} from '../assets/assets.js';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {useClerk, UserButton, useUser} from '@clerk/clerk-react'
import { motion } from 'framer-motion';



const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();
  
  return (
    <div className='fixed z-50 w-full bg-black/25 backdrop-blur-xl border-b border-white/10 flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32'>
      <motion.img
        src={assets.logo}
        alt='logo'
        className='w-32 sm:w-44 cursor-pointer gs-glow'
        onClick={()=> navigate('/')}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      />


      {
        user ? <UserButton />:  
        <button
          onClick={openSignIn}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty("--x", `${((e.clientX - r.left) / r.width) * 100}%`);
            e.currentTarget.style.setProperty("--y", `${((e.clientY - r.top) / r.height) * 100}%`);
          }}
          className='gs-btn-pop flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5 hover:opacity-95 transition'
        >
          Get started <ArrowRight className='w-4 h-4'/>
        </button>
      }
      
    </div>
  )
}

export default Navbar