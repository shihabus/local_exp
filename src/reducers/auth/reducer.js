import { authTypes as types } from './actions'

const initialState = {

}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.SUBMIT_AUTH_DETAILS:
      return {
        ...state,
        data: action.data
      }
    default: 
      return { ...state }
  }
}

export default authReducer