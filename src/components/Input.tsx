import React from 'react';

interface Props {
  inputType: string;
  inputPlaceholder?: string;
  inputValue: string;
  inputAction: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Input = ({
  inputType,
  inputPlaceholder,
  inputValue,
  inputAction,
}: Props) => {
  return (
    <input
      className="w-[324px] border border-[#e3e3e3] rounded-[6px] h-[40px] p-[10px]"
      type={inputType}
      placeholder={inputPlaceholder}
      value={inputValue}
      onInput={inputAction}
    />
  );
};

export default Input;
