import React from 'react';
import { Link } from 'react-router-dom';

interface props{
    type: string
    form: {
        username: string,
        password: string,
        passwordConfirm?: string
    }
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=> void
    onSubmit: (e: React.FormEvent<HTMLFormElement>)=> void
}
interface textMapType{
    [type: string]: string
}
const textMap: textMapType = {
    login: '로그인',
    register: '회원가입',
};
const AuthForm: React.FC<props> = ({
    type, form, onChange, onSubmit,
}: props) => (
    <div>
        <form onSubmit={onSubmit}>
            <div>
                <h2>id:</h2>
                <input
                    type="email"
                    placeholder="아이디"
                    name="username"
                    value={form.username}
                    onChange={onChange}
                />
            </div>
            <div>
                <h2>passwd:</h2>
                <input
                    type="password"
                    placeholder="비밀번호"
                    name="password"
                    value={form.password}
                    onChange={onChange}
                />
            </div>
            {type === 'register' && (
                <div>
                    <h2>passwd confirm:</h2>
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        name="passwordConfirm"
                        value={form.passwordConfirm}
                        onChange={onChange}
                    />
                </div>
            )}
            <button type="submit">{textMap[type]}</button>
        </form>
        {type === 'login' ? (<Link to="/signup">회원가입</Link>) : (<Link to="/login">로그인</Link>)}
    </div>
);

export default AuthForm;
