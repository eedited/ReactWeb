import React from 'react';
import Filter from '../../components/Landing/Filter/Filter';

interface DropDownProp {
    id: number,
    title: string,
    selected: boolean,
    key: string
    set: string
}
interface Props{
    params: string[]
}
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
        {
            id: 1,
            title: '브이로그',
            selected: true,
            key: 'category',
            set: 'vlog',
        },
        {
            id: 2,
            title: '게임',
            selected: true,
            key: 'category',
            set: 'game',
        },
        {
            id: 3,
            title: '뷰티',
            selected: true,
            key: 'category',
            set: 'beauty',
        },
    ],
    [
        {
            id: 0,
            title: '모든 플랫폼',
            selected: true,
            key: 'platform',
            set: 'all',
        },
        {
            id: 1,
            title: '유튜브',
            selected: true,
            key: 'platform',
            set: 'youtube',
        },
    ],
    [
        {
            id: 0,
            title: '모든 프로그램',
            selected: true,
            key: 'program',
            set: 'all',
        },
        {
            id: 1,
            title: 'Final Cut Pro',
            selected: true,
            key: 'program',
            set: 'finalCutPro',
        },
    ],
    [
        {
            id: 0,
            title: '업로드순',
            selected: true,
            key: 'sorting',
            set: 'latest',
        },
        {
            id: 1,
            title: '인기순',
            selected: false,
            key: 'sorting',
            set: 'thumbup',
        },
    ],
];
const FilterContainer: React.FC<Props> = ({ params }: Props) => {
    params.forEach((value: string, idx: number) => {
        initialDD[idx] = initialDD[idx].map((x: DropDownProp) => ({
            ...x,
            selected: false,
        }));
        initialDD[idx] = initialDD[idx].map((x: DropDownProp) => {
            if (x.set === params[idx]) {
                return {
                    ...x,
                    selected: true,
                };
            }
            return x;
        });
    });
    return (
        <Filter imgSrc={imgSrc} initialDD={initialDD} />
    );
};

export default FilterContainer;
