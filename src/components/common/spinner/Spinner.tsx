import React from 'react';
import './Spinner.scss';

interface Props{
    loading: boolean
}
const Spinner: React.FC<Props> = ({ loading }: Props) => (
    <>
        {loading && <div className="spinner__wrapper"><div className="spinner" /></div>}
    </>
);
export default Spinner;
