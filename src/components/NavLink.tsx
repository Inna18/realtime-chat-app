'use client';
import React from 'react';
import Link from 'next/link';

interface Props {
  style: string;
  url: string;
  label: string;
}

const NavLink = ({ style, url, label }: Props) => {
  return (
    <div>
      <Link className={style} href={`${url}`}>
        {label}
      </Link>
    </div>
  );
};

export default NavLink;
