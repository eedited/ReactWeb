import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';

interface Props{
    categories: {[key: string]: number}
    className?: string
    profile: string
}
const filterArray: string[] = ['vlog', 'vRadio', 'sports', 'game', 'it', 'review', 'beauty', 'etc'];
const mapName: {[key: string]: string} = {
    vlog: '브이로그',
    vRadio: '보이는 라디오',
    game: '게임',
    it: 'it',
    review: '리뷰',
    beauty: '뷰티',
    sports: '스포츠',
    etc: '기타',
};
const RadarGraph: React.FC<Props> = ({ categories, className, profile }: Props) => {
    const categoryArray: {key: string, category: number}[] = Object.entries(categories).map((item: [string, number]) => ({
        key: item[0], category: item[1],
    }));
    for (let i: number = 0; i < filterArray.length; i += 1) {
        let j: number = 0;
        for (j = 0; j < categoryArray.length; j += 1) {
            if (categoryArray[j].key === filterArray[i]) break;
        }
        if (j === categoryArray.length) {
            categoryArray.push({ key: filterArray[i], category: 0 });
        }
    }
    for (let i: number = 0; i < categoryArray.length; i += 1) {
        categoryArray[i].key = mapName[categoryArray[i].key];
    }
    return (
        <ResponsiveRadar
            data={categoryArray}
            keys={['category']}
            indexBy="key"
            valueFormat=">-.2f"
            margin={{ top: 70, right: 100, bottom: 40, left: 100 }}
            borderColor={{ from: 'color' }}
            gridLabelOffset={36}
            dotSize={10}
            dotColor={{ theme: 'background' }}
            dotBorderWidth={2}
            colors={{ scheme: 'nivo' }}
            blendMode="multiply"
            motionConfig="wobbly"
            legends={[
                {
                    anchor: 'top-left',
                    direction: 'column',
                    translateX: -50,
                    translateY: -40,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemTextColor: '#999',
                    symbolSize: 12,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000',
                            },
                        },
                    ],
                },
            ]}
        />

    );
};
RadarGraph.defaultProps = {
    className: '',
};

export default RadarGraph;
