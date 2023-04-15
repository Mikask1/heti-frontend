import * as React from 'react';
import { IconType } from 'react-icons';
import { ImSpinner2 } from 'react-icons/im';

import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';

enum ButtonVariant {
  'primary',
  'secondary',
  'neutral',
  'danger',
}

enum ButtonSize {
  'small',
  'base',
  'large',
}

export type ButtonProps = {
  isLoading?: boolean;
  size?: keyof typeof ButtonSize;
  variant?: keyof typeof ButtonVariant;
  icon?: IconType;
  iconClassName?: string;
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      size = 'base',
      variant = 'primary',
      icon: Icon,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      iconClassName,
      leftIconClassName,
      rightIconClassName,
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={clsxm(
          'button flex items-center justify-center gap-1',
          'focus:outline-none focus-visible:outline focus-visible:outline-blue',
          'transition-colors duration-75',
          [
            size === 'large' && [
              'min-h-[40px] px-[24px] py-[10px] text-lg',
              Icon && 'px-[10px]',
            ],
            size === 'base' && [
              'min-h-[32px] px-[20px] py-[6px] text-base',
              Icon && 'px-[6px]',
            ],
            size === 'small' && [
              'min-h-[28px] px-[18px] py-[4px] text-sm',
              Icon && 'px-[4px]',
            ],
          ],
          [
            variant === 'primary' && [
              'bg-blue ring-2 ring-inset ring-blue-hover !text-white',
              'hover:bg-blue-hover active:bg-blue-hover disabled:bg-blue-hover',
            ],
            variant === 'secondary' && [
              'bg-white ring-2 ring-inset ring-blue !text-blue',
              'hover:bg-blue hover:!text-white',
              'active:bg-blue active:!text-white',
              'disabled:bg-blue disabled:!text-white',
            ],
            variant === 'danger' && [
              'bg-red !text-white',
              'hover:bg-red-hover active:bg-red-hover disabled:bg-red-hover',
            ],
          ],
          'font-semibold leading-none',
          'disabled:cursor-not-allowed',
          isLoading && [
            'relative transition-none disabled:cursor-wait',
            '!text-transparent hover:!text-transparent disabled:!text-transparent active:!text-transparent',
          ],
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={clsxm(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white'
            )}
          >
            <ImSpinner2 className='animate-spin' />
          </div>
        )}

        {Icon && (
          <Icon
            className={clsxm(
              [
                size === 'large' && 'text-2xl md:text-3xl',
                size === 'base' && 'text-xl md:text-2xl',
                size === 'small' && 'text-lg md:text-xl',
              ],
              iconClassName
            )}
          />
        )}

        {!Icon && LeftIcon && (
          <LeftIcon
            className={clsxm(
              [
                size === 'large' && 'text-2xl md:text-3xl',
                size === 'base' && 'text-xl md:text-2xl',
                size === 'small' && 'text-lg md:text-xl',
              ],
              leftIconClassName
            )}
          />
        )}

        {!Icon && <Typography>{children}</Typography>}

        {!Icon && RightIcon && (
          <RightIcon
            className={clsxm(
              [
                size === 'large' && 'text-2xl md:text-3xl',
                size === 'base' && 'text-xl md:text-2xl',
                size === 'small' && 'text-lg md:text-xl',
              ],
              rightIconClassName
            )}
          />
        )}
      </button>
    );
  }
);

export default Button;
