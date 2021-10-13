import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import DropDown from '../../components/common/dropDown/DropDown';

interface props extends RouteComponentProps{
    imgSrc: string
    DDidx: number
    initialStateFilter: DropDownProp[][]
    isReady: boolean
}
const DropDownContainer: React.FC<props> = ({ DDidx, initialStateFilter, imgSrc, history, isReady }: props) => {
    const [isListOpen, setIsListOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false as boolean);
    const selectItem: (item: DropDownProp) => void = (item: DropDownProp) => {
        setIsListOpen(false);
        const paramName: string[] = ['category', 'platform', 'program', 'sorting'];
        let pushString: string = '/videos';
        let ch: boolean = false;
        for (let i: number = 0; i < 4; i += 1) {
            let concat: string = '&';
            if (i !== DDidx) {
                // eslint-disable-next-line no-loop-func
                const tempStr: DropDownProp|undefined = initialStateFilter[i].find((x: DropDownProp) => x.selected === true);
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
            selectItem={isReady ? selectItem : (item: DropDownProp) => {}}
            clickTitle={isReady ? () => setIsListOpen(!isListOpen) : () => {}}
            isReady={isReady}
        />
    );
};

export default withRouter(DropDownContainer);
