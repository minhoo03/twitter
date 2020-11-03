import React, { useState } from "react"
import { dbService } from 'fbase'

const Tweet = ({tweetObj, isOwner}) => {

    const [ editing, setEditing ] = useState(false)
    const [ newTweet, setNewTweet ] = useState(tweetObj.text)
    
    const onDeleteClick = () => {
        const ok = window.confirm(`Are you sure you want to delete this tweet?`)
        console.log(ok)
        if(ok){
            // delete tweet
            dbService.doc(`tweets/${tweetObj.id}`).delete()
        }
    }

    const toggleEditing = () => setEditing(prev => !prev)

    const onSubmit = (event) => {
        event.preventDefault()
        console.log(tweetObj, newTweet)
        dbService.doc(`tweets/${tweetObj.id}`).update({text : newTweet})
        setEditing(false)
    }

    const onChange = (event) => {
        // state 바뀌는 걸 실시간으로
        const {target : {value}} = event
        setNewTweet(value)
    }

    return (
        <div>
            {
                editing ? 
                ( 
                    <>
                        <form onSubmit={onSubmit}>
                            <input value={newTweet} required onChange={onChange} />
                            <input type="submit" value="Update Tweet" />
                        </form> 
                        <button onClick={toggleEditing}>Cancel</button>
                    </>
                ) : (
                    <>
                    <h4>{tweetObj.text}</h4>
                    {isOwner && (
                        <>
                        <button onClick={onDeleteClick}>Delete Tweet</button>
                        <button onClick={toggleEditing}>Edit Tweet</button>
                        </>
                    )}
                    </>
                ) 
            }
        </div>
    )
}

export default Tweet