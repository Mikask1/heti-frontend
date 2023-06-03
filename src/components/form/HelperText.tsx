import Typography from '@/components/Typography';

export default function HelperText({ children }: { children: string }) {
  return (
    <div className='flex space-x-1'>
      <Typography
        variant='c2'
        className='!leading-tight text-typo-secondary text-xs'
      >
        {children}
      </Typography>
    </div>
  );
}
