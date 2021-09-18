import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import BaseTemplate from './BaseTemplate';
import UploadContainer from '../containers/upload/UploadContainer';
import { SelectorStateType, useAppSelector } from '../hooks';

interface FromReducerType {
    user: User | null
}
type props = RouteComponentProps;

const UploadPage: React.FC<props> = ({ history }: props) => {
    const {
        user,
    }: FromReducerType = useAppSelector(((state: SelectorStateType) => ({
        user: state.userReducer.user,
    })));

    if (!user) {
        history.push('/404NotFound');
    }

    return (
        <BaseTemplate>
            <UploadContainer />
        </BaseTemplate>
    );
};

export default withRouter(UploadPage);
