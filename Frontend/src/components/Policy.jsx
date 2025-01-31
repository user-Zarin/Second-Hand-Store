import React from 'react'
import commercial from '../assets/commercial.png'
import customer from '../assets/customer-service.png'
import money from '../assets/money-exchange.png'


const Policy = () => {
  return (
    <div  className='containerSize flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center  py-20 text-xs sm:text-sm md:text-base'>

            <div className='m-10 '>
            <img  src={commercial} className='w-20 ml-[80px]'/>
            <p className='text-black text-center font-bold'>7 Days Return Policy</p>
            <p className='text-gray-700'>We provide 7 days free return policy</p>
             </div>

            <div className='m-10'>
            <img  src={customer} className='w-20 ml-[80px]'/>
            <p className='text-black font-bold'>7 Days Return Policy</p>
            <p className='text-gray-700'>We provide 7 days free return policy</p>
             </div>
            <div className='m-10'>
            <img  src={money} className='w-20 ml-[80px]'/>
            <p className='text-black font-bold'>7 Days Return Policy</p>
            <p className='text-gray-700'>We provide 7 days free return policy</p>
            </div>
    </div>
  )
}

export default Policy