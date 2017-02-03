import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import Diary from './views/diary';

import style from './style.css';

const MenuItem = ({ content }) => (
    <li>
        <a href="#" className={style.item}>
            {content}
        </a>
    </li>
)

const Layout = () => (
    <div className={style.wrap}>
        <div className={style.left}>
            <div className={style.content}>
                <h1 className={style.heading}>가짜사랑</h1>
                <ul className={style.nav}>
                    <MenuItem content="일기쓰기♥" />
                    <MenuItem content="대하여♥" />
                </ul>
            </div>
        </div>
        <div className={style.right}>
            <div className={style.content}>
                <Diary />
            </div>
        </div>
    </div>
);

ReactDOM.render(<Layout />, document.getElementById("fakeLove"));