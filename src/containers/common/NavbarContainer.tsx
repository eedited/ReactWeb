import React, { useState, useEffect } from 'react';
import { AnyAction } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router';
import Navbar, { ModalTriggerType } from '../../components/common/Navbar/Navbar';
import { userAction } from '../../redux/user/user';
import { SelectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import useWindowSize, { windowSizeType } from '../../hooks/useWindowSize';

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
    const windowSize: windowSizeType = useWindowSize();
    const [isSearchClick, setIsSeacrhClick]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false as boolean);
    const [isHambergerClick, setIsHambergerClick]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false as boolean);
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
    const onHambergerClick: () => void = () => {
        setIsHambergerClick((prev: boolean) => !prev);
    };
    return (
        <Navbar
            ModalTrigger={ModalTrigger}
            user={User}
            onLogout={onLogout}
            onLogin={onLogin}
            onSignup={onSignup}
            onUpload={onUpload}
            isSearchClick={isSearchClick && ((windowSize.width !== undefined && windowSize.width > 1400) || windowSize.width === undefined)}
            onSearchClick={() => {
                if (windowSize.width && windowSize.width <= 1400) {
                    setIsSeacrhClick(false);
                    history.push('/404NotFound');
                }
                else setIsSeacrhClick(!isSearchClick);
            }}
            isHambergerClick={isHambergerClick}
            onHambergerClick={onHambergerClick}
        />
    );
};

export default withRouter(NavbarContainer);
