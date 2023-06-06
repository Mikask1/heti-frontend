/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import React, { FormEvent } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiStop } from 'react-icons/bi';
import { BsFillMicFill } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';

import { SearchFormData } from '@/contents/search';
import clsxm from '@/lib/clsxm';

type SearchBarProperties = {
  isRecording: boolean;
  record: () => void;
  searchMethods: UseFormReturn<SearchFormData, any>;
  sendText: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  className?: string;
};

const SearchBar = ({
  isRecording,
  record,
  searchMethods,
  sendText,
  isLoading,
  className,
}: SearchBarProperties) => {
  return (
    <section className={clsxm('flex justify-center mt-20 mb-14', className)}>
      <div
        className={clsxm(
          'w-[950px] h-12 border border-black rounded-[50px] flex justify-between items-center pl-4 pr-2 transition-all duration-300 ease-in-out',
          isRecording && 'bg-violet border-violet',
          isLoading && 'bg-gray-300'
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
        <div className='w-full'>
          <FormProvider {...searchMethods}>
            <form onSubmit={(e) => sendText(e)}>
              <input
                className={clsxm(
                  'w-full mx-2 appearance-none focus:outline-none bg-transparent focus:bg-transparent active:bg-transparent',
                  'disabled:cursor-wait',
                  isRecording && 'invisible',
                  isLoading && 'brightness-75'
                )}
                placeholder='Search...'
                id='query'
                name='query'
                aria-describedby='query'
                disabled={isLoading}
              ></input>
            </form>
          </FormProvider>
        </div>
        <div
          className={clsxm(
            'w-10 h-9 rounded-[50%] flex flex-col justify-center items-center cursor-pointer hover:brightness-90 transition-all duration-300 ease-in-out',
            !isRecording ? 'bg-violet' : 'bg-white',
            isLoading && 'brightness-75'
          )}
          onClick={() => {
            if (!isLoading) {
              record();
            }
          }}
        >
          {isLoading ? (
            <ImSpinner2 className='animate-spin text-white' />
          ) : !isRecording ? (
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
