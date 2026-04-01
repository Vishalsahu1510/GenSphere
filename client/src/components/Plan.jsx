import React from 'react'
import {PricingTable} from '@clerk/clerk-react'


const Plan = () => {
  return (
    <div className='max-w-2xl mx-auto z-20 my-30'>
      <div className='text-center'>
        <h2 className='gs-section-title'>Choose your plan</h2>
        <p className='gs-section-subtitle mt-3'>Start free, upgrade when you’re ready — billing handled securely with Clerk.</p>
      </div>
      <div className='mt-14 max-sm:mx-8'>
        <PricingTable />
      </div>
    </div>
  )
}

export default Plan