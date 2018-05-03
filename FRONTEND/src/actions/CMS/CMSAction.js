'use strict';

import axios from 'axios';

export const FETCH_CONTENTS = 'FETCH_CONTENTS';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_POST_DETAIL = 'FETCH_POST_DETAIL';
export const FETCH_REQUEST_ALLOW_LIST = 'FETCH_REQUEST_ALLOW_LIST';
export const ALLOW_CONTENTS = 'ALLOW_CONTENTS';

const ROOT_URL = 'http://127.0.0.1:9004/api/cms';

const ADMIN_URL = 'http://127.0.0.1:9004/api/admin';

exports.fetchRequestAllowList = () => {
  const request = axios.get(`${ADMIN_URL}/list`, {
    headers : {
      'token': JSON.parse(localStorage.getItem('token'))
    }
  });

  return {
    type: FETCH_REQUEST_ALLOW_LIST,
    payload: request
  }
};


exports.allowContents = (props) => {
  const data = {
    gameIdx: props
  };
  const request = axios.post(`${ADMIN_URL}/allow`, data, {
    headers: {
      'token': JSON.parse(localStorage.getItem('token'))
    }
  });

  return {
    type: ALLOW_CONTENTS,
    payload: request
  }
};

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
    headers: {
      'token': JSON.parse(localStorage.getItem('token'))
    }
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