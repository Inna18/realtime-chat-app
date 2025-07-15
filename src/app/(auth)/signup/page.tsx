'use client';
import { User } from '@/types';
import {
  emailValidationRegex,
  passwordValidationRegex,
} from '@/utils/formValidation';
import React, { useEffect, useState } from 'react';
import { signup, upload } from '@/service/auth';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Input from '@/components/Input';
import NavLink from '@/components/NavLink';
import { useSession } from 'next-auth/react';

const DEFAULT_USER = {
  email: '',
  password: '',
  name: '',
};

const DEFAULT_ERROR = {
  email: '',
  password: '',
  repeatPassword: '',
  name: '',
};

const Signup = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [credentials, setCredentials] = useState<User>(DEFAULT_USER);
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [formError, setFormError] =
    useState<Record<string, string>>(DEFAULT_ERROR);
  const [file, setFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/'); // or your homepage
    }
  }, [status, router]);

  if (status === 'loading') {
    return null; // or a loading spinner
  }

  const handleInput = (e: React.FormEvent<HTMLInputElement>, type: string) => {
    const inputVal = e.currentTarget.value;
    let set = null;
    if (type === 'email') {
      set = { email: inputVal };
    } else if (type === 'password') {
      set = { password: inputVal };
    } else if (type === 'name') {
      set = { name: inputVal };
    }
    setCredentials((prevState: User) => ({
      ...prevState,
      ...set,
    }));
  };

  const handleRepeatPassword = (e: React.FormEvent<HTMLInputElement>) => {
    setRepeatPassword(e.currentTarget.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileVal = e.target.files?.[0];
    if (fileVal) {
      setFile(fileVal);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await upload(formData);
    setFileId(res.data?.id);
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isSubmit = true;

    const validations: [string, boolean, string][] = [
      [
        'email',
        emailValidationRegex.test(credentials.email),
        'Email format error',
      ],
      [
        'password',
        passwordValidationRegex.test(credentials.password),
        'Password format error',
      ],
      ['passwordRepeat', repeatPassword !== '', 'Repeat password'],
      [
        'passwordsMatch',
        repeatPassword === credentials.password,
        "Passwords don't match",
      ],
    ];

    for (const [key, isValid, errMsg] of validations) {
      if (key === 'passwordsMatch') {
        if (!isValid) {
          handleSetFormError('repeatPassword', "Passwords don't match");
          isSubmit = false;
        } else {
          handleSetFormError('repeatPassword', '');
        }
        continue;
      }

      handleSetFormError(key, isValid ? '' : errMsg);
      if (!isValid) isSubmit = false;
    }

    if (!isSubmit) return;

    const res = await signup(credentials, fileId);
    if (res.status === 200) router.push('/login');
  };

  const handleSetFormError = (key: string, value: string) => {
    setFormError((prevState: Record<string, string>) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <>
      {status === 'unauthenticated' && (
        <div className="flex justify-center h-screen">
          <form
            onSubmit={handleSignup}
            className="flex flex-col items-center w-[600px] h-[600px] bg-[#fff] dark:bg-[#4a4a4a] 
            mt-[160px] rounded-[40px] p-[80px] shadow-[0_10px_35px_rgba(0,0,0,0.1)]"
          >
            <h3 className="text-[#4a4a4a] text-[36px]">Create your account</h3>
            <div className="flex flex-col my-[30px]">
              <div className="mb-[10px]">
                <Input
                  inputType={'email'}
                  inputPlaceholder="Enter your email address"
                  inputValue={credentials.email}
                  inputAction={(e: React.FormEvent<HTMLInputElement>) =>
                    handleInput(e, 'email')
                  }
                />
                <div className="text-[#7836FF] dark:text-[#e0e0e0] text-[12px]">
                  {formError.email}
                </div>
              </div>
              <div className="mb-[10px]">
                <Input
                  inputType={'password'}
                  inputPlaceholder="Enter your password"
                  inputValue={credentials.password}
                  inputAction={(e: React.FormEvent<HTMLInputElement>) =>
                    handleInput(e, 'password')
                  }
                />
                <div className="text-[#7836FF] dark:text-[#e0e0e0] text-[12px]">
                  {formError.password}
                </div>
              </div>
              <div className="mb-[10px]">
                <Input
                  inputType={'password'}
                  inputPlaceholder="Repeat your password"
                  inputValue={repeatPassword}
                  inputAction={(e: React.FormEvent<HTMLInputElement>) =>
                    handleRepeatPassword(e)
                  }
                />
                <div className="text-[#7836FF] dark:text-[#e0e0e0] text-[12px]">
                  {formError.repeatPassword}
                </div>
              </div>
              <div className="mb-[10px]">
                <Input
                  inputType={'text'}
                  inputPlaceholder="Enter your username"
                  inputValue={credentials.name}
                  inputAction={(e: React.FormEvent<HTMLInputElement>) =>
                    handleInput(e, 'name')
                  }
                />
                <div className="text-[#7836FF] dark:text-[#e0e0e0] text-[12px]">
                  {formError.name}
                </div>
              </div>
              <div className="my-[20px] flex justify-between">
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center justify-center border-none bg-white text-[#7836FF] dark:text-[#e0e0e0] cursor-pointer px-4 py-2 text-[13px]"
                >
                  Choose File
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label className="inline-flex items-center justify-center border-none bg-white px-4 py-2 text-[13px]">
                  {file?.name}
                </label>
              </div>
              <Button
                btnType={'button'}
                label={'Upload'}
                btnAction={handleUpload}
              />
            </div>
            <div className="flex justify-center">
              <Button label={'Sign Up'} />
            </div>
            <div className="flex my-[20px]">
              <span className="pr-[2px] pt-[4px] text-[#a8a8a8] text-[12px] align-bottom">
                Already have an account?
              </span>
              <NavLink
                style={'text-[#7836FF] dark:text-[#e0e0e0] text-[12px] bold'}
                url={'/login'}
                label={'Sign In'}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Signup;
