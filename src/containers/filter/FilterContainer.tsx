import React from 'react';
import Filter from '../../components/landing/filter/Filter';

interface DropDownProp {
    id: number,
    title: string,
    selected: boolean,
    key: string
    set: string
}

const FilterContainer: React.FC = () => {
    const imgSrc: string[] = [
        '/icons/category-icon.png',
        '/icons/platform-icon.png',
        '/icons/app-icon.png',
        '/icons/order-icon.png',
    ];
    const initialDD: DropDownProp[][] = [
        [
            {
                id: 0,
                title: '모든 카테고리',
                selected: true,
                key: 'category',
                set: 'all',
            },
        ],
        [
            {
                id: 1,
                title: '모든 플랫폼',
                selected: true,
                key: 'platform',
                set: 'all',
            },
        ],
        [
            {
                id: 0,
                title: 'Final Cut Pro',
                selected: true,
                key: 'program',
                set: 'all',
            },
        ],
        [
            {
                id: 0,
                title: '업로드순',
                selected: true,
                key: 'sorting',
                set: 'recent',
            },
            {
                id: 1,
                title: '인기순',
                selected: false,
                key: 'sorting',
                set: 'popular',
            },
        ],
    ];
    return <Filter imgSrc={imgSrc} initialDD={initialDD} />;
};

export default FilterContainer;
