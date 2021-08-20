import React from 'react';
import { TAG, VideoTag } from '../../library/api/video';
import './LargeVideoDescription.scss';

interface props {
    description: string
    tags: TAG[]
}

const LargeVideoDescription: React.FC<props> = ({ description, tags }: props) => (
    <div className="LargeVideoDescription">
        <div className="LargeVideoDescription__txt">
            { description.split('\n').map((line: string) => (
                <>
                    {line}
                    <br />
                </>
            )) }
        </div>
        <div className="LargeVideoDescription__tags">
            {tags.map((tag: TAG) => (<div className="LargeVideoDescription__tag" key={tag.id}>{tag.name}</div>))}
        </div>
    </div>
);

export default LargeVideoDescription;
