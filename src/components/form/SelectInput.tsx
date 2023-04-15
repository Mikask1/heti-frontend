import * as React from 'react';
import { get, RegisterOptions, useFormContext } from 'react-hook-form';

import ErrorMessage from '@/components/form/ErrorMessage';
import HelperText from '@/components/form/HelperText';
import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';

export type SelectInputProps = {
  id: string;
  label?: string;
  helperText?: string;
  hideError?: boolean;
  validation?: RegisterOptions;
  readOnly?: boolean;
} & React.ComponentPropsWithoutRef<'select'>;

export default function SelectInput({
  id,
  label,
  helperText,
  hideError = false,
  validation,
  className,
  readOnly = false,
  defaultValue = '',
  placeholder = '',
  children,
  ...rest
}: SelectInputProps) {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const error = get(errors, id);
  const value = watch(id);

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

      <select
        {...register(id, validation)}
        id={id}
        name={id}
        defaultValue={defaultValue}
        disabled={readOnly}
        className={clsxm(
          'w-full pl-3 pr-8 py-2.5 truncate',
          'border-none focus:ring-2 focus:ring-inset',
          'bg-base-surface font-secondary text-base-primary',
          readOnly && 'cursor-not-allowed',
          error
            ? 'focus:ring-red ring-1 ring-inset ring-red'
            : 'focus:ring-blue',
          !value && !readOnly && 'text-base-icon',
          className
        )}
        aria-describedby={id}
        {...rest}
      >
        {placeholder && (
          <option value='' disabled hidden>
            {placeholder}
          </option>
        )}
        {children}
      </select>

      {!hideError && error && <ErrorMessage>{error.message}</ErrorMessage>}
      {!error && helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
}