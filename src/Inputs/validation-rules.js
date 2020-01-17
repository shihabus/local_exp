export const validationRules = {
  email: {
    required: true,
    isEmail: true
  },
  name: {
    required: true,
    isName: true
  },

  password: {
    required: true
  },

  numberPlate: {
    isNumberPlate: true
  },

  mobileNumber: {
    isPhone: true
  }
};
