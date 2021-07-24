import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import { rootActionType, rootStateType } from '../../modules';
import { changeField, initializeForm, register } from '../../modules/auth/auth';
import {
    responseSuccessType, responseFailureType, signupFormType,
} from '../../modules/auth/authType';
import { userType } from '../../modules/user/userType';
import { setUser } from '../../modules/user/user';

interface freomReduceType{
    form: signupFormType
    User: userType|null
    Auth?: responseSuccessType|null
    AuthError?: responseFailureType|null
}
interface props{
    history: RouteComponentProps['history']
}
const SignupForm: React.FC<props> = ({ history }: props) => {
    const [error, setError]: [string | null, React.Dispatch<React.SetStateAction<string | null>>] = useState<string|null>(null);
    const dispatch: Dispatch<rootActionType> = useDispatch();
    const {
        form, Auth, AuthError, User,
    }: freomReduceType = useSelector(({ auth, user }: rootStateType) => ({
        form: auth.register,
        Auth: auth.auth,
        AuthError: auth.authError,
        User: user.user,
    }));
    const onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name }: {value: string, name: string} = e.target;
        dispatch(
            changeField({
                form: 'register',
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
            userId, password, passwordConfirm, email,
        }: {userId: string, password: string, passwordConfirm: string, email: string} = form;
        console.log(form);
        if ([userId, password, passwordConfirm].includes('')) {
            setError('빈 칸을 모두 입력하세요');
            return;
        }
        if (password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');
            dispatch(changeField({
                form: 'register',
                key: 'password',
                value: '',
            }));
            dispatch(changeField({
                form: 'register',
                key: 'passwordConfirm',
                value: '',
            }));
            return;
        }
        if (!ValidateEmail(email)) {
            setError('올바른 형식의 이메일이 아닙니다');
            return;
        }
        dispatch(register({
            userId,
            password,
            email,
        }));
    };
    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);
    useEffect(() => {
        if (AuthError) {
            console.log('오류발생');
            console.log(AuthError);
            setError(`회원가입 실패 ${AuthError.message}`);
            return;
        }
        if (Auth) {
            console.log('회원가입 성공');
            console.log(Auth);
            dispatch(setUser({ userId: form.userId }));
        }
    }, [Auth, AuthError, dispatch, form.userId]);
    useEffect(() => {
        if (User) {
            console.log('check Api 성공');
            console.log(User);
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
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(SignupForm);
