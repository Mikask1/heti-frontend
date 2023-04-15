import * as React from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { SiLine } from 'react-icons/si';

import PrimaryLink from '@/components/links/PrimaryLink';
import NextImage from '@/components/NextImage';
import Typography from '@/components/typography/Typography';

export default function Footer() {
  const [showPreEvent, setShowPreEvent] = React.useState(false);
  const [showMainEvent, setShowMainEvent] = React.useState(false);

  const toggleShowPreEvent = () => {
    setShowPreEvent((prev) => !prev);
  };

  const toggleShowMainEvent = () => {
    setShowMainEvent((prev) => !prev);
  };

  return (
    <footer className='relative z-50 w-full bg-discolored-1000 font-secondary'>
      <div className='mx-auto w-[95%] md:w-10/12'>
        <div className='flex flex-col justify-between md:flex-row md:items-center  pt-10 md:pt-16'>
          <div className='flex flex-col items-center justify-center'>
            <NextImage
              src='/logo-footer.png'
              alt='footer logo'
              width='251'
              height='251'
              priority={true}
              className='w-[121px] md:w-[180px] lg:w-full'
            />
            <Typography
              variant='h6'
              font='saoTorpes'
              className='text-white text-[20px] md:text-[24px] md:flex md:flex-wrap'
            >
              salam seni, ilmu, dan budaya
            </Typography>
          </div>
          <div className='flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-0 md:space-x-6 lg:space-x-[60px] items-start justify-center mx-auto md:mx-0 mt-10 md:mt-0'>
            {/* Pre Event Start */}
            <div className='flex flex-col'>
              <button
                onClick={toggleShowPreEvent}
                className='mx-auto flex items-center md:mx-0 text-white font-bold text-[16px] md:text-[18px] lg:text-[20px] cursor-pointer gap-5 md:cursor-default'
              >
                Pre Event
                <AiFillCaretDown
                  size={14}
                  className={`mt-1 ${
                    showPreEvent ? 'rotate-180' : 'rotate-0'
                  } block text-2xl transition duration-200 md:hidden`}
                />
              </button>
              <div
                className={`${
                  showPreEvent
                    ? 'flex'
                    : 'hidden opacity-0 md:block md:opacity-100'
                } w-full flex-col transition-all duration-1000 md:w-fit mt-5 space-y-5 `}
              >
                <div>
                  <PrimaryLink
                    href='/coming-soon'
                    variant='discolored'
                    underline={false}
                    className='font-medium text-sm lg:text-base'
                  >
                    Robot in Action
                  </PrimaryLink>
                </div>
                <div>
                  <PrimaryLink
                    href='/coming-soon'
                    variant='discolored'
                    underline={false}
                    className='font-medium text-sm lg:text-base'
                  >
                    karya Tulis Ilmiah
                  </PrimaryLink>
                </div>
                <div>
                  <PrimaryLink
                    href='/coming-soon'
                    variant='discolored'
                    underline={false}
                    className='font-medium text-sm lg:text-base'
                  >
                    Jurnalistik
                  </PrimaryLink>
                </div>
                <div>
                  <PrimaryLink
                    href='/coming-soon'
                    variant='discolored'
                    underline={false}
                    className='font-medium text-sm lg:text-base'
                  >
                    Talkshow
                  </PrimaryLink>
                </div>
              </div>
            </div>
            {/* Pre Event End */}
            {/* Main Event Start */}
            <div className='flex flex-col justify-center items-center'>
              <button
                onClick={toggleShowMainEvent}
                className='mx-auto flex items-center md:mx-0 text-white font-bold text-[16px] md:text-[18px] lg:text-[20px] cursor-pointer gap-5 md:cursor-default'
              >
                Main Event
                <AiFillCaretDown
                  size={14}
                  className={`mt-1 ${
                    showMainEvent ? 'rotate-180' : 'rotate-0'
                  } block text-2xl transition duration-200 md:hidden`}
                />
              </button>
              <div
                className={`${
                  showMainEvent
                    ? 'flex'
                    : 'hidden opacity-0 md:block md:opacity-100'
                } w-full flex-col transition-all duration-1000 md:w-fit mt-5 space-y-5 `}
              >
                <div>
                  <PrimaryLink
                    href='/coming-soon'
                    variant='discolored'
                    underline={false}
                    className='font-medium text-sm lg:text-base'
                  >
                    Opening{' '}
                  </PrimaryLink>
                </div>
                <div>
                  <PrimaryLink
                    href='/coming-soon'
                    variant='discolored'
                    underline={false}
                    className='font-medium text-sm lg:text-base'
                  >
                    Exhibition{' '}
                  </PrimaryLink>
                </div>
                <div>
                  <PrimaryLink
                    href='/coming-soon'
                    variant='discolored'
                    underline={false}
                    className='font-medium text-sm lg:text-base'
                  >
                    Closing{' '}
                  </PrimaryLink>
                </div>
              </div>
            </div>
            {/* Main Event End */}
            {/* Social Media Start */}
            <div className='flex flex-col items-center justify-center'>
              <Typography
                className=' font-bold text-white text-[16px] md:text-[18px] lg:text-[20px]'
                variant='t'
              >
                Social Media
              </Typography>
              <div className='flex flex-col lg:flex-row items-center justify-between space-y-5 space-x-0 lg:space-y-0 text-discolored-300 lg:space-x-5 mt-5'>
                <PrimaryLink
                  variant='discolored'
                  href='https://www.instagram.com/its_expo/?hl=en'
                >
                  <FaInstagram className='w-6 md:w-fit' size={28} />
                </PrimaryLink>
                <PrimaryLink
                  variant='discolored'
                  href='https://www.tiktok.com/@its_expo'
                >
                  <FaTiktok className='w-6 md:w-fit' size={28} />
                </PrimaryLink>
                <PrimaryLink
                  variant='discolored'
                  href='https://www.youtube.com/@ITSEXPO2021'
                >
                  <FaYoutube className='w-6 md:w-fit' size={28} />
                </PrimaryLink>
                <PrimaryLink variant='discolored' href='#'>
                  <SiLine className='w-6 md:w-fit' size={28} />
                </PrimaryLink>
              </div>
            </div>
            {/* Social Media End */}
          </div>
        </div>
        <hr className='h-[1px] bg-white md:bg-discolored-800 mt-10 md:mt-[67px]' />
        {/* Copy Right Start */}
        <div>
          <Typography
            variant='b2'
            className='text-discolored-700 font-semibold text-[14px] md:text-[16px] mt-3 pb-3 md:mt-5 md:pb-10'
          >
            &copy; 2023 Heti. All rights reserved.
          </Typography>
        </div>
        {/* Copy Right End */}
      </div>
    </footer>
  );
}
