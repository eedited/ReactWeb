import React, { useEffect, useState } from 'react';
import { AnyAction } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router';
import Navbar from '../../components/common/Navbar/Navbar';
import { userAction } from '../../redux/user/user';
import { selectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { userType } from '../../redux/user/userType';

interface props{
    history: RouteComponentProps['history']
}
interface userContainerType{
    User: userType|null
    logoutError: Error|null
}

const NavbarContainer: React.FC<props> = ({ history }: props) => {
    const { User, logoutError }: userContainerType = useAppSelector((state: selectorStateType) => ({
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
    useEffect(() => {
        if (logoutError) {
            alert(logoutError);
        }
    }, [logoutError]);
    return (
        <Navbar
            user={User}
            onLogout={onLogout}
            onLogin={onLogin}
            onSignup={onSignup}
            isSearchClick={isSearchClick}
            onSearchClick={() => {
                setIsSeacrhClick(!isSearchClick);
            }}
        />
    );
};

export default withRouter(NavbarContainer);
