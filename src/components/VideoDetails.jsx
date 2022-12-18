import React, { useContext, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AiOutlineLike } from 'react-icons/ai';
import { abbreviateNumber } from 'js-abbreviation-number';

import { fetchDataFromAPI } from '../utils/api';
import { Context } from '../context/contextApi';
import SuggestionVideoCard from './SuggestionVideoCard';


const VideoDetails = () => {

  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const {id} = useParams();
  const {setLoading} = useContext(Context);

  useEffect(()=>{
    document.getElementById('root').classList.add('custom-h')
    fetchVideoDetails();
    fetchRelatedVideos();
  },[id]);

  const fetchVideoDetails = ()=>{
    setLoading(true);
    fetchDataFromAPI(`video/details/?id=${id}`).then((res) => {
      console.log(res)
      setVideo(res)
      setLoading(false)

    })
  }

  const fetchRelatedVideos = () =>{
    setLoading(true);
    fetchDataFromAPI(`video/related-contents/?id=${id}`).then((res) => {
      console.log(res)
      setRelatedVideos(res)
      setLoading(false)
    })
  }



  return (
    <div className='="justify-center flex flex-row bg-white dark:bg-black h-[calc(100%-56px)]'>
      <div className='w-full max-w-[1280px] mx-auto flex flex-col lg:flex-row justify-center'>
        
        {/* detail video div below */}
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
          <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <ReactPlayer 
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
              style={{backgroundColor:"#000000"}}
              playing={true}
            />
          </div>
          <div className="text-[#303030] dark:text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
            {video?.title}
          </div>
          <div className="flex justify-between flex-col md:flex-row mt-4">
            <div className="flex">
              <div className='items-start'>
                <div className='flex h-11 w-11 rounded-full overflow-hidden'>
                  <img className='h-full w-full object-cover' src={video?.author?.avatar[0].url} />
                </div>
              </div>

              <div className='flex flex-col ml-3'>
                <div className='dark:text-white text-[#303030] text-md font-semibold flex items-center'>
                  {video?.author?.title}
                  {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                    <BsFillCheckCircleFill className="text-[#303030]/[0.5] dark:text-white/[0.5] text-[12px] ml-1" />
                  )}
                </div>
                <div className='dark:text-white/[0.7] text-[#303030]/[0.7] text-sm'>
                    {video?.author?.stats?.subscribersText}
                </div>

              </div>

            </div>
            <div className='flex mt-4 md:mt-0 dark:text-white text-[#303030]'>
              <div className='flex items-center justify-center h-11 px-4 md:px-6 rounded-3xl dark:bg-white/[0.15] bg-[#303030]/[0.15]'>
                  <AiOutlineLike className='text-xl text-[#303030] dark:text-white mr-2' />
                  <span className='text-xs md:text-sm lg:text-lg'>
                    {`${abbreviateNumber(video?.stats?.likes, 2)} Likes`}
                  </span>
              </div>
              <div className='flex items-center justify-center h-11 px-4 md:px-6 rounded-3xl dark:bg-white/[0.15] bg-[#303030]/[0.15] ml-4'>
                  <AiOutlineLike className='text-xl text-[#303030] dark:text-white mr-2' />
                  <span className='text-xs md:text-sm lg:text-lg'>
                    {`${abbreviateNumber(video?.stats?.views, 2)} Views`}
                  </span>
              </div>

            </div>

          </div>

        </div>
        {/* suggested video div below */}
        <div className='flex flex-col px-6 py-4 overflow-y-auto lg:w-[350px] xl:w-[400px]'>
          {
            relatedVideos?.contents?.map((item,index)=>{
              if(item?.type !== "video") return false;
              return (
                <SuggestionVideoCard key={index} video={item?.video} />
              )
            }
            )
          }
        </div>

      </div>

    </div>
  )
}

export default VideoDetails