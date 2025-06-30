import React from 'react';

interface Props {
  label: string;
  btnType?: 'submit' | 'reset' | 'button' | undefined;
  btnAction?: () => void;
}

const Button = ({ label, btnType, btnAction }: Props) => {
  return (
    <button
      className="border-none bg-[#7836FF] py-[8px] px-[24px] rounded-[6px] text-[#fff] cursor-pointer"
      type={btnType}
      onClick={btnAction}
    >
      {label}
    </button>
  );
};

export default Button;
