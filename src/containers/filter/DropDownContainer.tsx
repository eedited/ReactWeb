import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import DropDown from '../../components/common/DropDown/DropDown';

interface dropDownProp{
    id: number,
    title: string,
    selected: boolean,
    key: string
    set: string
}
interface props extends RouteComponentProps{
    imgSrc: string
    DDidx: number
    initialStateFilter: dropDownProp[][]
}
const DropDownContainer: React.FC<props> = ({ DDidx, initialStateFilter, imgSrc, history }: props) => {
    const [isListOpen, setIsListOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false as boolean);
    const selectItem: (item: dropDownProp) => void = (item: dropDownProp) => {
        setIsListOpen(false);
        const paramName: string[] = ['category', 'platform', 'program', 'sorting'];
        let pushString: string = '/videos';
        let ch: boolean = false;
        for (let i: number = 0; i < 4; i += 1) {
            let concat: string = '&';
            if (i !== DDidx) {
                const tempStr: dropDownProp|undefined = initialStateFilter[i].find((x: dropDownProp) => x.selected === true);
                if (tempStr && tempStr.set !== 'all') {
                    if (ch === false) {
                        concat = '?'; ch = true;
                    }
                    pushString += `${concat + paramName[i]}=${tempStr.set}`;
                }
            }
            else if (item.set !== 'all') {
                if (ch === false) {
                    concat = '?'; ch = true;
                }
                pushString += `${concat + paramName[i]}=${item.set}`;
            }
        }
        history.push(pushString);
    };
    return (
        <DropDown
            ddItem={initialStateFilter[DDidx]}
            isListOpen={isListOpen}
            imgSrc={imgSrc}
            selectItem={selectItem}
            clickTitle={() => setIsListOpen(!isListOpen)}
        />
    );
};

export default withRouter(DropDownContainer);
