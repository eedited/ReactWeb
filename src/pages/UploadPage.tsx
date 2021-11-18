import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import BaseTemplate from './BaseTemplate';
import UploadContainer from '../containers/upload/UploadContainer';
import { SelectorStateType, useAppSelector } from '../hooks';

interface FromReducerType {
    user: AuthRouter.CheckSuccessResponse | null
}
type props = RouteComponentProps;

const UploadPage: React.FC<props> = ({ history }: props) => {
    const {
        user,
    }: FromReducerType = useAppSelector(((state: SelectorStateType) => ({
        user: state.userReducer.user,
    })));

    React.useEffect(() => {
        if (!user) {
            history.push('/');
        }
        else if (user.emailToken !== '') {
            alert('이메일 확인을 마쳐야 이용하실 수 있습니다!');
            history.push(`/profile?userId=${user.userId}`);
        }
    }, [history, user]);
    return (
        <BaseTemplate>
            <UploadContainer user={user} />
        </BaseTemplate>
    );
};

export default withRouter(UploadPage);
