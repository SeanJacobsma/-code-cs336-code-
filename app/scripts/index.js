import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import WeeklyCalendar from './WeeklyCalendar';
import TaskEdit from './TaskEdit';

import '../css/base.css';




ReactDOM.render((
        <Router history={browserHistory}>
            <Route path="/" component={WeeklyCalendar}/>
            <Route path="/:id" component = {TaskEdit}/>
        </Router>
    ), document.getElementById('content')
);
