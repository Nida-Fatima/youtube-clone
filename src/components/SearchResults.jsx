import React, { useContext, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { fetchDataFromAPI } from '../utils/api';
import { Context } from '../context/contextApi';
import LeftNav from './LeftNav';
import SearchResultVideoCard from './SearchResultVideoCard';


const SearchResults = () => {

  const [result,setResult] = useState()
  const {searchQuery} = useParams();
  const {setLoading} = useContext(Context);

  useEffect(()=>{
    document.getElementById("root").classList.remove('custom-h');
    fetchSerachResults()

  },[searchQuery])

  const fetchSerachResults = ()=>{

    setLoading(true)

    fetchDataFromAPI(`search/?q=${searchQuery}`).then((res) => {
      console.log("response!!!",res)
      setResult(res?.contents)
      setLoading(false)
    })
  }
  return (
    <div className='flex h-[calc(100%-56px)]'>
      <LeftNav />
      <div className='grow w-[calc(100%-240px)] h-full overflow-auto bg-white dark:bg-black'>
        <div className='grid grid-cols-1 gap-2 p-5'>
        {
            result?.map((item,index)=>{
              if(item?.type !== 'video') return false
              let video = item?.video
              return (
              <SearchResultVideoCard 
                key={index} 
                video={video} />)
            })
          }
        </div>
      </div>

    </div>
    // <div className='="flex flex-row h-[calc(100%-56px)] border-8 border-red-300'>
    //   <LeftNav />
    //   <div className='grow w-[calc(100%-240px)] h-full overflow-auto bg-white dark:bg-black'>
    //     <div className='grid grid-cols-1 gap-2 p-5'>
    //       {
    //         result?.map((index,item)=>{
    //           // if(item?.type !== 'video') return false
    //           let video = item?.video
    //           return (
    //           <SearchResultVideoCard 
    //             key={index} 
    //             video={video} />)
    //         })
    //       }
    //     </div>
    //   </div>
      
    // </div>
  )
}

export default SearchResults