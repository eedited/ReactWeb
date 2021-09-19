import React, { useState } from 'react';
import { AnyAction } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router';
import Navbar, { ModalTriggerType } from '../../components/common/Navbar/Navbar';
import { userAction } from '../../redux/user/user';
import { selectorStateType, useAppDispatch, useAppSelector } from '../../hooks';

interface props{
    history: RouteComponentProps['history']
}
interface userContainerType{
    User: USER|null
    logoutError: userModule.logoutFailureResonse|null
}

const NavbarContainer: React.FC<props> = ({ history }: props) => {
    const { User, logoutError }: userContainerType = useAppSelector((state: selectorStateType) => ({
        User: state.userReducer.user,
        logoutError: state.userReducer.logoutError,
    }));
    const [isSearchClick, setIsSeacrhClick]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false as boolean);
    const [ModalTrigger, setModalTrigger]: [ModalTriggerType, React.Dispatch<React.SetStateAction<ModalTriggerType>>] = useState<ModalTriggerType>({
        isModalOn: false,
        type: 'login',
    });
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const onLogout: () => void = () => {
        dispatch(userAction.logout());
    };
    const onLogin: () => void = () => {
        setModalTrigger((prevState: ModalTriggerType) => ({
            isModalOn: !prevState.isModalOn,
            type: 'login',
        }));
    };
    const onSignup: () => void = () => {
        setModalTrigger((prevState: ModalTriggerType) => ({
            isModalOn: !prevState.isModalOn,
            type: 'signup',
        }));
    };
    const onUpload: () => void = () => {
        history.push('/upload');
    };
    /*    useEffect(() => {
        if (logoutError) {
            alert(logoutError);
        }
    }, [logoutError]); */
    return (
        <Navbar
            ModalTrigger={ModalTrigger}
            user={User}
            onLogout={onLogout}
            onLogin={onLogin}
            onSignup={onSignup}
            onUpload={onUpload}
            isSearchClick={isSearchClick}
            onSearchClick={() => {
                setIsSeacrhClick(!isSearchClick);
            }}
        />
    );
};

export default withRouter(NavbarContainer);
