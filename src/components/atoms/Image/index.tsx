import React from 'react';

interface PropType{
    src: string,
    alt?: string
}
type ImageType = React.FC<PropType>
const Image: ImageType = ({ src, alt }: PropType) => (
    <img src={src} alt={alt} />
);
Image.defaultProps = {
    alt: '',
};

export default Image;
