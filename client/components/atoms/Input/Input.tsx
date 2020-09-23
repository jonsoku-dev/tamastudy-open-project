import React, { useRef, useImperativeHandle } from 'react';
import mergeRefs from 'react-merge-refs';

export interface InputProps {
  type?: string;
  name: string;
  defaultValue?: string;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ type = 'text', name, defaultValue, placeholder }, ref) => {
  const inputRef = useRef<any>();
  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));
  return (
    <input
      type={type}
      name={name}
      defaultValue={defaultValue}
      ref={mergeRefs([ref, inputRef])}
      placeholder={placeholder}
    />
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default React.forwardRef(Input);
