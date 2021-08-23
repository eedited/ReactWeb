import React, { useState } from 'react';
import DropDown from '../../components/common/DropDown/DropDown';

interface dropDownProp{
    id: number,
    title: string,
    selected: boolean,
    key: string
    set: string
}
interface props{
    imgSrc: string
    initialStateDD: dropDownProp[]
}
const DropDownContainer: React.FC<props> = ({ initialStateDD, imgSrc }: props) => {
    const [ddItem, setDD]: [dropDownProp[], React.Dispatch<React.SetStateAction<dropDownProp[]>>] = useState<dropDownProp[]>(initialStateDD);
    const [isListOpen, setIsListOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false as boolean);
    const selectItem: (item: dropDownProp) => void = (item: dropDownProp) => {
        setIsListOpen(false);
        const temp: dropDownProp[] = [...ddItem];
        temp.forEach((x: dropDownProp) => {
            x.selected = false;
        });
        temp.forEach((x: dropDownProp) => {
            if (x.id === item.id) {
                x.selected = true;
            }
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
