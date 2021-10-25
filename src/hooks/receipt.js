import {isTypeof} from 'utils/checker';

export const receiptInitState = {
  authRequest: 'pending',
  payload: {},
};

export default function receipt(state = receiptInitState, action) {
  switch (action.type) {
    case 'set':
      return {
        authRequest: isTypeof('string', action.authRequest, state.authRequest),
        payload: isTypeof('object', action.payload, state.payload),
      };

    default:
      return state;
  }
}
