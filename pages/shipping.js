import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import { getError } from '../utils/error';

function Shipping() {
  const router = useRouter();
  const userInfo = useSelector(selectUser);

  const isAuth = async () => {
    try {
      const { data } = await axios.get('/api/auth', {
        headers: {
          Authorization: `Bearer ${userInfo.token}32`,
        },
      });
    } catch (e) {
      router.push('/login');
      console.log(getError(e));
    }
  };

  React.useEffect(() => {
    isAuth();
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
  }, [router, userInfo]);
  return <div> Shipping</div>;
}

export default Shipping;
