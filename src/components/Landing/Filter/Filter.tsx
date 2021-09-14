import React from 'react';
import DropDownContainer from '../../../containers/filter/DropDownContainer';
import './Filter.scss';

interface DropDownProp {
    id: number,
    title: string,
    selected: boolean,
    key: string
    set: string
}
interface Props {
    imgSrc: string[]
    initialDD: DropDownProp[][]
}

const Filter: React.FC<Props> = ({ imgSrc, initialDD }: Props) => (
    <div className="filter">
        {
            imgSrc.map((item: string, idx: number) => <DropDownContainer imgSrc={item} initialStateDD={initialDD[idx]} key={item} />)
        }
    </div>
);

export default Filter;
