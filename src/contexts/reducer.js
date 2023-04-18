export const actionType = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',
    LOGOUT: 'LOGOUT',
}

export const initialState = {
    user: null,
    token:null,
    loading:false,
    error:null
}

export function reducer(state, action){
    switch (action.type) {
        case actionType.LOGIN_REQUEST:
            return{
                ...state,
                user: null,
                token:null,
                loading:true,
                error:null
            }
        case actionType.LOGIN_SUCCESS:
            const { user, token } = action.payload
            return{
                ...state,
                user: user,
                token:token,
                loading:false,
                error:null
            }
        case actionType.LOGIN_ERROR:
            return{
                ...state,
                user: null,
                token:null,
                loading:false,
                error:action.payload.error
            }
            case actionType.LOGOUT:
                return{
                    ...state,
                    user: null,
                    token:null,
                    loading:false,
                    error:null
                }
        default:
            throw Error("action type not allowed: ")
    }
}