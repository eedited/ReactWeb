import React, { useState } from 'react';
import './DropDown.scss';

interface dropDownProp{
    id: number,
    title: string,
    selected: boolean,
    key: string
    set: string
}
interface props{
    className?: string
    ddItem: dropDownProp[]
    isListOpen: boolean
    imgSrc: string
    clickTitle: () => void
    selectItem: (item: dropDownProp) => void
}
const DropDown: React.FC<props> = ({
    className, ddItem, imgSrc, clickTitle, selectItem, isListOpen,
}: props) => (
    <div className="dropDown">
        <button className="dropDown__header dropDown__item" onClick={clickTitle} type="button">
            <div className="dropDown__header__title">
                <div className="dropDown__header__title__flexFirst">
                    <img className="dropDown__header__title__icon" src={imgSrc} alt="img" />
                    {ddItem.find((item: dropDownProp) => item.selected === true)?.title}
                </div>
                <img className="dropDown__haeder__title__toggle" src="/icons/toggle-arrow.png" alt="toggle" />
            </div>
        </button>
        {isListOpen
            && (
                <div className="dropDown__list">
                    {ddItem.map((item: dropDownProp, idx: number) => {
                        let name: string = 'dropDown__list__item dropDown__item';
                        if (idx === 0) {
                            name += ' dropDown__list__first';
                        }
                        if (idx === ddItem.length - 1) {
                            name += ' dropDown__list__last';
                        }
                        return (<button type="button" className={name} onClick={() => selectItem(item)}>{item.title}</button>);
                    })}
                </div>
            )}
    </div>
);
DropDown.defaultProps = {
    className: '',
};
export default DropDown;
