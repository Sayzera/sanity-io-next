/* This example requires Tailwind CSS v2.0+ */
import React from 'react';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  BellIcon,
  MenuIcon,
  XIcon,
  ShoppingBagIcon,
  LoginIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import jsCookie from 'js-cookie';
import Router from 'next/router';

import { useSelector, useDispatch } from 'react-redux';

import {
  DARK_MODE_ON,
  DARK_MODE_OFF,
  selectDarkMode,
  selectCart,
} from '../redux/mainSlice';
import dynamic from 'next/dynamic';

const navigation = [{ name: 'Home', href: '/', current: true }];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Navbar() {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const { items } = useSelector(selectCart);

  const darkModeChangeHandler = () => {
    Router.push('/cart');
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      // eslint-disable-next-line react/jsx-key
                      <Link href={item.href}>
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="bg-gray-800 p-1 mr-2 rounded-full text-gray-400 hover:text-white focus:outline-none ring-1 ring-offset-2 focus:ring-offset-gray-800 ring-white 
                  relative
                  "
                >
                  <span className="sr-only">View notifications</span>
                  <ShoppingBagIcon
                    onClick={() => darkModeChangeHandler()}
                    className="h-6 w-6"
                    aria-hidden="true"
                  />

                  {items.length > 0 && (
                    <span className="absolute bottom-3  left-6 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                      {items?.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  className="bg-gray-800 p-1 ml-4 rounded-full text-gray-400 hover:text-white focus:outline-none ring-1 ring-offset-2 focus:ring-offset-gray-800 ring-white 
                  relative
                  "
                  onClick={() => Router.push('/login')}
                >
                  <LoginIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
