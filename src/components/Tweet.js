// Tweet Read / update form
import React, { useState } from "react"
import { dbService, storageService } from 'fbase'

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Tweet = ({tweetObj, isOwner}) => {

    const [ editing, setEditing ] = useState(false)
    const [ newTweet, setNewTweet ] = useState(tweetObj.text)
    
    // delete
    const onDeleteClick = () => {
        const ok = window.confirm(`Are you sure you want to delete this tweet?`)
        console.log(ok)
        if(ok){
            // delete tweet
            dbService.doc(`tweets/${tweetObj.id}`).delete()
            storageService.refFromURL(tweetObj.attachmentUrl).delete()
        }
    }

    const toggleEditing = () => setEditing(prev => !prev)

    // update
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
                    {
                        isOwner && (
                            <div className="content_tweet">
                                <form onSubmit={onSubmit}>
                                    <input className="profile_name" value={newTweet} required onChange={onChange} />
                                    <input className="profile_submit" type="submit" value="Update Tweet" />
                                </form> 
                                <button className="profile_button" onClick={toggleEditing}>Cancel</button>
                            </div>
                        )
                    }
                    </>
                ) : (
                    <div className="content_tweet">
                        <h4>{tweetObj.text}</h4>
                        {tweetObj.attachmentUrl && <img src={tweetObj.attachmentUrl}  width="200px" height="200px"/>}
                        {isOwner && (
                            <>
                            <button onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} size="2x" />
                            </button>
                            <button onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faEdit} size="2x"/>
                            </button>
                            </>
                        )}
                    </div>
                ) 
            }
        </div>
    )
}

export default Tweet