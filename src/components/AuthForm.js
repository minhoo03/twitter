import { authService } from 'fbase'
import React from 'react'
import { useState } from 'react'

const AuthForm = () => {

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
            // console.log(data)
        } catch(error){
            setError(error.message)
        }      
    }

    // newAcount 값에 따라 회원가입 / 로그인 : prev는 이전 값...
    const toggleAcount = () => setNewAcount(prev => !prev)
    return (
        <>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" value = {email} onChange={onChange}/>
                <input name="password" type="password" placeholder="password" value = {password} onChange={onChange}/>
                <input type="submit" value={newAcount? "Create Acount" : "Login"} />
            </form>
            {error}
            <span onClick={toggleAcount}>{newAcount ? "Login" : "Create Acount"}</span>
        </>
    )
}

export default AuthForm