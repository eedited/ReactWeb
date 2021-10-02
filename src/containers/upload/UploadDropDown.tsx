import React, { useState, useCallback } from 'react';
import { AnyAction } from 'redux';
import DropDown from '../../components/common/DropDown/DropDown';
import { SelectorStateType, useAppDispatch, useAppSelector } from '../../hooks';
import { filterAction } from '../../redux/filter/filter';

interface FromReducerType {
    dropDownState: DropDownProp[]
}
const UploadDropDown: React.FC = () => {
    const [isListOpen, setIsListOpen]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false as boolean);
    const dispatch: React.Dispatch<AnyAction> = useAppDispatch();
    const {
        dropDownState,
    }: FromReducerType = useAppSelector((state: SelectorStateType) => ({
        dropDownState: state.filterReducer.upload,
    }));
    const selectItem: (item: DropDownProp) => void = useCallback((item: DropDownProp) => {
        setIsListOpen(false);
        dispatch(filterAction.setUpload({ set: item.set }));
    }, [dispatch]);
    return (
        <DropDown
            ddItem={dropDownState}
            isListOpen={isListOpen}
            imgSrc="/icons/category-icon.png"
            selectItem={selectItem}
            clickTitle={() => setIsListOpen(!isListOpen)}
        />
    );
};

export default UploadDropDown;
