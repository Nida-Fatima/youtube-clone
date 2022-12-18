import React from 'react';
import VideoLength from '../shared/videoLength';

import { abbreviateNumber } from 'js-abbreviation-number';
import { Link } from 'react-router-dom';
import { BsFillCheckCircleFill } from 'react-icons/bs';

const VideoCard = ({video}) => {
  return (
    <Link to={`/video/${video?.videoId}`}>
      <div className="flex flex-col mb-8">
        <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden">
          <img className="h-full w-full object-cover" 
          src={video?.thumbnails[0]?.url} />
          {
            video?.lengthSeconds && (
              <VideoLength time={video?.lengthSeconds} />
            )
          }
          
        </div>
        <div className="text-[#303030] dark:text-white mt-3 flex">
          <div className="flex items-start">
            <div className="flex h-9 w-9 rounded-full overflow-hidden">
              <img alt="channel avatar" src={video?.author?.avatar[0]?.url} className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="flex flex-col ml-3 overflow-hidden">
            <span className="text-sm font-bold line-clamp-2">
              {video?.title}
            </span>
            <span className="text-[12px] font-semibold mt-2 dark:text-white/[0.7] text-[#303030]/[0.7] flex items-center ">
              {video?.author?.title}
              {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                <BsFillCheckCircleFill className="text-[#303030]/[0.5] dark:text-white/[0.5] text-[12px] ml-1" />
              )}
            </span>
            <div className="text-[12px] font-semibold mt-2 dark:text-white/[0.7] text-[#303030]/[0.7] flex items-center ">
                <span>
                  {`${abbreviateNumber(video?.stats?.views, 2)} views`}
                </span>
                <span className='flex text-[24px] leading-none font-bold dark:text-white/[0.7] text-[#303030]/[0.7] relative top-[-5px]  mx-1 '>
                  .
                </span>
                <span className="truncate">
                  {video?.publishedTimeText}
                </span>
            </div>
          </div>
        </div>
      </div>

    </Link>
  )
}

export default VideoCard