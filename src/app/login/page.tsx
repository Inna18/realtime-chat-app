'use client';
import React, { useState } from 'react';
import NavLink from '@/components/NavLink';
import Image from 'next/image';
import { Credentials } from '@/types';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/Button';
import Input from '@/components/Input';

const DEFAULT_LOGIN_CREDENTIALS = {
  email: '',
  password: '',
};

const Login = () => {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loginCredentials, setLoginCredentials] = useState<Credentials>(
    DEFAULT_LOGIN_CREDENTIALS
  );

  if (status === 'loading') {
    return null; // or a loading spinner
  }

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

    const rawCallbackUrl = searchParams.get('callbackUrl');
    const callbackUrl = rawCallbackUrl
      ? decodeURIComponent(rawCallbackUrl)
      : null;
    console.log('callbackUrl:', callbackUrl);

    if (res?.ok) {
      if (callbackUrl && callbackUrl.startsWith('/')) {
        router.push(callbackUrl);
      } else {
        router.push('/rooms/list');
      }
    }
  };

  return (
    <>
      {status === 'unauthenticated' && (
        <div className="flex justify-center h-screen">
          <form
            className="flex w-[56%] h-[60%] min-w-[968px] min-h-[561px] bg-[#fff] dark:bg-[#4a4a4a] 
            mt-[160px] rounded-[40px] shadow-[0_10px_35px_rgba(0,0,0,0.1)]"
            onSubmit={handleLogin}
          >
            <div className="w-[50%] p-[80px]">
              <div className="mb-[60px]">
                <h3 className="text-[#4a4a4a] dark:text-[#e0e0e0] text-[46px]">
                  Hello,
                </h3>
                <h3 className="text-[#e0e0e0] text-[36px]">Welcome Back</h3>
              </div>
              <div className="flex flex-col">
                <div className="mb-[10px]">
                  <Input
                    inputType={'email'}
                    inputPlaceholder="Enter your email address"
                    inputValue={loginCredentials.email}
                    inputAction={(e: React.FormEvent<HTMLInputElement>) =>
                      handleInputs(e, 'email')
                    }
                  />
                </div>
                <div>
                  <Input
                    inputType={'password'}
                    inputPlaceholder="Enter your password"
                    inputValue={loginCredentials.password}
                    inputAction={(e: React.FormEvent<HTMLInputElement>) =>
                      handleInputs(e, 'password')
                    }
                  />
                </div>
              </div>
              <div className="mt-[50px]">
                <Button label={'Login'} btnType={'submit'} />
              </div>

              <div className="flex my-[20px]">
                <span className="pr-[2px] pt-[4px] text-[#a8a8a8] text-[12px] align-bottom">
                  Don&apos;t Have An Account? Go
                </span>
                <NavLink
                  style={'text-[#7836FF] dark:text-[#e0e0e0] text-[12px] bold'}
                  url={'/signup'}
                  label={'Sign Up'}
                />
              </div>
            </div>
            <div className="relative w-[50%]">
              <Image
                src="/img-login.png"
                alt="Logo Image"
                fill
                style={{
                  borderTopRightRadius: '40px',
                  borderBottomRightRadius: '40px',
                }}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
