import React, { useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';

import {
    responseSuccessType, responseFailureType, authActionType,
} from '../../modules/auth/authType';
import { signupProp } from '../../lib/api/auth';
import { userType } from '../../modules/user/userType';
import { selectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { authAction } from '../../modules/auth/auth';
import { userAction } from '../../modules/user/user';

interface formReduceType{
    form: signupProp&{passwordConfirm: string}
    User: userType|null
    Auth?: responseSuccessType|null
    AuthError?: responseFailureType|null
}
interface props{
    history: RouteComponentProps['history']
}
const SignupForm: React.FC<props> = ({ history }: props) => {
    const { changeField, signup, intializeForm }: authActionType = authAction;
    const [error, setError]: [string | null, React.Dispatch<React.SetStateAction<string | null>>] = useState<string|null>(null);
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const {
        form, Auth, AuthError, User,
    }: formReduceType = useAppSelector(((state: selectorStateType) => ({
        form: state.authReducer.signup,
        Auth: state.authReducer.auth,
        AuthError: state.authReducer.authError,
        User: state.userReducer.user,
    })));
    const onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name }: {value: string, name: string} = e.target;
        dispatch(
            changeField({
                form: 'signup',
                key: name,
                value,
            }),
        );
    };
    const ValidateEmail: (main: string)=> boolean = (mail: string) => {
        const re: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(mail).toLowerCase())) {
            return true;
        }
        return false;
    };
    const onSubmit: (e: React.FormEvent<HTMLFormElement>)=> void = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {
            userId, password, passwordConfirm, email, nickname,
        }: {userId: string, password: string, passwordConfirm: string, email: string, nickname: string} = form;
        if ([userId, password, passwordConfirm].includes('')) {
            setError('빈 칸을 모두 입력하세요');
            return;
        }
        if (password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');
            dispatch(changeField({
                form: 'signup',
                key: 'password',
                value: '',
            }));
            dispatch(changeField({
                form: 'signup',
                key: 'passwordConfirm',
                value: '',
            }));
            return;
        }
        if (!ValidateEmail(email)) {
            setError('올바른 형식의 이메일이 아닙니다');
            return;
        }
        dispatch(signup({
            userId,
            password,
            email,
            nickname,
        }));
    };
    useEffect(() => {
        dispatch(intializeForm());
    }, [dispatch, intializeForm]);
    useEffect(() => {
        if (AuthError) {
            setError(`회원가입 실패 ${AuthError.info}`);
        }
        if (Auth) {
            dispatch(userAction.setUser({ userId: form.userId }));
        }
    }, [Auth, AuthError, dispatch, form.userId]);
    useEffect(() => {
        if (User) {
            history.push('/');
            try {
                sessionStorage.setItem('user', JSON.stringify(User));
            }
            catch (err) {
                console.log('local session not working');
            }
        }
    }, [User, history]);
    return (
        <AuthForm
            type="signup"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(SignupForm);
