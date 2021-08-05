import React, { useEffect } from 'react';
import { AnyAction } from 'redux';
import Navbar from '../../components/common/Navbar/Navbar';
import { userAction } from '../../modules/user/user';
import { selectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { userType } from '../../modules/user/userType';

interface props{
    children?: React.ReactNode
}
interface userContainerType{
    User: userType|null
    logoutError: Error|null
}

const NavbarContainer: React.FC<props> = ({ children }: props) => {
    const { User, logoutError }: userContainerType = useAppSelector((state: selectorStateType) => ({
        User: state.userReducer.user,
        logoutError: state.userReducer.logoutError,
    }));
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const onLogout: ()=> void = () => {
        dispatch(userAction.logout());
    };
    useEffect(() => {
        if (logoutError) {
            alert(logoutError);
        }
    }, [logoutError]);
    return <Navbar user={User} onLogout={onLogout} />;
};

NavbarContainer.defaultProps = {
    children: '',
};
export default NavbarContainer;