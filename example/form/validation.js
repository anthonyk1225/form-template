const isEmailValid = (value) => {
  if (value === undefined) return false;
  if (value.length === 0) return false;
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(value.toLowerCase())) return true;
  return false;
};

const passwordHasProperLength = (value) => value.length >= 8;

const stringHasLength = (value) => value.length;

export default {
  email: (value) => {
    const emailValid = isEmailValid(value);
    return emailValid;
  },
  hasAnyLength: (value) => {
    const hasALength = stringHasLength(value);
    return hasALength;
  },
  password: (value) => {
    const passwordLength = passwordHasProperLength(value);
    return passwordLength;
  },
};
