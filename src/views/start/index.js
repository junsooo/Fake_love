import React from 'react';
import { browserHistory } from 'react-router';

import style from './style.css';

const Start = () => (
    <div className={style.flex}>
        <div className={style.wrap}>
            <div className={style.header}>
                심리학과 17학번
            </div>
            <div className={style.content}>
                나를 썼을 때, <br />
                언제나 그녀가 있었다.
            </div>
            <button 
                className={style.button}
                onClick={() => browserHistory.push('/chat/friend')}>
                시작
            </button>
        </div>
    </div>
)

export default Start;