import React from 'react';
import './FilterElement.scss';

interface props{
    name: string,
    checkboxes?: string[] | null,
    searchbox?: string | null,
    selectbox?: string[] | null
}

const FilterElement: React.FC<props> = ({ name, checkboxes, searchbox, selectbox }: props) => (
    <div className="jobFilter__element">
        <div className="jobFilter__element__title">{name}</div>
        {
            checkboxes
            && checkboxes.map((e: string) => (
                <div>
                    <input type="checkbox" className="jobFilter__element__checkbox" />
                    {' '}
                    {e}
                </div>
            ))
        }
        {
            searchbox && <input className="jobFilter__element__searchbox" placeholder={searchbox} />
        }
        {
            selectbox && <div className="jobFilter__element__selectbox">{selectbox[0]}</div>
        }
    </div>
);

FilterElement.defaultProps = {
    checkboxes: null,
    searchbox: null,
    selectbox: null,
};

export default FilterElement;
