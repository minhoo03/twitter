// 전체 로직을 다루는 application
// fbase의 auth를 받아와 true/false를 state에 담아 props로 전송

import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import {authService} from "fbase"

// authService.currentUser : 로그인 여부에 따라 true / false
// firebase 로드 시간 탓에 false 결과 => useEffect에 따라 true
function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser) // 로그인 유저 or null
  console.log(authService.currentUser)

  // mount - 사용자 변경 상태 확인 후 user에 담음
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true)
      } else{
        setIsLoggedIn(false)
      }
      setInit(true)
      console.log(authService.currentUser)
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
