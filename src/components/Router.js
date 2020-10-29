// app의 요청에 따라 길을 터줌

import React from 'react'
import { Redirect } from 'react-router-dom'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Auth from '../router/Auth'
import Home from '../router/Home'
import Navigation from 'components/Navigation'
import Profile from 'router/Profile'
// switch : 하위 라우터 중 하나 고른다

// app.js의 props로 인해 페이지 이동
const AppRouter = ({isLoggedIn, userObj}) => {
    return(
        <Router>
            {/* isLoggedIn == true == Nav */}
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? 
                <>
                    <Route exact path='/'>
                        <Home userObj={userObj} />
                    </Route>

                    <Route exact path='/profile'>
                        <Profile />
                    </Route>
                </>
                : 
                <>
                    <Route exact path='/'>
                        <Auth />
                    </Route> 
                </>
                } 
            </Switch>
        </Router>
    )
}
export default AppRouter