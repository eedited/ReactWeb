import React, { useEffect } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { AnyAction } from 'redux';
import { SelectorStateType, useAppDispatch, useAppSelector } from '../hooks';
import { userAction } from '../redux/user/user';

interface FromReducerType {
    User: AuthRouter.CheckSuccessResponse | null
    UserFailure: AuthRouter.CheckFailureResponse | null
}
type Props = RouteComponentProps;
const SnsAuthPage: React.FC<Props> = ({ history }: Props) => {
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const {
        User, UserFailure,
    }: FromReducerType = useAppSelector((state: SelectorStateType) => ({
        User: state.userReducer.user,
        UserFailure: state.userReducer.checkError,
    }));
    React.useEffect(() => {
        dispatch(userAction.check());
    }, [dispatch]);
    React.useEffect(() => {
        if (User) {
            localStorage.setItem('user', JSON.stringify(User));
            history.push('/');
        }
        if (UserFailure) {
            history.push('/404NotFound');
        }
    }, [User, UserFailure, dispatch, history]);
    return (
        <></>
    );
};

export default SnsAuthPage;
