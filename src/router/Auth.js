// 로그인 되지 않았을 시

import { authService } from 'fbase'
import React, { useState } from 'react'

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

    const onSubmit = async (event) => {
        // 새로고침 방지 / state 보존
        event.preventDefault()
        let data
        try{
            if(newAcount){
                // true : create acount
                data = await authService.createUserWithEmailAndPassword(email, password)
            } else{
                // false : login
                data = await authService.signInWithEmailAndPassword(email,password)
            }
            console.log(data)
        } catch(error){
            setError(error.message)
        }      
    }
    // newAcount 값에 따라 회원가입 / 로그인
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
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth

// useState는 onChange에 의해 setEmail(value)... onChange가 끝나면 email 값이 바뀐게 적용