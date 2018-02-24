'use strict';

import axios from 'axios';

export const FETCH_CONTENTS = 'FETCH_CONTENTS';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_POST_DETAIL = 'FETCH_POST_DETAIL';

const ROOT_URL = 'http://127.0.0.1:3003/api/cms';


exports.fetchContents = () => {
  const request = axios.get(ROOT_URL, {
    headers: {
      'token': JSON.parse(localStorage.getItem('token'))
    }
  });

  return {
    type: FETCH_CONTENTS,
    payload: request
  }
};

exports.fetchContentsDetail = (idx) => {
  const request = axios.get(`${ROOT_URL}/${idx}`, {
    headers: JSON.parse(localStorage.getItem('token'))
  });

  return {
    type: FETCH_POST_DETAIL,
    payload: request
  }
};


exports.createContent = (props) => {
  const request = axios.post(`${ROOT_URL}/register`, props,
    {
      headers: {
        'token': JSON.parse(localStorage.getItem('token'))
      }
    });

  return {
    type: FETCH_POST,
    payload: request
  }
};