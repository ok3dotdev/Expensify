'use client';

import { useMedia } from 'react-use';
import { usePathname, useRouter } from 'next/navigation';

import { NavButton } from '@/components/nav-button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const routes = [
  {
    href: '/',
    label: 'Overview',
  },
  {
    href: '/transactions',
    label: 'Transactions',
  },
  {
    href: '/accounts',
    label: 'Accounts',
  },
  {
    href: '/banks',
    label: 'Banks',
  },
  {
    href: '/categories',
    label: 'Categories',
  },
  {
    href: '/settings',
    label: 'Settings',
  },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMedia('(max-width: 1024px)', false);

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button
            variant='outline'
            size='sm'
            className='font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition'
          >
            <Menu className='h-4 w-4' />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='px-2'>
          <nav className='flex flex-col gap-y-2 pt-6'>
            {routes.map((route) => (
              <Button
                variant={route.href === pathname ? 'secondary' : 'ghost'}
                className='w-full justify-start'
                onClick={() => onClick(route.href)}
                key={route.href}
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className='hidden lg:flex items-center gap-x-2 overflow-x-auto'>
      {routes.map((route) => (
        <NavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={route.href === pathname}
        />
      ))}
    </nav>
  );
};
