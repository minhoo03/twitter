// app의 요청에 따라 길을 터줌

import React, { useState } from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Auth from '../router/Auth'
import Home from '../router/Home'
// switch : 하위 라우터 중 하나 고른다

// app.js의 props로 인해 페이지 이동
const AppRouter = ({isLoggedIn}) => {
    return(
        <Router>
            <Switch>
                {isLoggedIn ? 
                <>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                </>
                : <Route exact path='/'>
                    <Auth />
                </Route> }
            </Switch>
        </Router>
    )
}
export default AppRouter

// npx create-react-app
// npm install --save firebase

// key 설정 env
// npm install react-router-dom

// 로그인 / 비로그인 (true 값 따져서) ROUTER 

// Auth 설정으로 로그인 폼