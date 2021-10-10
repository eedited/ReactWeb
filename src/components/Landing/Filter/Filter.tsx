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
        <DropDownContainer imgSrc={imgSrc[0]} DDidx={0} initialStateFilter={initialDD} isReady />
        <DropDownContainer imgSrc={imgSrc[1]} DDidx={1} initialStateFilter={initialDD} isReady={false} />
        <DropDownContainer imgSrc={imgSrc[2]} DDidx={2} initialStateFilter={initialDD} isReady={false} />
        <DropDownContainer imgSrc={imgSrc[3]} DDidx={3} initialStateFilter={initialDD} isReady />
        {/* {
            imgSrc.map((item: string, idx: number) => <DropDownContainer imgSrc={item} DDidx={idx} initialStateFilter={initialDD} key={item} />)
        } */}
    </div>
);

export default Filter;
