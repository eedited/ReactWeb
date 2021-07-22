import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import AuthForm from '../../components/auth/AuthForm';
import { rootStateType } from '../../modules';
import { changeField } from '../../modules/auth/auth';

import { changeFieldActionType } from '../../modules/auth/authType';

interface loginFormType{
    form: {
        username: string,
        password: string,
        passwordConfirm?: string
    }
}
const LoginForm: React.FC = () => {
    const dispatch: Dispatch<changeFieldActionType> = useDispatch();
    const { form }: loginFormType = useSelector(({ auth }: rootStateType) => ({
        form: auth.login,
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
    };
    return (
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
};

export default LoginForm;
