import React, { useState } from 'react';
import AppRouter from 'components/Router';
import {authService} from "fbase"

// 전체 로직을 다루는 application
// router와 연결하여 보낸 값에 따라 페이지 이동
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser) // 로그인 유저 or null
  return (
    <AppRouter isLoggedIn={isLoggedIn}/>
  );
}

export default App;
