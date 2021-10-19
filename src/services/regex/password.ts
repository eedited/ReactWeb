// 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
export const rgxPassword: RegExp = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
