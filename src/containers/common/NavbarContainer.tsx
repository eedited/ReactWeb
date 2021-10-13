import React, { useState, useEffect, useCallback } from 'react';
import { AnyAction } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router';
import Navbar, { ModalTriggerType } from '../../components/common/navbar/Navbar';
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
    const forceUpdate: () => void = React.useReducer(() => ({}), {})[1] as () => void;
    const windowSize: windowSizeType = useWindowSize();
    const [isSearchClick, setIsSeacrhClick]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false as boolean);
    const [isHambergerClick, setIsHambergerClick]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false as boolean);
    const [searchInput, setSearchInput]: [string, React.Dispatch<React.SetStateAction<string>>] = useState<string>('');
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
    const onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };
    const onKeyPressSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            history.push(`/search?q=${searchInput}`);
            setIsSeacrhClick(false);
        }
    }, [history, searchInput]);
    const onClickSearch: () => void = () => {
        if (windowSize.width && windowSize.width <= 1400) {
            setIsSeacrhClick(false);
            history.push('/search');
        }
        else setIsSeacrhClick(!isSearchClick);
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
            isHambergerClick={isHambergerClick}
            onHambergerClick={onHambergerClick}
            onSearchChange={onSearchChange}
            searchInput={searchInput}
            onKeyPressSearch={onKeyPressSearch}
            onClickSearch={onClickSearch}
        />
    );
};

export default withRouter(NavbarContainer);
