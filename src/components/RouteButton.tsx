'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  label: string;
  url: string;
}
const Button = ({ label, url }: Props) => {
  const router = useRouter();
  const handleRoute = () => {
    router.push(url);
  };
  return <button onClick={handleRoute}>{label}</button>;
};

export default Button;
