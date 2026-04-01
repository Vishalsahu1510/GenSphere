import { useNavigate } from "react-router-dom"
import { AiToolsData} from "../assets/assets"
import { useUser } from "@clerk/clerk-react"
import { motion } from "framer-motion"
const AiTools = () => {
  const navigate = useNavigate();
  const {user} = useUser();
  return (
    <div className='px-4 sm:px-20 xl:px-32 my-24'>
      <div className="text-center">
        <h2 className='gs-section-title'>Powerful AI tools</h2>
        <p className='gs-section-subtitle mt-3'>Everything you need to create, enhance, and ship content — one studio, endless vibes.</p>
      </div>
      <div className="flex flex-wrap mt-10 justify-center">
        {AiToolsData.map((tool, index) => (
          <motion.div
            key ={index}
            className="p-8 m-4 max-w-xs rounded-2xl bg-white/5 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.06)] border border-white/10 cursor-pointer group"
            onClick={()=> user && navigate(tool.path)}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: Math.min(index * 0.03, 0.15) }}
            whileHover={{ y: -6, rotateX: 2, rotateY: -2, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <tool.Icon className="w-12 h-12 p-3 text-white rounded-xl" style={{background:`linear-gradient(to bottom, ${tool.bg.from},${tool.bg.to})`}}/>
            <h3 className='mt-6 mb-3 text-lg font-semibold text-slate-100 group-hover:text-white transition'>{tool.title}</h3>
            <p className='text-slate-400 text-sm max-w-[95%] group-hover:text-slate-300 transition'>{tool.description}</p>
            <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <p className="mt-4 text-xs text-slate-400 group-hover:text-slate-300 transition">
              Tap to open
            </p>
          </motion.div>
        ))}
      </div>

    </div>
  )
}

export default AiTools