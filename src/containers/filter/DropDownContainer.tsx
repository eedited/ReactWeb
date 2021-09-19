import React, { useState } from 'react';
import DropDown from '../../components/common/DropDown/DropDown';

interface DropDownProp {
    id: number,
    title: string,
    selected: boolean,
    key: string
    set: string
}
interface Props {
    imgSrc: string
    initialStateDD: DropDownProp[]
}

const DropDownContainer: React.FC<Props> = ({ initialStateDD, imgSrc }: Props) => {
    const [ddItem, setDD]: [DropDownProp[], React.Dispatch<React.SetStateAction<DropDownProp[]>>] = useState<DropDownProp[]>(initialStateDD);
    const [isListOpen, setIsListOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false as boolean);
    const selectItem: (item: DropDownProp) => void = (item: DropDownProp) => {
        setIsListOpen(false);
        let temp: DropDownProp[] = [...ddItem];
        temp = temp.map((x: DropDownProp) => ({
            ...x,
            selected: false,
        }));
        temp = temp.map((x: DropDownProp) => {
            if (x.id === item.id) {
                return {
                    ...x,
                    selected: true,
                };
            }
            return x;
        });
        setDD(temp);
    };

    return (
        <DropDown
            ddItem={ddItem}
            isListOpen={isListOpen}
            imgSrc={imgSrc}
            selectItem={selectItem}
            clickTitle={() => setIsListOpen(!isListOpen)}
        />
    );
};

export default DropDownContainer;
