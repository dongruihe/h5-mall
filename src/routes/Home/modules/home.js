// ------------------------------------
// Constants
// ------------------------------------
//引入公共Constants
import { CREATE_REQUEST_SUCCESS, CREATE_REQUEST_FAIL } from  '../../../constants/request'

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CREATE_REQUEST_SUCCESS]    : (state, action) => {

    // console.log('action:',action.payload);
    return action.payload
  },
  [CREATE_REQUEST_FAIL]    : (state, action) => state + action.payload,
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function homeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  const s = handler ? handler(state, action) : state;

  // console.log('s:',s)

  return s;
}
