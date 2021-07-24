import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import { rootActionType, rootStateType } from '../../modules';
import { changeField, initializeForm, login } from '../../modules/auth/auth';
import {
    responseSuccessType, responseFailureType, loginFormType,
} from '../../modules/auth/authType';
import { userType } from '../../modules/user/userType';
import { setUser } from '../../modules/user/user';

interface fromReducerType{
    form: loginFormType
    User: userType|null
    Auth?: responseSuccessType|null
    AuthError?: responseFailureType|null
}
interface props{
    history: RouteComponentProps['history'],
}

const LoginForm: React.FC<props> = ({ history }: props) => {
    const [error, setError]: [string | null, React.Dispatch<React.SetStateAction<string | null>>] = useState<string|null>(null);
    const dispatch: Dispatch<rootActionType> = useDispatch();
    const {
        form, Auth, AuthError, User,
    }: fromReducerType = useSelector(({ auth, user }: rootStateType) => ({
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
            setError('로그인 실패');
            return;
        }
        if (Auth) {
            console.log('로그인 성공');

            dispatch(setUser({ userId: form.userId }));
        }
    }, [Auth, AuthError, User, dispatch, form.userId]);
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
    }, [history, User]);

    return (
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(LoginForm);
