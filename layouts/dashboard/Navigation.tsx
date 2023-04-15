import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FiChevronDown } from 'react-icons/fi';

import UnstyledLink from '@/components/links/UnstyledLink';
import { navigations } from '@/constant/navigations';
import clsxm from '@/lib/clsxm';
import useAuthStore from '@/store/useAuthStore';
import { PermissionList } from '@/types/entities/permission-list';
import type { Navigation } from '@/types/navigate';

type NavigationProps = React.ComponentPropsWithoutRef<'nav'>;

export default function Navigation({ className, ...rest }: NavigationProps) {
  return (
    <nav className={clsxm('px-2 md:px-3', className)} {...rest}>
      <div className='space-y-1.5'>
        {navigations.map((nav) =>
          nav.children ? (
            <NestedNavigation navigation={nav} key={nav.name} />
          ) : (
            <NavigationLink key={nav.name} navigation={nav} />
          )
        )}
      </div>
    </nav>
  );
}

function NestedNavigation({
  navigation: navChildren,
}: {
  navigation: Navigation;
}) {
  const router = useRouter();

  function getChildrenPermission(nav?: Navigation[]): PermissionList {
    return (
      nav?.flatMap((n) => {
        const tempPermission: PermissionList = [];
        if (n.permissions) {
          tempPermission.push(...n.permissions);
        }
        if (n.children) {
          tempPermission.push(...getChildrenPermission(n.children));
        }
        return tempPermission;
      }) || []
    );
  }

  const user = useAuthStore.useUser();
  const navChildrenWithPermission = getChildrenPermission(navChildren.children);
  const hasPermission =
    navChildrenWithPermission && navChildrenWithPermission.length > 0
      ? navChildrenWithPermission.some((p) => user?.permissions.includes(p))
      : true;

  if (!hasPermission) return null;
  // Recursively check if any children is active

  function checkActive(nav?: Navigation[]): boolean {
    if (!nav) return false;

    return nav.some((n) => {
      if (!n.children) {
        const isActive = n.exactMatch
          ? router.pathname === n.href
          : router.pathname.startsWith(n.href);

        return isActive;
      }

      return checkActive(n.children);
    });
  }

  return (
    <Disclosure as='div' defaultOpen={checkActive(navChildren.children)}>
      {({ open }) => (
        <div>
          <Disclosure.Button
            className={clsx(
              'hover:bg-white/10',
              'text-typo-white',
              'group flex w-full items-center rounded-md px-2 py-4 text-sm font-medium',
              'focus-visible:ring-offset-secondary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500'
            )}
          >
            <navChildren.icon
              className={clsx(
                'mr-1.5 flex-shrink-0',
                'text-typo-white text-lg',
                open && 'mt-[1px] self-start'
              )}
              aria-hidden='true'
            />
            <span className={clsx('text-left', !open && 'truncate')}>
              {navChildren.name}
            </span>
            <FiChevronDown
              className={clsx(
                'flex-shrink-0',
                'text-typo-white ml-auto text-lg',
                open && 'mt-[1px] rotate-180 self-start'
              )}
            />
          </Disclosure.Button>
          <Disclosure.Panel className='ml-5 mt-0.5'>
            {navChildren.children?.map((nav) =>
              nav.children ? (
                <NestedNavigation key={nav.name} navigation={nav} />
              ) : (
                <NavigationLink key={nav.name} navigation={nav} />
              )
            )}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}

function NavigationLink({
  navigation,
  className,
}: {
  navigation: Navigation;
  className?: string;
}) {
  const router = useRouter();
  const isActive = navigation.exactMatch
    ? router.pathname === navigation.href
    : router.pathname.startsWith(navigation.href);

  // check if user has permission to access the route
  const user = useAuthStore.useUser();
  const hasPermission = navigation.permissions
    ? navigation.permissions?.some((p) => user?.permissions.includes(p))
    : true;

  if (!hasPermission) return null;

  return (
    <UnstyledLink
      href={navigation.href}
      className={clsxm(
        isActive ? 'bg-white/20 text-typo-white' : 'hover:bg-white/10',
        'group my-0.5 flex items-center rounded-md px-2 py-4 text-sm font-medium',
        className
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <navigation.icon
        className={clsx('mr-1.5 flex-shrink-0', 'text-typo-white text-lg')}
        aria-hidden='true'
      />
      <span className='truncate text-typo-white'>{navigation.name}</span>
    </UnstyledLink>
  );
}
