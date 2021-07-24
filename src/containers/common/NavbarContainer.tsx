import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import Navbar from '../../components/common/Navbar/Navbar';
import { userType } from '../../modules/user/userType';
import { rootActionType, rootStateType } from '../../modules';
import { logout } from '../../modules/user/user';

interface props{
    children?: React.ReactNode
}
interface userContainerType{
    User: userType|null
}

const NavbarContainer: React.FC<props> = ({ children }: props) => {
    const { User }: userContainerType = useSelector(({ user }: rootStateType) => ({ User: user.user }));
    const dispatch: Dispatch<rootActionType> = useDispatch();
    const onLogout: ()=> void = () => {
        dispatch(logout());
    };
    return <Navbar user={User} onLogout={onLogout} />;
};

NavbarContainer.defaultProps = {
    children: '',
};
export default NavbarContainer;
