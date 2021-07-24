import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import AuthForm from '../../components/auth/AuthForm';
import { rootStateType } from '../../modules';
import { changeField, initializeForm, login } from '../../modules/auth/auth';
import { changeFieldActionType, authActionType, responseType } from '../../modules/auth/authType';
import { userType } from '../../modules/user/userType';
import { check } from '../../modules/user/user';

interface loginFormType{
    form: {
        userId: string,
        password: string,
    }
    User: userType|null
    Auth?: responseType|null
    AuthError?: Error|null
}
interface props{
    history: RouteComponentProps['history'],
}

interface CookieSetOptions{
    path?: string;
    expires?: Date;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: boolean | 'none' | 'lax' | 'strict';
    encode?: (value: string)=> string;
}
const LoginForm: React.FC<props> = ({ history }: props) => {
    const dispatch: Dispatch<authActionType> = useDispatch();
    const {
        form, Auth, AuthError, User,
    }: loginFormType = useSelector(({ auth, user }: rootStateType) => ({
        form: auth.login,
        Auth: auth.auth,
        AuthError: auth.authError,
        User: user.user,
    }));

    const onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name }: {value: string, name: string} = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value,
            }),
        );
    };
    const onSubmit: (e: React.FormEvent<HTMLFormElement>)=> void = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { userId, password }: {userId: string, password: string} = form;
        dispatch(login({
            userId,
            password,
        }));
    };
    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);
    useEffect(() => {
        if (AuthError) {
            console.log('에러발생');
            console.log(AuthError);
            return;
        }
        if (Auth) {
            console.log('로그인 성공');
            // dispatch(check());
        }
    }, [Auth, AuthError, dispatch]);
    /*
    useEffect(() => {
        if (User) {
            history.push('/');
        }
    }, [history, User]); */

    return (
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
};

export default withRouter(LoginForm);
