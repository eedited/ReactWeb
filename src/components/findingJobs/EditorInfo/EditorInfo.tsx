import React from 'react';

interface props{
    name: string,
    protag?: boolean,
    info?: string[],
    isFollowed?: boolean,
    videos?: string[] | null
}

const EditorInfo: React.FC<props> = ({ name, protag, info, isFollowed, videos }: props) => (
    <div className="profile">
        <div>
            <div className="name">{name}</div>
            { protag && <div className="protag" />}
            {
                info
                && info.reduce((rlt: string, value: string) => `${rlt}&middot${value}`, '')
            }
        </div>
        <div>
            <div className={`follow ${isFollowed}`} />
            <div className="message" />
        </div>
        <div>
            {
                videos
                && videos.map((v: string) => <div>v</div>)
            }
        </div>
    </div>
);

EditorInfo.defaultProps = {
    protag: false,
    info: [''],
    isFollowed: false,
    videos: null,
};

export default EditorInfo;
