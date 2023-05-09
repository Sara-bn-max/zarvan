import { useAuthDispatch } from "./auth-context"

export const actionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',
    LOGOUT: 'LOGOUT'
}

export const initialState = {
    user: null,
    token: null,
    setting: null,
    loading: false,
    error: null
}

export function reducer(state, action) {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return {
                ...state,
                user: null,
                token: null,
                setting: null,
                loading: true,
                error: null
            }
        case actionTypes.LOGIN_SUCCESS:
            const { user, setting, token} = action.payload
            return {
                ...state,
                user: user,
                setting: setting,
                token: token,
                loading: false,
                error: null
            }
        case actionTypes.LOGIN_ERROR:
            return {
                ...state,
                user: null,
                token: null,
                setting: null,
                loading: false,
                error: action.payload.error
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                setting: null,
                loading: false,
                error: null
            }
        default:
            throw Error(`action type not allowed: ${action.type}`)
    }
}



export function useAuthActions() {
    
    const dispatch = useAuthDispatch()
  
    function loginReq() {
      return dispatch({
        type: actionTypes.LOGIN_REQUEST,
      });
    }
  
    function loginSuccess(user, setting, token) {
      return dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
          user: user,
          token: token,
          setting: setting,
        },
      });
    }
  
    function loginError(error) {
      return dispatch({
        type: actionTypes.LOGIN_ERROR,
        payload: {
          error: error,
        },
      });
    }
  
    function logOut() {
      return dispatch({
        type: actionTypes.LOGOUT,
      });
    }
  
    return {
      loginReq,
      loginSuccess,
      loginError,
      logOut,
      dispatch,
    };
  }