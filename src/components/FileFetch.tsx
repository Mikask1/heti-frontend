import * as React from 'react';
import { HiOutlineExternalLink, HiOutlinePaperClip } from 'react-icons/hi';

import UnstyledLink from '@/components/links/UnstyledLink';
import api from '@/lib/api';

type FileFetchProps = {
  filePath: string;
  label?: string;
  width?: number;
  height?: number;
  imgClassName?: string;
  alt: string;
} & React.ComponentPropsWithoutRef<'div'>;

const FileFetch = ({
  filePath,
  label,
  className,
  ...props
}: FileFetchProps) => {
  const [imgSrc, setImgSrc] = React.useState<string>();

  const getImageURL = React.useCallback(async ({ url }: { url: string }) => {
    api
      .get(url, {
        responseType: 'arraybuffer',
      })
      .then((res) => {
        const base64string = Buffer.from(
          new Uint8Array(res.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
          }, ''),
          'binary'
        ).toString('base64');

        const contentType = res.headers['content-type'];
        return {
          data: `data:${contentType};base64,${base64string}`,
        };
      })
      .then((res) => {
        setImgSrc(res.data);
      });
  }, []);

  React.useEffect(() => {
    if (filePath) {
      getImageURL({ url: `/stream_image?path=${filePath}` });
    }
  }, [getImageURL, filePath]);

  return (
    <>
      <div {...props} className='cursor-pointer'>
        {imgSrc && (
          <div className={className}>
            {label && (
              <>
                <label className='block font-bold text-lg pb-2'>{label}</label>
                <li
                  key={label}
                  className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'
                >
                  <div className='flex items-center flex-1 w-0'>
                    <HiOutlinePaperClip
                      className='flex-shrink-0 w-5 h-5 text-gray-400'
                      aria-hidden='true'
                    />
                    <span className='flex-1 w-0 ml-2 truncate'>{label}</span>
                  </div>
                  <div className='flex items-center flex-shrink-0 ml-4 space-x-2'>
                    <UnstyledLink
                      href={imgSrc}
                      className='text-gray-500 rounded focus:outline-none focus:ring focus:ring-primary-500 hover:text-gray-700'
                    >
                      <HiOutlineExternalLink size={20} />
                    </UnstyledLink>
                  </div>
                </li>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default FileFetch;
