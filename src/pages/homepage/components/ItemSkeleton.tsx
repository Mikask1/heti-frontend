import React from 'react';

const ItemSkeleton = () => {
  return (
    <div className='min-h-[350px] h-fit pb-2 w-full shadow-md relative rounded-lg'>
      <div className='w-full h-[230px] bg-gray-200 animate-pulse'></div>
      <div className='min-h-[120px] h-fit px-4 flex flex-col justify-center'>
        <div className='flex flex-col gap-1.5'>
          <div className='h-[16px] bg-gray-200 rounded-md animate-pulse'></div>
          <div className='h-[16px] bg-gray-200 rounded-md w-1/2 animate-pulse'></div>
          <div className='h-[14px] bg-gray-200 rounded-md w-2/3 animate-pulse'></div>
          <div className='h-[14px] bg-gray-200 rounded-md w-1/4 animate-pulse'></div>
        </div>
      </div>
    </div>
  );
};

export default ItemSkeleton;
