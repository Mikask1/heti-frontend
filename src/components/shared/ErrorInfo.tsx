import 'aos/dist/aos.css';

import AOS from 'aos';
import React, { useEffect } from 'react';
import { AiOutlineHome } from 'react-icons/ai';

import ButtonLink from '@/components/links/ButtonLink';
import NextImage from '@/components/NextImage';
import Typography from '@/components/typography/Typography';
import { ErrorInfoProps } from '@/types/entities/shared';

const ErrorInfo = ({
  withErrorIcons = false,
  status,
  title,
  desc,
  withHomeButton = true,
}: ErrorInfoProps) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div
        className='flex relative flex-col items-center text-center max-w-4xl mx-16'
        data-aos='zoom-in'
        data-aos-duration='1500'
      >
        <div className='relative'>
          {withErrorIcons && (
            <NextImage
              src='/errorpage/500/errorVector.png'
              alt='error'
              width={66}
              height={66}
              className='absolute top-5 -right-10 w-[32px] md:w-[66px]'
            />
          )}
          <Typography variant='h0'>{status}</Typography>
        </div>
        <Typography variant='h3' font='saoTorpes'>
          {title}
        </Typography>
        <Typography variant='b1' className='my-5'>
          {desc}
        </Typography>
        {withHomeButton && (
          <ButtonLink href='/' leftIcon={AiOutlineHome} size='large'>
            Kembali
          </ButtonLink>
        )}
      </div>
    </>
  );
};

export default ErrorInfo;
