import * as React from 'react';
import { get, RegisterOptions, useFormContext } from 'react-hook-form';

import ErrorMessage from '@/components/form/ErrorMessage';
import HelperText from '@/components/form/HelperText';
import Typography from '@/components/typography/Typography';
import clsxm from '@/lib/clsxm';

export type TextAreaProps = {
  id: string;
  label?: string;
  helperText?: string;
  hideError?: boolean;
  validation?: RegisterOptions;
} & React.ComponentPropsWithoutRef<'textarea'>;

export default function TextArea({
  id,
  label,
  helperText,
  hideError = false,
  validation,
  className,
  maxLength = 255,
  readOnly = false,
  ...rest
}: TextAreaProps) {
  const [value, setValue] = React.useState('');

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);
  const textArea = register(id, validation);

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    textArea.onChange(e);
    setValue(e.currentTarget.value);
  };

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

      <div className='relative'>
        <textarea
          {...textArea}
          id={id}
          name={id}
          readOnly={readOnly}
          disabled={readOnly}
          maxLength={maxLength}
          onChange={handleChange}
          className={clsxm(
            'w-full px-3 py-2.5',
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

        <Typography
          variant='c'
          className='absolute right-3 bottom-2.5 text-base-icon'
        >
          {value.length}/{maxLength}
        </Typography>
      </div>

      {!hideError && error && <ErrorMessage>{error.message}</ErrorMessage>}
      {!error && helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
}
