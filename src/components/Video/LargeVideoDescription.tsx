import React from 'react';
import './LargeVideoDescription.scss';

interface Props {
    description: string
    tags: {tagName: string}[]
}

const LargeVideoDescription: React.FC<Props> = ({ description, tags }: Props) => (
    <div className="LargeVideoDescription">
        <div className="LargeVideoDescription__txt">
            { description.split('\n').map((line: string, idx: number) => (
                <div key={`uniquekey${idx * 2}`}>
                    {line}
                    <br />
                </div>
            )) }
        </div>
        <div className="LargeVideoDescription__tags">
            {tags.map((tag: {tagName: string}, idx: number) => (<div className="LargeVideoDescription__tag" key={`mykey${idx * 2}`}>{tag.tagName}</div>))}
        </div>
    </div>
);

export default LargeVideoDescription;
