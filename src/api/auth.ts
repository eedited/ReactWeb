import { AxiosResponse } from 'axios';
import client from './client';
import FileUploadToS3 from '../services/upload';

type LoginFunctionType = ({ userId, password }: AuthRouter.LoginRequest) => Promise<AxiosResponse<AuthRouter.AuthSuccessResponse>>;
export const login: LoginFunctionType = ({ userId, password }: AuthRouter.LoginRequest) => client.post('/auth/login', {
    userId,
    password,
});

type SignupFunctionType = ({ userId, password, email, nickname }: AuthRouter.SignupRequest) => Promise<AxiosResponse<AuthRouter.AuthSuccessResponse>>;
export const signup: SignupFunctionType = ({ userId, password, email, nickname }: AuthRouter.SignupRequest) => client.post('/auth/signup', {
    userId,
    password,
    email,
    nickname,
    profilePicture: new FileUploadToS3('img', 'profile').getBaseProfileImgUrl(),
});

type LogoutFunctionType = () => Promise<AxiosResponse<void>>;
export const logout: LogoutFunctionType = () => client.get('/auth/logout');

export const check: () => Promise<AxiosResponse<AuthRouter.CheckSuccessResponse>> = () => client.get('/auth/check');

type SignupValidationFunctionType = ({ token }: AuthRouter.SignupValidationRequest) => Promise<AxiosResponse<AuthRouter.SignupValidationSuccessResponse>>
export const signupValidation: SignupValidationFunctionType = ({ token }: AuthRouter.SignupValidationRequest) => client.post('/auth/signup/emailValidation', {
    token,
});

export const signupEmail: () => Promise<AxiosResponse<AuthRouter.CheckSuccessResponse>> = () => client.get('/auth/signup/email');

type ChangePasswordFunctionType=({ currentPassword, newPassword }: AuthRouter.ChangePasswordRequest) => Promise<AxiosResponse<AuthRouter.ChangePasswordSuccessResponse>>
export const changePassword: ChangePasswordFunctionType = ({ currentPassword, newPassword }: AuthRouter.ChangePasswordRequest) => client.post('/auth/change/password', {
    newPassword,
    password: currentPassword,
});

type DeleteUserFunctionType=({ userId }: AuthRouter.DeleteuserRequest) => Promise<AxiosResponse<AuthRouter.DeleteuserSuccessResponse>>
export const deleteUser: DeleteUserFunctionType = ({ userId }: AuthRouter.DeleteuserRequest) => client.delete(`/auth/${userId}`);

type GoogleLogin=({ tokenId, googleId }: AuthRouter.GoogleLoginRequest) => Promise<AxiosResponse<AuthRouter.GoogleLoginSuccessResponse>>;
export const googleLogin: GoogleLogin = ({ tokenId, googleId }: AuthRouter.GoogleLoginRequest) => client.post('/auth/login/google', { tokenId, googleId });
