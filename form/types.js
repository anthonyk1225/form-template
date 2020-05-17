import constants from './constants';

const {
  forgotPassword: forgotPasswordConstants,
  changePassword: changePasswordConstants,
  login: loginConstants,
} = constants;

export default {
  forgotPassword: [
    {
      keyboardType: 'email-address',
      nextRef: '',
      placeholder: 'Email',
      ref: forgotPasswordConstants.email.ref,
      textContentType: 'emailAddress',
      validationKey: 'email',
      props: {},
    },
  ],
  changePassword: [
    {
      nextRef: '',
      placeholder: 'Password',
      ref: changePasswordConstants.password.ref,
      textContentType: 'password',
      validationKey: 'password',
      props: {},
    },
  ],
  login: [
    {
      keyboardType: 'email-address',
      nextRef: loginConstants.password.ref,
      placeholder: 'Email',
      ref: loginConstants.email.ref,
      textContentType: 'emailAddress',
      validationKey: 'email',
      props: {},
    },
    {
      nextRef: '',
      placeholder: 'Password',
      ref: loginConstants.password.ref,
      textContentType: 'password',
      validationKey: 'password',
      props: {},
    },
  ],
};
