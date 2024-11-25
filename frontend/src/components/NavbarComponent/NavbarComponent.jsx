import React from 'react';
import { WrapperContent, WrapperLabelText, WrapperTextPrice, WrapperTextValue } from './style';
import { Checkbox, Rate } from 'antd';

const NavbarComponent = () => {
  const onChange = () => {};

  const renderContent = (type, options) => {
    switch (type) {
      case 'text':
        return options.map((option, index) => (
          <WrapperTextValue key={index}>{option}</WrapperTextValue>
        ));

      case 'checkbox':
        return (
          <Checkbox.Group
            style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}
            onChange={onChange}
          >
            {options.map((option, index) => (
              <Checkbox key={index} style={{ marginLeft: 0 }} value={option.value}>
                {option.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        );

      case 'star':
        return options.map((option, index) => (
          <div key={index} style={{ display: 'flex', gap: '5px' }}>
            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
            <span>{`từ ${option} sao`}</span>
          </div>
        ));

      case 'price':
        return options.map((option, index) => (
          <WrapperTextPrice key={index}>{option}</WrapperTextPrice>
        ));

      default:
        return null;
    }
  };

  return (
    <div>
      <WrapperLabelText>Label</WrapperLabelText>
      <WrapperContent>{renderContent('text', ['Yonex', 'Lining', 'Victor'])}</WrapperContent>
    </div>
  );
};

export default NavbarComponent;
