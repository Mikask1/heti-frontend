import * as React from 'react';

import clsxm from '@/lib/clsxm';

enum TypographyVariant {
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'title',
  'p',
  'b',
  'c',
}

enum FontVarinat {
  'saoTorpes',
  'poppins',
}

type TypographyProps<T extends React.ElementType> = {
  /** @default <p> tag */
  as?: T;
  className?: string;
  font: keyof typeof FontVarinat;
  variant: keyof typeof TypographyVariant;
  children: React.ReactNode;
} & React.ComponentProps<T>;

export default function Typography<T extends React.ElementType>({
  as,
  children,
  className,
  font = 'poppins',
  variant,
  ...rest
}: TypographyProps<T>) {
  const Component = as || 'p';
  return (
    <Component
      className={clsxm(
        //#region  //*=========== Variants ===========
        [
          variant === 'h1' && ['md:text-[80px] md:leading-[96px]'],
          variant === 'h2' && ['md:text-[72px] md:leading-[90px]'],
          variant === 'h3' && ['md:text-[64px] md:leading-[84px]'],
          variant === 'h4' && ['md:text-[48px] md:leading-[64px]'],
          variant === 'h5' && ['md:text-[32px] md:leading-[48px]'],
          variant === 'h6' && ['md:text-[24px] md:leading-[32px]'],
          variant === 'title' && ['md:text-[20px] md:leading-[24px]'],
          variant === 'p' && [
            'text-[16px] leading-[20px] md:text-[18px] md:leading-[24px]',
          ],
          variant === 'b' && [
            'text-[14px] leading-[20px] md:text-[16px] md:leading-[24px]',
          ],
          variant === 'c' && ['md:text-[12px] md:leading-[24px]'],
        ],
        [
          font === 'saoTorpes' && ['font-primary'],
          font === 'poppins' && ['font-secondary'],
        ],
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
