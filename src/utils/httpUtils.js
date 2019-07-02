import axios from 'axios'
import { urls, } from '../config'

const instance = axios.create()

// Todo add headers to instance
// Todo add interceptors

export function makeGetCall(route, params = {}, dispatch, successCallback, errorCallback) {
  instance.get(route, {
    params: {...params}
  }).then(response => handleSuccess(response, successCallback, dispatch))
  .catch(error => handleError(error, errorCallback, dispatch))
}

export function makePostCall(route, data, dispatch, successCallback, errorCallback) {
  instance.post(route, data)
    .then(response => handleSuccess(response, successCallback, dispatch))
    .catch(error => handleError(error, errorCallback, dispatch))
}

export function makePutCall(route, data, dispatch, successCallback, errorCallback) {
  instance.put(route, data)
    .then(response => handleSuccess(response, successCallback, dispatch))
    .catch(error => handleError(error, errorCallback, dispatch))
}

handleSuccess(response, successCallback, dispatch) {
  dispatch(successCallback(response))
}

function handleError(error, errorCallback, dispatch) {
  dispatch(errorCallback(error))
}