import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js';
import { motion } from 'framer-motion';
const Hero = () => {

  const navigate = useNavigate();


  return (
    <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen text-slate-100 overflow-hidden'>
      <div className="absolute inset-0 bg-slate-950/75"></div>

      {/* GenZ blobs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-violet-600/30 blur-3xl gs-float"></div>
      <div className="absolute top-10 -right-28 w-96 h-96 rounded-full bg-sky-500/25 blur-3xl gs-float-slow"></div>
      <div className="absolute -bottom-28 left-1/3 w-[28rem] h-[28rem] rounded-full bg-emerald-500/15 blur-3xl gs-float"></div>
      <div className="absolute inset-0 opacity-[0.10] gs-noise"></div>

      <div className="relative">
      <div className='text-center mb-6'>
        <motion.h1
          className='font-heading text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-bold mx-auto leading-[1.08] tracking-tight'
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Create amazing content <br/> with{" "}
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-sky-400'>
            AI tools
          </span>
        </motion.h1>
        <motion.p
          className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-slate-300'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45, ease: "easeOut" }}
        >
          Transform your content creation with our suite of premium AI tools. Write articles, generate images, and enhance your workflow.
        </motion.p>
      </div>

      <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>

        <motion.button
          onClick={()=> navigate('/ai')}
          className='gs-btn-pop bg-gradient-to-r from-indigo-500 via-violet-600 to-fuchsia-600 text-white px-10 py-3 rounded-xl shadow-lg shadow-violet-600/20 border border-white/10'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.4, ease: "easeOut" }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty("--x", `${((e.clientX - r.left) / r.width) * 100}%`);
            e.currentTarget.style.setProperty("--y", `${((e.clientY - r.top) / r.height) * 100}%`);
          }}
        >
          Start creating now
        </motion.button>


        <motion.button
          className='bg-white/5 text-slate-100 px-10 py-3 rounded-xl border border-white/10 hover:bg-white/10 transition cursor-pointer'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.4, ease: "easeOut" }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Watch demo
        </motion.button>
      </div>
      <motion.div
        className='flex items-center gap-4 mt-8 mx-auto text-slate-300'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.22, duration: 0.35 }}
      >
        <img src={assets.user_group} className='h-8'/>Trusted by 1000+ people
      </motion.div>
      </div>


    </div>
  )
}

export default Hero