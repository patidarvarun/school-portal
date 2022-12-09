/* eslint-disable no-unused-vars */
import React, { Component } from 'react';

export default function authHeader() {
    const user = localStorage.getItem('token');
    let adminToken = JSON.parse(user);
    if (user) {
        return { Authorization: `Bearer ${adminToken.token}` };
    } else {
        return {};
    }
}
