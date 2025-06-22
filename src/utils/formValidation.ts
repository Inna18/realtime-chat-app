export const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// total min 6 characters (at least 1 letter, at least 1 number, at least 1 special character - !@#$%^&*)
export const passwordValidationRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;