import React from 'react';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';

const ApiBasePath = 'http://localhost:2020/api';

const Api = (method, uri, params) => {
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: ApiBasePath + uri,
            data: params
        }).then(res => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
};

export default Api;