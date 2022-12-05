/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import ReactLoading from 'react-loading';

const Example = ({ type, color }) => (
    <Fragment>
        <div style={{ display: 'flex' }}>
            <ReactLoading type={'spin'} color={'rgb(255, 255, 255)'} height={28} width={28} className="loader" />
            {/* <div
                style={{
                    margin: '0 auto',
                    marginTop: '2.2em'
                }}
            >
                <p style={{ fontSize: 'larger', color: 'rgb(104, 143, 78)' }}>Wait a moment ...</p>
            </div> */}
        </div>
    </Fragment>
);
export default Example;
