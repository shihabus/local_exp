import React, { Component } from "react";
import styled from "styled-components";
import {
  emailConfig,
  nameConfig,
  passwordConfig,
  numberPlateConfig,
  telConfig
} from "./input-config";
import { updateElemObj, checkValidity } from "./utils";
import { validationRules } from "./validation-rules";

const InputWrapper = styled.div`
  background: ${props => (props.isValid ? "green" : "red")};
  width: 500px;
  display: flex;
`;

const Label = styled.label`
  padding-right: 10px;
`;

const Input = styled.input`
  border: 0.05px solid green;
  flex: 1;
  &:invalid {
    border: 0.05px solid red;
  }
  &:focus {
    border: 0.05px solid yellow;
  }
`;

const CustomInput = ({
  changed,
  value,
  elementConfig,
  isValid,
  elementType,
  label,
  id,
  ...rest
}) => {
  return (
    <InputWrapper isValid={isValid}>
      <Label htmlFor={id}>{label}</Label>
      <Input onChange={changed} {...elementConfig} value={value} id={id} />
    </InputWrapper>
  );
};

export default class index extends Component {
  state = {
    email: {
      eleType: "input",
      eleName: "email",
      value: "",
      validation: validationRules.email,
      config: emailConfig,
      valid: true,
      touched: false
    },

    name: {
      eleType: "input",
      eleName: "name",
      value: "",
      validation: validationRules.name,
      config: nameConfig,
      valid: true,
      touched: false
    },

    password: {
      eleType: "input",
      eleName: "password",
      value: "",
      validation: validationRules.password,
      config: passwordConfig,
      valid: true,
      touched: false
    },

    numberPlate: {
      eleType: "input",
      eleName: "numberPlate",
      value: "",
      validation: validationRules.numberPlate,
      config: numberPlateConfig,
      valid: true,
      touched: false
    },

    mobileNumber: {
      eleType: "input",
      eleName: "mobileNumber",
      value: "",
      validation: validationRules.mobileNumber,
      config: telConfig,
      valid: true,
      touched: false
    }
  };

  inputChangeHandler = (event, elem) => {
    event.preventDefault();
    event.stopPropagation();
    const updatedObject = updateElemObj(elem, {
      value: event.target.value,
      valid: checkValidity(event.target.value, elem.validation),
      touched: true
    });

    this.setState({ [elem.eleName]: { ...updatedObject } });
  };

  render() {
    const { email, name, password, numberPlate, mobileNumber } = this.state;
    return (
      <React.Fragment>
        <CustomInput
          elementType="input"
          elementConfig={email.config}
          value={email.value}
          isValid={email.valid}
          touched={email.touched}
          changed={event => {
            this.inputChangeHandler(event, email);
          }}
          label="email"
          id="email"
        />
        <CustomInput
          elementType="input"
          elementConfig={name.config}
          value={name.value}
          isValid={name.valid}
          touched={name.touched}
          changed={event => {
            this.inputChangeHandler(event, name);
          }}
          label="name"
          id="name"
        />

        <CustomInput
          elementType="input"
          elementConfig={password.config}
          value={password.value}
          isValid={password.valid}
          touched={password.touched}
          changed={event => {
            this.inputChangeHandler(event, password);
          }}
          label="password"
          id="password"
        />

        <CustomInput
          elementType="input"
          elementConfig={numberPlate.config}
          value={numberPlate.value}
          isValid={numberPlate.valid}
          touched={numberPlate.touched}
          changed={event => {
            this.inputChangeHandler(event, numberPlate);
          }}
          label="Number Plate"
          id="numberPlate"
        />

        <CustomInput
          elementType="input"
          elementConfig={mobileNumber.config}
          value={mobileNumber.value}
          isValid={mobileNumber.valid}
          touched={mobileNumber.touched}
          changed={event => {
            this.inputChangeHandler(event, mobileNumber);
          }}
          label="Mobile Number"
          id="mobileNumber"
        />
      </React.Fragment>
    );
  }
}
