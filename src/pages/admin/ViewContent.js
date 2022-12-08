/* eslint-disable no-unused-vars */
import React from 'react';
import ReactHtmlParser from 'react-html-parser';

function ViewContent() {
    let content = localStorage.getItem('content');
    return <div>{ReactHtmlParser(content)}</div>;
}

export default ViewContent;
