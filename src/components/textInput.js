import React from 'react';

import styled from 'styled-components';
import PropTypes from 'prop-types';

const Label = styled.p`
  font-size: ${props => (props.fontSize ? props.fontSize : '1.8rem')};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : '600')};
  line-height: 1.22;
  color: ${props => (props.color ? props.color : '#424242')};
  margin-bottom: ${props => (props.marginBottom ? props.marginBottom : '0')};
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 2.1rem;

  .input_container {
    position: relative;
  }

  .InputElement {
    display: block;
    outline: none;
    border-radius: 4px;
    border: solid 1px #e1e1e1;
    padding: 1rem;
    width: 100%;
  }

  textarea {
    min-height: 100px;
  }

  .Invalid {
    border-color: red;
  }

  .hide-label {
    display: none;
  }

  /* .Password {
    background-image: url('/static/key.png');
    background-repeat: no-repeat;
    background-position: right;
    background-size: 1rem;
  }

  .userImage {
    background-image: url('/static/user.png');
    background-repeat: no-repeat;
    background-position: right;
    background-size: 1.5rem;
  }

  .emailImage {
    background-image: url('/static/email.png');
    background-repeat: no-repeat;
    background-position: right;
    background-size: 1.5rem;
  } */
`;

const input = props => {
  let inputEle = null;

  const {
    elementType,
    elementConfig,
    value,
    changed,
    style,
    invalid,
    shouldValidate,
    touched,
    className,
    hideLabel,
    readOnly
  } = props;

  let inputLabel = null;

  if (elementConfig) {
    const { label } = elementConfig;
    inputLabel = label;
  }

  const inputClasses = ['InputElement', `${className}`];

  if (invalid && shouldValidate && touched) {
    inputClasses.push('Invalid');
  }

  switch (elementType) {
    case 'input':
      inputEle = (
        <div className='input_container'>
          <input
            autoComplete='off'
            className={inputClasses.join(' ')}
            {...elementConfig}
            value={value}
            onChange={changed}
            readOnly={readOnly}
          />
        </div>
      );
      break;
    case 'textarea':
      inputEle = (
        <textarea
          className={inputClasses.join(' ')}
          cols='8'
          {...elementConfig}
          value={value}
          onChange={changed}
          readOnly={readOnly}
        />
      );
      break;
    case 'select':
      inputEle = (
        <select className={inputClasses.join(' ')} value={value} onChange={changed} readOnly={readOnly}>
          {elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputEle = (
        <input
          autoComplete='off'
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
          readOnly={readOnly}
        />
      );
  }

  return (
    <InputWrapper className='Input' style={style}>
      <Label className={hideLabel ? 'Label hide-label' : 'Label'}>{inputLabel}</Label>
      {inputEle}
    </InputWrapper>
  );
};

input.propTypes = {
  elementType: PropTypes.any,
  elementConfig: PropTypes.any,
  value: PropTypes.any,
  changed: PropTypes.any,
  label: PropTypes.any,
  style: PropTypes.any,
  invalid: PropTypes.any,
  shouldValidate: PropTypes.any,
  touched: PropTypes.any,
  className: PropTypes.string,
  hideLabel: PropTypes.bool,
  readOnly: PropTypes.bool
};

export default input;