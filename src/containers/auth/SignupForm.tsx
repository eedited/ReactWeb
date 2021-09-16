import React, { useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import { SelectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { authAction } from '../../redux/auth/auth';
import { validateEmail } from '../../services/regex';

interface formReduceType {
    form: RDXAuthModule.SignupForm
    Auth?: AuthRouter.AuthSuccessResponse | null
    AuthError?: RDXAuthModule.AuthFailureResponse | null
}
interface Props {
    history: RouteComponentProps['history']
}

const SignupForm: React.FC<Props> = ({ history }: Props) => {
    const { changeField, signup, intializeForm }: RDXAuthModule.ActionType = authAction;
    const [error, setError]: [string | null, React.Dispatch<React.SetStateAction<string | null>>] = useState<string | null>(null);

    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const {
        form, Auth, AuthError,
    }: formReduceType = useAppSelector(((state: SelectorStateType) => ({
        form: state.authReducer.signup,
        Auth: state.authReducer.auth,
        AuthError: state.authReducer.authError,
    })));

    const onChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name }: {value: string, name: string} = e.target;
        dispatch(
            changeField({
                form: 'signup',
                key: name,
                value,
            }),
        );
    };

    const onSubmit: (e: React.FormEvent<HTMLFormElement>) => void = (e: React.FormEvent<HTMLFormElement>) => {
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
        if (!validateEmail(email)) {
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

    useEffect(() => () => {
        dispatch(intializeForm());
    }, [dispatch, intializeForm]);

    useEffect(() => {
        if (AuthError) {
            setError(`회원가입 실패 ${AuthError.info}`);
        }
        if (Auth) {
            history.push('/login');
        }
    }, [Auth, AuthError, history]);

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
