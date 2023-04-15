import { get, RegisterOptions, useFormContext } from 'react-hook-form';
import { IconType } from 'react-icons';

import ErrorMessage from '@/components/form/ErrorMessage';
import HelperText from '@/components/form/HelperText';
import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';

export type InputProps = {
  id: string;
  label?: string;
  helperText?: string;
  hideError?: boolean;
  validation?: RegisterOptions;
  prefix?: string;
  suffix?: string;
  leftIcon?: IconType;
  rightIcon?: IconType;
  leftIconClassName?: string;
  rightIconClassName?: string;
} & React.ComponentPropsWithoutRef<'input'>;

export default function Input({
  id,
  label,
  helperText,
  hideError = false,
  validation,
  className,
  type = 'text',
  readOnly = false,
  prefix,
  suffix,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  leftIconClassName,
  rightIconClassName,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);

  return (
    <div className='space-y-1.5'>
      {label && (
        <label htmlFor={id} className='flex space-x-1'>
          <Typography className='font-semibold text-base-primary'>
            {label}
          </Typography>
          {validation?.required && (
            <Typography className='text-red'>*</Typography>
          )}
        </label>
      )}

      <div className='w-full flex items-stretch'>
        {prefix && (
          <Typography className='p-3 bg-base-light text-base-secondary'>
            {prefix}
          </Typography>
        )}

        <div className='relative w-full'>
          {LeftIcon && (
            <div
              className={clsxm(
                'absolute top-0 left-0 h-full',
                'flex justify-center items-center pl-3',
                'text-base-icon text-lg md:text-xl',
                leftIconClassName
              )}
            >
              <LeftIcon />
            </div>
          )}

          <input
            {...register(id, validation)}
            type={type}
            id={id}
            name={id}
            readOnly={readOnly}
            disabled={readOnly}
            className={clsxm(
              'w-full h-full px-3 py-2.5',
              [LeftIcon && 'pl-9', RightIcon && 'pr-9'],
              'border-none focus:ring-2 focus:ring-inset',
              'bg-base-surface font-secondary text-base-primary',
              'placeholder:font-secondary placeholder:text-base-icon',
              readOnly && 'cursor-not-allowed',
              error
                ? 'focus:ring-red ring-1 ring-inset ring-red'
                : 'focus:ring-blue',
              className
            )}
            aria-describedby={id}
            {...rest}
          />

          {RightIcon && (
            <div
              className={clsxm(
                'absolute bottom-0 right-0 h-full',
                'flex justify-center items-center pr-3',
                'text-base-icon text-lg md:text-xl',
                rightIconClassName
              )}
            >
              <RightIcon />
            </div>
          )}
        </div>

        {suffix && (
          <Typography className='p-3 bg-base-light text-base-secondary'>
            {suffix}
          </Typography>
        )}
      </div>

      {!hideError && error && <ErrorMessage>{error.message}</ErrorMessage>}
      {!error && helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
}
