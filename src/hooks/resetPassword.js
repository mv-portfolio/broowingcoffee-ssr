import {isObject, isTypeof} from 'utils/checker';

export const resetPasswordInitState = {
  isEncrypt: true,
  isLoading: false,
  newPassword: '',
  confirmPassword: '',
  passwordStrength: 0,
  isMatched: false,
  authRequest: 'pending',
  resetRequest: 'pending',
  messageRequest: '',
  email: '',
  token: '',
};

export default function resetPassword(state = resetPasswordInitState, action) {
  switch (action.type) {
    case 'set':
      return {
        isEncrypt: isTypeof('boolean', action.isEncrypt, state.isEncrypt),
        isMatched: isTypeof('boolean', action.isMatched, state.isMatched),
        isLoading: isTypeof('boolean', action.isLoading, state.isLoading),
        newPassword: isTypeof('string', action.newPassword, state.newPassword),
        messageRequest: isTypeof('string', action.messageRequest, state.messageRequest),
        email: isTypeof('string', action.email, state.email),
        token: isTypeof('string', action.token, state.token),
        passwordStrength: isTypeof(
          'number',
          action.passwordStrength,
          state.passwordStrength,
        ),
        confirmPassword: isTypeof(
          'string',
          action.confirmPassword,
          state.confirmPassword,
        ),
        authRequest: isTypeof('string', action.authRequest, state.authRequest),
        resetRequest: isTypeof('string', action.resetRequest, state.resetRequest),
      };

    case 'clear':
      return resetPasswordInitState;

    default:
      return state;
  }
}
