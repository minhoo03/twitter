// My Profile : Logout
import { authService, dbService } from 'fbase'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const Profile = ({userObj}) => {
    const history = useHistory()
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

    const onLogOutClick = () => {
        authService.signOut()
        history.push('/')
    }

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

    const onSubmit = async (event) => { 
        event.preventDefault()

        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName
            })
        }
    }

    return(
        <>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Display name" value={newDisplayName} onChange={onChange} />
            <input type="submit" value="Update Profile" />
        </form>
            <button onClick={onLogOutClick}>Logout</button>
        </>
    )
}

export default Profile