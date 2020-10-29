// 전체 로직을 다루는 application
// fbase의 auth를 받아와 true/false를 state에 담아 props로 전송

import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import {authService} from "fbase"

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser) // 로그인 유저 or null
  // console.log(authService.currentUser)

  // mount - 사용자 변경 상태 확인 후 user에 담음
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true)
        console.log('로그인')
      } else{
        setIsLoggedIn(false)
        console.log('비로그인')
      }
      setInit(true)
      // 1. init : false로 인해 Init...
      // 2. 렌더링 후 else문 -> setInit(true)
      // 3. 삼항연산자 > Router.js > auth.js
      // 4. 로그인 시 isLoggedIn : true > Router.js > Home.js
    })
  })
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing"}
      <footer>&copy; {new Date().getFullYear()} Twitter</footer>
    </>
  );
}

export default App;
