import * as React from 'react';

import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';

enum TagSize {
  'small',
  'base',
}

export enum TagColor {
  'DEFAULT',
  'warning',
  'success',
  'danger',
  'purple',
  'skyblue',
}

type TagProps = {
  children: React.ReactNode;
  size?: keyof typeof TagSize;
  color?: keyof typeof TagColor;
} & React.ComponentPropsWithRef<'div'>;

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ children, className, size = 'base', color = 'DEFAULT', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        {...rest}
        className={clsxm(
          'inline-flex items-center justify-center rounded-md',

          //*=========== Size ===========
          {
            'px-4 !text-xs': size === 'small',
            'px-6 !text-sm': size === 'base',
          },
          {
            'bg-gray-100 border border-gray-300': color === 'DEFAULT',
            'bg-warning-100 border border-warning-200': color === 'warning',
            'bg-success-100 border border-success-300': color === 'success',
            'bg-critical-100 border border-critical-300': color === 'danger',
            'bg-purple-100 border border-purple-300': color === 'purple',
            'bg-blue-100 border border-blue-300': color === 'skyblue',
          },
          className
        )}
      >
        <Typography
          variant='s'
          as='span'
          color={
            (color === 'warning' && 'warning') ||
            (color === 'success' && 'success') ||
            (color === 'danger' && 'danger') ||
            (color === 'purple' && 'purple') ||
            (color === 'skyblue' && 'skyblue') ||
            'secondary'
          }
        >
          {children}
        </Typography>
      </div>
    );
  }
);

export default Tag;
