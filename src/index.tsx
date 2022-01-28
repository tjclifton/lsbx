import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { FacebookSdk, StoryblokApp } from '@tjclifton/storyblok-react-utils';
import invariant from 'ts-invariant';

import 'fomantic-ui-css/semantic.min.css';

import '@styles/index.css';
import '@styles/fomantic-overrides.sass';

const {
  REACT_APP_STORYBLOK_TOKEN: token,
  REACT_APP_STORYBLOK_VERSION: version
} = process.env;

invariant(token, 'Missing REACT_APP_STORYBLOK_TOKEN');
invariant(version, 'Missing REACT_APP_STORYBLOK_VERSION');
invariant(version === 'draft' || version === 'published', 'REACT_APP_STORYBLOK_VERSION can be either "draft" or "published"');

ReactDOM.render(
  <React.StrictMode>
    <StoryblokApp token={token} version={version}>
      <FacebookSdk sdkUrl={process.env.FACEBOOK_SDK_URL as `https://connect.facebook.net/${string}`}>
        <App />
      </FacebookSdk>
    </StoryblokApp>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
