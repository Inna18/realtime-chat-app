'use client';
import React from 'react';
import Link from 'next/link';

interface Props {
  url: string;
  label: string;
}

const NavLink = ({ url, label }: Props) => {
  return (
    <div>
      <Link href={`${url}`}>{label}</Link>
    </div>
  );
};

export default NavLink;
