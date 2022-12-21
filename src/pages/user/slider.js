import React from 'react';
import SimpleImageSlider from 'react-simple-image-slider';

const Example = ({ slider }) => {
    let image = slider;
    const images = [{ url: image && image[0] }, { url: image && image[1] }, { url: image && image[2] }];

    return (
        <div>
            <SimpleImageSlider width="100%" height="400px" images={images} showBullets={true} showNavs={true} />
        </div>
    );
};

export default Example;
