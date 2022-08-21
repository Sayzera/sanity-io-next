import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Router from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../redux/userSlice';

function Register() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    if (user) {
      Router.push('/');
    }
  }, [user, Router]);

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post('/api/users/register', {
        name: name,
        email: email,
        password: password,
      });
      const { token } = data;

      if (token) {
        Cookies.set('userInfo', JSON.stringify(token));
        dispatch(setUser(token));

        Router.push('/login');
      }
    } catch (e) {
      alert(e.response.data);
    }
  };

  return (
    <div className="container mx-auto  py-3 px-4">
      <div>
        <h1 className="text-2xl text-center md:text-left">Register</h1>
      </div>

      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium  mt-4">
          Name
        </label>

        <input
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
          className="border
           border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500
            focus:border-yellow-500 block w-full p-2.5
            "
        />
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
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-sm font-medium  mt-4"
        >
          Confirm Password
        </label>

        <input
          type="password"
          id="confirmPassword"
          className="border
           border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500
            focus:border-yellow-500 block w-full p-2.5
            "
        />
      </div>

      <div>
        <button
          onClick={handleSubmit}
          className="border w-full mt-4 py-3  uppercase focus:border-yellow-700 focus:bg-yellow-300 focus:text-white focus:font-extrabold rounded-lg "
        >
          Register
        </button>
      </div>

      <div className="mt-2">
        <p>
          Already have an account ?{' '}
          <Link href="/login">
            <span className="text-yellow-500 hover:cursor-pointer underline">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
