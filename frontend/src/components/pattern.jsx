import React from 'react'

const Pattern = (props) => {
  return (
    <div className='max-w-md text-center'>
        <div className='grid grid-cols-5 gap-2 mb-2'>
            {[...Array(25)].map((_,i)=>(
                <div key={i} className={`aspect-square bg-primary/20 rounded-md ${i%2==0?"animate-pulse" : ""}`}/>
            ))}
        </div>
        <div className='text-2xl font-semibold text-primary'>{props.title}</div>
        <div className='text-sm text-base-content'>{props.des}</div>
    </div>
  )
}

export default Pattern