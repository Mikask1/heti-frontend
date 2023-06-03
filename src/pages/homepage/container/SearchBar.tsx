import Image from 'next/image';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiStop } from 'react-icons/bi';
import { BsFillMicFill } from 'react-icons/bs';

import clsxm from '@/lib/clsxm';

type SearchBarProperties = {
  isRecording: boolean;
  record: () => void;
};

const SearchBar = ({ isRecording, record }: SearchBarProperties) => {
  return (
    <section className='flex justify-center mt-20'>
      <div
        className={clsxm(
          'w-[950px] h-12 border border-black rounded-[50px] flex justify-between items-center pl-4 pr-2 transition-all duration-300 ease-in-out',
          isRecording && 'bg-violet border-violet'
        )}
      >
        <AiOutlineSearch
          className={clsxm(
            'text-base-icon scale-150 relative opacity-100',
            isRecording && 'opacity-0'
          )}
        />
        <Image
          src='/sound_white_violet.gif'
          width={24}
          height={24}
          alt='soundwave'
          className={clsxm(
            'opacity-0 transition-all delay-0 ease-in-out absolute',
            isRecording && 'opacity-100 delay-300'
          )}
        />
        <input
          className={clsxm(
            'w-full mx-2 appearance-none focus:outline-none bg-transparent',
            isRecording && 'invisible'
          )}
          placeholder='Search...'
        ></input>
        <div
          className={clsxm(
            'w-10 h-9 rounded-[50%] flex flex-col justify-center items-center cursor-pointer hover:brightness-90 transition-all duration-300 ease-in-out',
            !isRecording ? 'bg-violet' : 'bg-white'
          )}
          onClick={() => record()}
        >
          {!isRecording ? (
            <BsFillMicFill className='text-white' />
          ) : (
            <BiStop className='text-violet text-3xl' />
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
