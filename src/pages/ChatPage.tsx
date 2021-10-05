/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';

type Props=RouteComponentProps
const ChatPage: React.FC<Props> = ({ history }: Props) => (

    <img
        src="/ploaceholder_page/eedited-chat.jpg"
        alt="chat placeholder"
        style={{ width: '100%', cursor: 'pointer' }}
        onClick={() => {
            history.go(-1);
        }}
    />
);

export default withRouter(ChatPage);
