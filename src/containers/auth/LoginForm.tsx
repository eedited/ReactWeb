import React, { useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import { SelectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { authAction } from '../../redux/auth/auth';
import { userAction } from '../../redux/user/user';

interface FromReducerType {
    form: Login
    User: AuthRouter.CheckSuccessResponse | null
    Auth?: AuthRouter.AuthSuccessResponse | null
    AuthError?: RDXAuthModule.AuthFailureResponse | null
}
interface Props {
    history: RouteComponentProps['history'],
}

const LoginForm: React.FC<Props> = ({ history }: Props) => {
    const { changeField, intializeForm, login }: RDXAuthModule.ActionType = authAction;
    const [error, setError]: [string | null, React.Dispatch<React.SetStateAction<string | null>>] = useState<string | null>(null);

    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const {
        form, Auth, AuthError, User,
    }: FromReducerType = useAppSelector((state: SelectorStateType) => ({
        form: state.authReducer.login,
        User: state.userReducer.user,
        Auth: state.authReducer.auth,
        AuthError: state.authReducer.authError,
    }));

    const onChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name }: {value: string, name: string} = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value,
            }),
        );
    };

    const onSubmit: (e: React.FormEvent<HTMLFormElement>) => void = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { userId, password }: {userId: string, password: string} = form;
        dispatch(login({
            userId,
            password,
        }));
    };

    useEffect(() => () => {
        dispatch(intializeForm());
    }, [dispatch, intializeForm]);

    useEffect(() => {
        if (AuthError) {
            if (AuthError.info) setError(AuthError.info);
            else setError(AuthError.error.message);
        }
        if (Auth) {
            dispatch(userAction.check());
        }
    }, [Auth, AuthError, dispatch]);

    useEffect(() => {
        if (User) {
            try {
                localStorage.setItem('user', JSON.stringify(User));
            }
            catch (err) {
                console.log('local storage not working');
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
