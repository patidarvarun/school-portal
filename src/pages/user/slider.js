import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const Example = ({ slider }) => {
    let image = slider;
    const result = image?.split(',')[0];
    const result1 = image?.split(',')[1];
    const result2 = image?.split(',')[2];

    // const images = [{ 0: result.splice(0, 2), 1: result1, 2: result2 }];

    // console.log('@#############', userData?.slider);
    // console.log('!!!!!!!!!!!!!!!!!', images);
    return (
        <Slide>
            {/* <div className="each-slide-effect">
                <div style={{ backgroundImage: `url(${slider[0]})`, width: '100%', height: '500px' }}>
                    <span>Slide 1</span>
                </div>
            </div>
            <div className="each-slide-effect">
                <div style={{ backgroundImage: `url(${slider[1]})`, width: '100%', height: '500px' }}>
                    <span>Slide 2</span>
                </div>
            </div>
            <div className="each-slide-effect">
                <div style={{ backgroundImage: `url(${slider[2]})`, width: '100%', height: '500px' }}>
                    <span>Slide 3</span>
                </div>
            </div> */}
        </Slide>
    );
};

export default Example;
