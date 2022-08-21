import React from 'react';

import Head from 'next/head';
import Navbar from './Navbar';

import { useSelector, useDispatch } from 'react-redux';
import { selectDarkMode } from '../redux/mainSlice';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';

/**
 *
 * Uyarı mesajları modulu yer alıyor
 */
function Layout({ title, description, children }) {
  const darkMode_ = useSelector(selectDarkMode);
  const [darkMode, setDarkMode] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    // enqueueSnackbar('Welcome to the shop', {
    //   variant: 'success',
    // });
    if (darkMode_) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [darkMode_]);

  return (
    <>
      <Head>
        <title>{title ? `${title} - Sanity Amazone` : 'Sanity Amozone'}</title>
        {description && <meta name="description" content={description} />}
      </Head>

      <Navbar />

      <div>
        <div className={`md:container md:mx-auto  px-4 h-screen `}>
          {children}
        </div>

        <footer className="footer">
          <p className="text-center font-bold text-xl text-gray-500">
            All right reserved. Sanity Amazone {darkMode ? 'Dark' : 'Light'}{' '}
            Mode
          </p>
        </footer>
      </div>
    </>
  );
}

export default Layout;
