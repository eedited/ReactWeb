import React from 'react';
import Protal from '../../hooks/Protal';
import LoginOverlayContainer from './LoginOverlayContainer';
import SignupOverlayContainer from './SignupOverlayContainer';

interface Props{
    backgroundClicked: () => void
    type: 'login'|'signup'
    title?: (type: string) => string
}

const AuthProtal: React.FC<Props> = ({ backgroundClicked, title, type }: Props) => {
    const [authType, setAuthType]: ['login'|'signup', React.Dispatch<React.SetStateAction<'login'|'signup'>>] = React.useState<'login'|'signup'>(type);
    const setType: (t: 'login'|'signup') => void = (t: 'login'|'signup') => {
        setAuthType(t);
    };
    return (
        <Protal elementId="modal-root">
            {authType === 'login'
                ? <LoginOverlayContainer backgroundClicked={backgroundClicked} title={title} setType={setType} />
                : <SignupOverlayContainer backgroundClicked={backgroundClicked} title={title} setType={setType} />}
        </Protal>
    );
};

AuthProtal.defaultProps = {
    title: (type: string) => type.toUpperCase(),
};

export default AuthProtal;
