import React from "react"
import { dbService } from 'fbase'

const Tweet = ({tweetObj, isOwner}) => {

    

    const onDeleteClick = () => {
        const ok = window.confirm(`Are you sure you want to delete this tweet?`)
        console.log(ok)
        if(ok){
            // delete tweet
            dbService.doc(`tweets/${tweetObj.id}`).delete()
        }
    }

    return (
        <div>
            <h4>{tweetObj.text}</h4>
            {isOwner && (
                <>
                <button onClick={onDeleteClick}>Delete Tweet</button>
                <button>Edit Tweet</button>
                </>
            )}
        </div>
    )
}

export default Tweet