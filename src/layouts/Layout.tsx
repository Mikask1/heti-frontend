import * as React from 'react';

import Footer from '@/layouts/Footer';
import Navbar from '@/layouts/Navbar';
import clsxm from '@/lib/clsxm';

type LayoutOpt = {
  children: React.ReactNode;
  withFooter?: boolean;
  withNavbar?: boolean;
} & React.ComponentPropsWithRef<'div'>;

export default function Layout({
  children,
  className,
  withFooter = true,
  withNavbar = true,
}: LayoutOpt) {
  return (
    <div className={clsxm('overflow-x-hidden', className)}>
      {withNavbar && <Navbar />}
      <main className='pt-14 min-h-screen'>{children}</main>
      {withFooter && <Footer />}
    </div>
  );
}
