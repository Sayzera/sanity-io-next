import Link from 'next/link';
import React from 'react';

function Login() {
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
          className="border
           border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500
            focus:border-yellow-500 block w-full p-2.5
            "
        />
      </div>

      <div>
        <button className="border w-full mt-4 py-3  focus:border-yellow-700 focus:bg-yellow-300 focus:text-white focus:font-extrabold rounded-lg ">
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
