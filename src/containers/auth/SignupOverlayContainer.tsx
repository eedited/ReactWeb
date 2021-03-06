import React, { useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { SelectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { authAction } from '../../redux/auth/auth';
import AuthOverlay from '../../components/auth/AuthOverlay';
import { LoadingStateType } from '../../redux/loading/loading';
import { validatePassword } from '../../services/regex';

interface formReduceType{
    form: RDXAuthModule.SignupForm
    Auth?: AuthRouter.AuthSuccessResponse|null
    AuthError?: RDXAuthModule.AuthFailureResponse|null
    loading: LoadingStateType
}
interface props extends RouteComponentProps{
    backgroundClicked: () => void
    title?: (type: string) => string
    setType: (type: 'login'|'signup') => void
}
const SignupOverlayContainer: React.FC<props> = ({ history, backgroundClicked, title, setType }: props) => {
    const { changeField, signup, intializeForm }: RDXAuthModule.ActionType = authAction;
    const [error, setError]: [string | null, React.Dispatch<React.SetStateAction<string | null>>] = useState<string|null>(null);
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const {
        form, Auth, AuthError, loading,
    }: formReduceType = useAppSelector(((state: SelectorStateType) => ({
        form: state.authReducer.signup,
        Auth: state.authReducer.auth,
        AuthError: state.authReducer.authError,
        loading: state.loadingReducer,
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
    const ValidateEmail: (main: string) => boolean = (mail: string) => {
        const re: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(mail).toLowerCase())) {
            return true;
        }
        return false;
    };
    const onSubmit: (e: React.FormEvent<HTMLFormElement>) => void = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {
            userId, password, passwordConfirm, email, nickname,
        }: {userId: string, password: string, passwordConfirm: string, email: string, nickname: string} = form;
        if ([userId, password, passwordConfirm].includes('')) {
            setError('??? ?????? ?????? ???????????????');
            return;
        }
        if (password !== passwordConfirm) {
            setError('??????????????? ???????????? ????????????.');
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
            setError('????????? ????????? ???????????? ????????????');
            return;
        }
        if (!validatePassword(password)) {
            setError('??????????????? ??????8???, ??????, ????????? ?????? ????????? ?????????????????????.');
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
            setError(`???????????? ?????? ${AuthError.info}`);
        }
        if (Auth) {
            backgroundClicked();
            history.push(`/signupSuccess?email=${form.email}`);
        }
    }, [Auth, AuthError, backgroundClicked, form.email, history]);
    return (
        <AuthOverlay
            title={title}
            backgroundClicked={() => {
                if (!loading['AUTH/signup']) {
                    backgroundClicked();
                }
            }}
            type="signup"
            setType={setType}
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
            loading={loading['AUTH/signup']}
        />
    );
};
SignupOverlayContainer.defaultProps = {
    title: (type: string) => type.toUpperCase(),
};
export default withRouter(SignupOverlayContainer);
