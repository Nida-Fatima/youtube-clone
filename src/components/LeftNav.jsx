import React,{useContext} from 'react';
import { useNavigate } from 'react-router';
import { Context } from '../context/contextApi';

import LeftNavMenuItem from '../components/LeftNavMenuItem';
import {categories} from '../utils/constants';


const LeftNav = () => {

  const {selectCategories, setSelectCategories, mobileMenu} = useContext(Context);

  const navigate = useNavigate();

  const clickHandler = (name,type)=>{
    switch(type){
      case "category":
        return setSelectCategories(name)
      case "home":
        return setSelectCategories(name)
      case "menu":
        return false
      default:
        break;
    }

  }
  return (
    <div className={`md:block ${mobileMenu ? "w-[240px] md:w-[60px]":"w-[240px]"}  overflow-y-auto h-full py-4 bg-white dark:bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all ${mobileMenu ? "translate-x-0":""}`}>
      <div className="flex px-5 flex-col">
        {
          categories.map((item,index)=>{
            return(
              <React.Fragment  key={index}>
                <LeftNavMenuItem 
                text={item.name === "New"?"Home":item.name}
                icon = {item.icon}
                action={()=>{
                  clickHandler(item.name, item.type)
                  navigate('/')
                }}
                className={`${selectCategories === item.name ? `${!mobileMenu ? "bg-[#303030]/[0.15] dark:bg-white/[0.15]":"bg-[#303030]/[0.15] dark:bg-white/[0.15] md:bg-transparent md:border-b-[1px] md:border-[#303030]"}`:""}`}
                />
                {item.divider && (
                  <hr className="border-[#303030]/[0.2] dark:border-white/[0.2] my-2" />
                )}

              </React.Fragment>
            )
          })
        }
        <hr className="border-[#303030]/[0.2] dark:border-white/[0.2] my-2" />
        <div className="text-[#303030]/[0.5] dark:text-white/[0.5] text-[12px]">
          Clone by : Nida Fatima
        </div>
      </div>
    </div>
  )
}

export default LeftNav