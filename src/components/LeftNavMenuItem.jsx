import React, { useContext } from 'react';
import { Context } from '../context/contextApi';

const LeftNavMenuItem = ({text, icon, className, action}) => {

  const {mobileMenu} = useContext(Context);
  return (
    <div className={`text-[#303030] dark:text-white text-sm h-10 cursor-pointer flex items-center ${mobileMenu?"":"px-3"} mb-[1px] rounded-lg hover:bg-[#303030]/[0.15] dark:hover:bg-white/[0.15] ${className}`}
    onClick={action}
    >
      <span className="text-xl mr-5">
        {icon}
      </span>
      
      <span className={`${mobileMenu?"md:hidden":"block"}`}>
        {text}
      </span>
        

    </div>
  )
}

export default LeftNavMenuItem