// My Profile : Logout
import { authService, dbService } from 'fbase'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const Profile = ({refreshUser, userObj}) => {
    const history = useHistory()
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

    const onLogOutClick = () => {
        authService.signOut()
        history.push('/')
    }

    // 내 게시글 가져오기
    // DB의 where : 조건에 맞춰 data 끌고옴
    const getMyTweets = async () => {
        // 쿼리 추가 (noSQL이기에) : 필터링, 순서 등등 엮기 위해
        const tweets = await dbService.collection("tweets").where("creatorId", "==", userObj.uid).orderBy("createdAt").get()
        console.log(tweets.docs.map(doc => doc.data()))
    }

    useEffect(() => {
        getMyTweets()
    })

    const onChange = (event) => {
        const {target : {value}} = event
        setNewDisplayName(value)
    } 

    // 변경된 name을 userObj의 displayName에 적용 후
    // refreshUser로 새로 적용된 name 가져옴
    const onSubmit = async (event) => { 
        event.preventDefault()

        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName
            })
        }
        // userObj 새로고침
        refreshUser()
    }

    return(
        <div className="content_tweet">
        <form onSubmit={onSubmit} className="profile">
            <input className="profile_name" type="text" placeholder="Display name" value={newDisplayName} onChange={onChange} />
            <input className="profile_submit" type="submit" value="Update Profile" />
        </form>
            <button className="profile_button" onClick={onLogOutClick}>Logout</button>
        </div>
    )
}

export default Profile