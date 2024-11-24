import React from 'react';
import { WrapperInputStyle } from './style';

const InputForm = (props) => {
  const { placeholder = 'Nhập text', value = '', onChange, ...rests } = props;

  const handleOnchangeInput = (e) => {
    if (onChange) {
      onChange(e.target.value);
    } else {
      console.error('onChange is not defined');
    }
  };

  return (
    <WrapperInputStyle
      placeholder={placeholder}
      value={value}
      onChange={handleOnchangeInput}
      {...rests}
    />
  );
};

export default InputForm;
