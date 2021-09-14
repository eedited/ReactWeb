import React, { useState } from 'react';
import { AnyAction } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router';
import Navbar from '../../components/common/Navbar/Navbar';
import { userAction } from '../../redux/user/user';
import { SelectorStateType, useAppDispatch, useAppSelector } from '../../hooks';

interface Props {
    history: RouteComponentProps['history']
}
interface UserContainerType {
    User: User | null
    logoutError: RDXUserModule.LogoutFailureResonse | null
}

const NavbarContainer: React.FC<Props> = ({ history }: Props) => {
    const { User, logoutError }: UserContainerType = useAppSelector((state: SelectorStateType) => ({
        User: state.userReducer.user,
        logoutError: state.userReducer.logoutError,
    }));
    const [isSearchClick, setIsSeacrhClick]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false as boolean);

    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();

    const onLogout: () => void = () => {
        dispatch(userAction.logout());
    };

    const onLogin: () => void = () => {
        history.push('/login');
    };

    const onSignup: () => void = () => {
        history.push('/signup');
    };

    const onUpload: () => void = () => {
        history.push('/upload');
    };

    return (
        <Navbar
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
