/* eslint-disable no-unused-vars */
import Loader from 'react-js-loader';

export const LoaderFile = () => {
    return (
        <div className={'row'}>
            <div className={'item'}>
                <Loader type="bubble-scale" bgColor={'#2065d1'} size={50} />
            </div>
        </div>
    );
};
