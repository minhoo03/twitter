// 로그인 되지 않았을 시

import { authService } from 'fbase'
import React, { useState } from 'react'
import { firebaseInstance } from 'fbase'

const Auth = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newAcount, setNewAcount] = useState(true)
    const [error, setError] = useState("")

    const onChange = (event) => {
        // const {name, value} = event.target
        const {target: {name, value}} = event

        if(name === "email"){
            setEmail(value)
        } else if(name === "password"){
            setPassword(value)
        }
    }

    // true : create acount || false : Login
    const onSubmit = async (event) => {
        // 새로고침 방지 / state 보존
        event.preventDefault()
        let data
        try{
            if(newAcount){
                data = await authService.createUserWithEmailAndPassword(email, password)
            } else{
                data = await authService.signInWithEmailAndPassword(email,password)
            }
            console.log(data)
        } catch(error){
            setError(error.message)
        }      
    }

    const onSocialClick = async (event) => {
        const {target : {name}} = event
        let provider

        if(name === "google"){
            // provider에 로그인 창 팝업
            provider = new firebaseInstance.auth.GoogleAuthProvider()
        } else if(name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider()
        }

        const data = await authService.signInWithPopup(provider)
        console.log(data)
    }
    // newAcount 값에 따라 회원가입 / 로그인 : prev는 이전 값...
    const toggleAcount = () => setNewAcount(prev => !prev)
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" value = {email} onChange={onChange}/>
                <input name="password" type="password" placeholder="password" value = {password} onChange={onChange}/>
                <input type="submit" value={newAcount? "Create Acount" : "Login"} />
            </form>
            {error}
            <span onClick={toggleAcount}>{newAcount ? "Login" : "Create Acount"}</span>
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth