// 전체 로직을 다루는 application
// fbase의 auth를 받아와 true/false를 state에 담아 props로 전송

import React, { useState } from 'react';
import AppRouter from 'components/Router';
import {authService} from "fbase"

// authService.currentUser : 로그인 여부에 따라 true / false
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser) // 로그인 유저 or null
  return (
    <AppRouter isLoggedIn={isLoggedIn}/>
  );
}

export default App;
