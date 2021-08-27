import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import BaseTemplate from './BaseTemplate';
import UploadContainer from '../containers/upload/UploadContainer';
import { selectorStateType, useAppSelector } from '../hooks';

interface fromReducerType{
    user: USER|null
}
type props = RouteComponentProps
const UploadPage: React.FC<props> = ({ history }: props) => {
    const {
        user,
    }: fromReducerType = useAppSelector(((state: selectorStateType) => ({
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
