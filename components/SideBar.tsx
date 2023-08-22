'use client';
import React, { useCallback, useState } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { MdOutlineDashboard } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { RiSettings4Line } from 'react-icons/ri';
import { TbReportAnalytics } from 'react-icons/tb';
import { AiOutlineUser, AiOutlineHeart } from 'react-icons/ai';
import { FiMessageSquare, FiFolder, FiShoppingCart } from 'react-icons/fi';
import { RxExit } from 'react-icons/rx';
import Link from 'next/link';

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const menus = {
    top: [
      {
        name: 'Summary',
        link: '/dashboard',
        icon: MdOutlineDashboard,
      },
      {
        name: 'Expenses',
        link: '/dashboard/expense',
        icon: TbReportAnalytics,
      },
      { name: 'messages', link: '/', icon: FiMessageSquare },
    ],
    bottom: [{ name: 'profile', link: '/profile', icon: AiOutlineUser }],
  };

  const router = useRouter();

  const handleSignOut = useCallback(async (e) => {
    e.preventDefault();

    try {
      // await signout();
      router.replace('/signin');
    } catch (e) {
      setError('Error signing out');
    }
  }, []);

  return (
    <section className="flex gap-6 fixed top-0 left-0 bottom-0 z-[1]">
      <div
        className={`bg-[#0e0e0e] min-h-screen flex flex-col ${
          open ? 'w-40' : 'w-16'
        } duration-500 text-gray-100 px-4 py-8`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.top.map((menu, i) => (
            <Link
              href={menu?.link}
              key={i}
              className={` ${
                menu?.margin && 'mt-5'
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: '20' })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 2}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && 'opacity-0 translate-x-28 overflow-hidden'
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && 'hidden'
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-4 justify-end mb-0">
          {menus?.bottom.map((menu, i) => (
            <Link
              href={menu?.link}
              key={i}
              className={` ${
                menu?.margin && 'mt-5'
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: '20' })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 2}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && 'opacity-0 translate-x-28 overflow-hidden'
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && 'hidden'
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
          <div className="relative flex flex-col hover:bg-gray-800 rounded-md  p-2">
            <RxExit
              size={20}
              className="cursor-pointer"
              onClick={(e) => handleSignOut(e)}
            />
            <h2
              className={`${
                open && 'hidden'
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              Sign Out
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideBar;
