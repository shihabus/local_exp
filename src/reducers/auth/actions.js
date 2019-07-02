export const authTypes = {
  SUBMIT_AUTH_DETAILS: 'SUBMIT_AUTH_DETAILS'
}

const submitAuthDetails = data => {
  return {
    type: authTypes.SUBMIT_AUTH_DETAILS,
    data
  }
}

export const authActions = {
  submitAuthDetails,
}