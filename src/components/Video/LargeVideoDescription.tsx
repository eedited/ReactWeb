import React from 'react';
import './LargeVideoDescription.scss';

interface props {
    description: string
}

const LargeVideoDescription: React.FC<props> = ({ description }: props) => (
    <div className="LargeVideoDescription">
        <div className="LargeVideoDescription__txt">
            { description.split('\n').map((line: string) => (
                <>
                    {line}
                    <br />
                </>
            )) }
        </div>
    </div>
);

export default LargeVideoDescription;
