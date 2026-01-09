import React from 'react'

const Footer = () => {
  return (
    <div className="flex flex-col  justify-center items-center text-purple-500 font-semibold">
      <div className='flex'>
        Created with
        <img width={25} src="/icons/heart.png" alt="" />
        by Angel Malhotra
      </div>
    </div>
  );
}

export default Footer