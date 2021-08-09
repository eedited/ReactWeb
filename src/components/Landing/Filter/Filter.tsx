import React from 'react';
import DropDownContainer from '../../../containers/filter/DropDownContainer';
import './Filter.scss';

interface dropDownProp{
    id: number,
    title: string,
    selected: boolean,
    key: string
    set: string
}
interface props{
    imgSrc: string[]
    initialDD: dropDownProp[][]
}

const Filter: React.FC<props> = ({ imgSrc, initialDD }: props) => (
    <div className="filter">
        {
            imgSrc.map((item: string, idx: number) => <DropDownContainer imgSrc={item} initialStateDD={initialDD[idx]} key={item} />)
        }
    </div>
);

export default Filter;
