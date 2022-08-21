import Cookies from 'js-cookie';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../redux/userSlice';
import axios from 'axios';
function Login() {
  const user = useSelector(selectUser);
  const router = useRouter();
  const { redirect } = router.query;
  React.useEffect(() => {
    if (user) {
      router.push(redirect || '/');
    }
  }, [router, user]);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const dispatch = useDispatch();
  const submitHandler = async () => {
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });

      Cookies.set('userInfo', JSON.stringify(data));
      dispatch(setUser(data));

      Router.push(redirect || '/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container mx-auto  py-3 px-4">
      <div>
        <h1 className="text-2xl text-center md:text-left">Login</h1>
      </div>

      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium  mt-4">
          EMail Address
        </label>

        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          className="border
           border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500
            focus:border-yellow-500 block w-full p-2.5
            "
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium  mt-4"
        >
          Password
        </label>

        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          className="border
           border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500
            focus:border-yellow-500 block w-full p-2.5
            "
        />
      </div>

      <div>
        <button
          onClick={() => submitHandler()}
          className="border w-full mt-4 py-3  focus:border-yellow-700 focus:bg-yellow-300 focus:text-white focus:font-extrabold rounded-lg "
        >
          LOGIN
        </button>
      </div>

      <div className="mt-2">
        <p>
          Do not have an account ?{' '}
          <Link href="/register">
            <span className="text-yellow-500 hover:cursor-pointer underline">
              Register
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
