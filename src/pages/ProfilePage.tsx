import React from 'react';
import { Link } from 'react-router-dom';
import MyPage from '../components/myPage/MyPage';
import BaseTemplate from './BaseTemplate';

const ProfilePage: React.FC = () => (
    <BaseTemplate>
        <MyPage />
    </BaseTemplate>
);

export default ProfilePage;
