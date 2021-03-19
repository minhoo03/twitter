// 가입 form 전체 틀
// 로그인 되지 않았을 시

import { authService } from 'fbase'
import React, { useState } from 'react'
import { firebaseInstance } from 'fbase'
import AuthForm from 'components/AuthForm'

import { AiFillGithub } from 'react-icons/ai'
import {  FcGoogle } from 'react-icons/fc'

const Auth = () => {
    
    const onSocialClick = async (event) => {
        const {target : {name}} = event
        let provider

        if(name === "google"){
            // provider에 로그인 창 팝업
            provider = new firebaseInstance.auth.GoogleAuthProvider()
        } else if(name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider()
        }

        await authService.signInWithPopup(provider)
    }
    
    return(
        <div className="container">
            <h2 className="logo"><img src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/twitter_logo_blue.png" alt="logo" /></h2>
            
            <AuthForm />
            <div className="provider">
                <button className="google" name="google" onClick={onSocialClick}><FcGoogle /> Continue with Google</button>
                <button className="github" name="github" onClick={onSocialClick}><AiFillGithub />Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth