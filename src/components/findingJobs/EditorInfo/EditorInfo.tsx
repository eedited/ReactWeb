import React from 'react';
import EditorInfoElement from './EditorInfoElement';

const EditorInfo: React.FC = () => (
    <div>
        <EditorInfoElement name="제임스" protag info={['서울 강남구', '파트타임', '브이로그']} />
        <EditorInfoElement name="제임스" protag info={['서울 강남구', '파트타임', '브이로그']} />
        <EditorInfoElement name="제임스" protag info={['서울 강남구', '파트타임', '브이로그']} />
    </div>
);

export default EditorInfo;
