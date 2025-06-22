import NavLink from '@/components/NavLink';
import React from 'react';

const Login = () => {
  return (
    <div className="flex justify-center h-screen">
      <form className="flex flex-col w-[400px] mt-[260px]">
        <h3>Login</h3>
        <div className="flex flex-col">
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Password" />
        </div>
        <button>Login</button>

        <div className="flex">
          <span className="pr-[2px]">Don&apos;t Have An Account? Go</span>
          <NavLink url={'/signup'} label={'Sign Up'} />
        </div>
      </form>
    </div>
  );
};

export default Login;
