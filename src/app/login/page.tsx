'use client';
import NavLink from '@/components/NavLink';
import { Credentials } from '@/types';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

const DEFAULT_LOGIN_CREDENTIALS = {
  email: '',
  password: '',
};

const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState<Credentials>(
    DEFAULT_LOGIN_CREDENTIALS
  );
  const [error, setError] = useState<string | null>(null);

  const handleInputs = (e: React.FormEvent<HTMLInputElement>, type: string) => {
    const inputVal = e.currentTarget.value;
    let set = null;
    if (type === 'email') {
      set = { email: inputVal };
    } else if (type === 'password') {
      set = { password: inputVal };
    }
    setLoginCredentials((prevState: Credentials) => ({
      ...prevState,
      ...set,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email: loginCredentials.email,
      password: loginCredentials.password,
    });
  };

  return (
    <div className="flex justify-center h-screen">
      <form
        className="flex flex-col w-[400px] mt-[260px]"
        onSubmit={handleLogin}
      >
        <h3>Login</h3>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Email"
            value={loginCredentials.email}
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              handleInputs(e, 'email')
            }
          />
          <input
            type="text"
            placeholder="Password"
            value={loginCredentials.password}
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              handleInputs(e, 'password')
            }
          />
        </div>
        <button type="submit">Login</button>

        <div className="flex">
          <span className="pr-[2px]">Don&apos;t Have An Account? Go</span>
          <NavLink url={'/signup'} label={'Sign Up'} />
        </div>
      </form>
    </div>
  );
};

export default Login;
