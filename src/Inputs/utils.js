import validator from "validator";

export const updateElemObj = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties
});

export const checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.minValue) {
    isValid = value >= rules.minValue && isValid;
  }

  if (rules.maxValue) {
    isValid = value <= rules.maxValue && isValid;
  }

  if (rules.isAlpha) {
    isValid = validator.isAlpha(value) && isValid;
  }

  if (rules.isURL) {
    isValid = validator.isURL(value) && isValid;
  }

  if (rules.isName) {
    isValid = validator.isAlpha(value.replace(/ +/g, "")) && isValid;
  }

  if (rules.isEmail) {
    isValid = validator.isEmail(value) && isValid;
  }

  if (rules.isPhone) {
    isValid = validator.isMobilePhone(value, "en-IN") && isValid;
  }

  if (rules.isNumeric) {
    isValid = validator.isNumeric(value) && isValid;
  }

  if (rules.isAlphaNumeric) {
    isValid = validator.isAlphanumeric(value) && isValid;
  }

  if (rules.isNumberPlate) {
    isValid =
      validator.matches(
        value,
        /^[A-Z]{2}(\s|-)[0-9]{2}(\s|-)[A-Z]{2}(\s|-)[0-9]{4}$/gm
      ) && isValid;
  }
  return isValid;
};
