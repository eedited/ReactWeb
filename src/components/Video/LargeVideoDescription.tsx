import React from 'react';
import './LargeVideoDescription.scss';

interface props {
    description: string
    tags: TAG[]
}

const LargeVideoDescription: React.FC<props> = ({ description, tags }: props) => (
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
            {tags.map((tag: TAG) => (<div className="LargeVideoDescription__tag" key={`mykey${tag.id}`}>{tag.name}</div>))}
        </div>
    </div>
);

export default LargeVideoDescription;
