import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import moment from 'moment';

import Chat from './views/chat';
import Start from './views/start';

import style from './style.css';

const MenuItem = ({ content }) => (
    <li>
        <a href="#" className={style.item}>
            {content}
        </a>
    </li>
);

const Layout = () => (
    <Router history={browserHistory}>
        <Route path="/">
            <IndexRoute component={Start} />
            <Route path="/chat/:mode" component={Chat} />
        </Route>
    </Router>
);

render(<Layout />, document.getElementById("fakeLove"));