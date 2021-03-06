// 3.6 Reacp 다시보기

// 전체 로직을 다루는 application
// fbase의 auth를 받아와 true/false를 state에 담아 props로 전송

import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import {authService} from "fbase"

function App() {

  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser) // 로그인 유저 or null
  const [userObj, setUserObj] = useState(null)

  // mount - 사용자 변경 상태 확인 후 user에 담음

  // Auth 변화 => state 저장
  // Obj가 너무 커 리렌더링에 오류 => 필요한 obj만 받음
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true)
        setUserObj({
          displayName : user.displayName,
          uid : user.uid,
          updateProfile : (args) => user.updateProfile(args)
        })
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
  }, [])

  // updateProfile -> fbase의 user 새로고침 : currentUser 재확인 끝
  const refreshUser = () => {
    const user = authService.currentUser
    setUserObj({
      displayName : user.displayName,
      uid : user.uid,
      updateProfile : (args) => user.updateProfile(args)
    })
  }
  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj} /> : "Loading..."}
      {/* <footer>&copy; {new Date().getFullYear()} Twitter 20306 김민후</footer> */}
    </>
  );
}

export default App;
