import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import { rootStateType } from '../../modules';
import { changeField, initializeForm, register } from '../../modules/auth/auth';
import { check } from '../../modules/user/user';
import { authActionType, responseType } from '../../modules/auth/authType';
import { userType } from '../../modules/user/userType';

interface signupFormType{
    form: {
        userId: string,
        password: string,
        passwordConfirm: string
        email: string
    }
    User: userType|null
    Auth?: responseType|null
    AuthError?: Error|null
}
interface props{
    history: RouteComponentProps['history']
}
const SignupForm: React.FC<props> = ({ history }: props) => {
    const dispatch: Dispatch<authActionType> = useDispatch();
    const {
        form, Auth, AuthError, User,
    }: signupFormType = useSelector(({ auth, user }: rootStateType) => ({
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
    const onSubmit: (e: React.FormEvent<HTMLFormElement>)=> void = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {
            userId, password, passwordConfirm, email,
        }: {userId: string, password: string, passwordConfirm: string, email: string} = form;
        console.log(form);
        if (password !== passwordConfirm) {
            // 에러처리
            alert(`${password}, ${passwordConfirm}`);
        }
        else {
            dispatch(register({
                userId,
                password,
                email,
            }));
        }
    };
    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);
    useEffect(() => {
        if (AuthError) {
            console.log('오류발생');
            console.log(AuthError);
            return;
        }
        if (Auth) {
            console.log('회원가입 성공');
            console.log(Auth);
            // dispatch(check())
        }
    }, [Auth, AuthError, dispatch]);
    useEffect(() => {
        if (User) {
            console.log('check Api 성공');
            console.log(User);
            history.push('/');
        }
    }, [User, history]);
    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
};

export default withRouter(SignupForm);
