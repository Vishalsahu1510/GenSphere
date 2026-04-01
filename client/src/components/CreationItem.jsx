import { useState } from 'react'
import Markdown from 'react-markdown'



const CreationItem = ({item}) => {

    const [expanded, setExpanded] = useState(false);
  return (
    <div onClick={()=> setExpanded(!expanded)} className='max-w-5xl text-sm gs-card gs-card-pad cursor-pointer hover:bg-white/7 transition' >
      <div className='flex justify-between items-center gap-4'>
        <div >
          <h2 className='text-slate-100 font-medium leading-snug'>{item.prompt}</h2>
          <p className='text-slate-400'>{item.type} - {new Date(item.created_at).toLocaleDateString()}</p>
        </div>
        <span className='bg-white/5 border border-white/10 text-slate-200 px-4 py-1 rounded-full capitalize'>
          {item.type}
        </span>
      </div>

      {
        expanded && (
          <div className='mt-4'>
            {item.type === 'image' ? (
              <div>
                <img src={item.content} alt='image' className='w-full mt-3 max-w-md rounded-lg border border-white/10' />
              </div>
            ) : (
              <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-200'>
                <div className='reset-tw'>
                  <Markdown>{item.content}</Markdown>
                </div>
              </div>
            )}
          </div>
        )
      }

    </div>
  )
}

export default CreationItem