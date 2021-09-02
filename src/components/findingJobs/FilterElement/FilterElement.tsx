import React from 'react';
import './FilterElement.scss';

interface props{
    name: string,
    checkboxes?: string[] | null,
    searchbox?: string | null,
    selectbox?: string[] | null
}

const FilterElement: React.FC<props> = ({ name, checkboxes, searchbox, selectbox }: props) => (
    <div className="filter__element">
        <div className="filter__element__title">{name}</div>
        {
            checkboxes
            && checkboxes.map((e: string) => (
                <div>
                    <input type="checkbox" className="checkbox" />
                    {' '}
                    {e}
                </div>
            ))
        }
        {
            searchbox && <input className="searchbox" placeholder={searchbox} />
        }
        {
            selectbox && <div className="selectbox">{selectbox[0]}</div>
        }
    </div>
);

FilterElement.defaultProps = {
    checkboxes: null,
    searchbox: null,
    selectbox: null,
};

export default FilterElement;
