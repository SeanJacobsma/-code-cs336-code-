import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import CommentBox from './CommentBox';

import '../css/base.css';




ReactDOM.render((
        <Router history={browserHistory}>
            <Route path="/" component={CommentBox}/>
        </Router>
    ), document.getElementById('content')
);

//<CommentBox url="/api/comments" pollInterval= {2000} />,
