/** 회원가입 요청 */
export interface IRegisterRequest {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

/** 로그인 요청 */
export interface ILoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}
