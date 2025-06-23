'use client';
import { User } from '@/types';
import {
  emailValidationRegex,
  passwordValidationRegex,
} from '@/utils/formValidation';
import React, { useState } from 'react';
import { signup, upload } from '@/service/auth';
import { useRouter } from 'next/navigation';

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

const SignupForm = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState<User>(DEFAULT_USER);
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [formError, setFormError] =
    useState<Record<string, string>>(DEFAULT_ERROR);
  const [file, setFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);

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
    <form
      onSubmit={handleSignup}
      className="flex flex-col w-[400px] mt-[260px]"
    >
      <h3>Sign Up</h3>
      <div className="flex flex-col">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={credentials.email}
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              handleInput(e, 'email')
            }
          />
          <span>{formError.email}</span>
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              handleInput(e, 'password')
            }
          />
          <span>{formError.password}</span>
        </div>
        <div>
          <input
            type="password"
            placeholder="Repeat password"
            value={repeatPassword}
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              handleRepeatPassword(e)
            }
          />
          <span>{formError.repeatPassword}</span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Nickname"
            value={credentials.name}
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              handleInput(e, 'name')
            }
          />
          <span>{formError.name}</span>
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            placeholder="Select image"
            onChange={handleFileChange}
          />
          <button type="button" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
      <button>Sign Up</button>
    </form>
  );
};

export default SignupForm;
