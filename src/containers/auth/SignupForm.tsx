import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import AuthForm from '../../components/auth/AuthForm';
import { rootStateType } from '../../modules';
import { changeField } from '../../modules/auth/auth';

import { changeFieldActionType } from '../../modules/auth/authType';

interface signupFormType{
    form: {
        username: string,
        password: string,
        passwordConfirm?: string
    }
}
const SignupForm: React.FC = () => {
    const dispatch: Dispatch<changeFieldActionType> = useDispatch();
    const { form }: signupFormType = useSelector(({ auth }: rootStateType) => ({
        form: auth.register,
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
    };
    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
};

export default SignupForm;
