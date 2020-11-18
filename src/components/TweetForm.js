// Tweet Create form

import React, { useState } from "react"
import {v4 as uuidv4} from 'uuid'
import { dbService, storageService } from "fbase"

import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const TweetForm = ({userObj}) => {
    const [tweet, setTweet] = useState("")
    const [attachment, setAttachment] = useState("")
        
    // DB에 저장
    const onSubmit = async (event) => {
        event.preventDefault()
        let attachmentUrl = ""

        if(attachment !== ""){
            // 폴더 : 유저네임 / 사진 이름 : uuid... ↓url
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`)
            // storage에 놓다
            const response = await attachmentRef.putString(attachment, "data_url")
            // storage에서 URL Download
            attachmentUrl = await response.ref.getDownloadURL()
        }

        // tweet && image upload
        const tweetObj = {
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        }
        
        await dbService.collection("tweets").add(tweetObj)
        setTweet("")
        setAttachment("")
        console.log(`Saved your Tweet to "collection"`)
    }
    // state 저장
    const onChange = (event) => {
        const { target : { value }} = event
        setTweet(value)
    }
    
    // File upload
    const onFileChange = (event) => {
        const {target: {files}} = event
        const theFile = files[0]
        const reader = new FileReader()
        // ↑ 인스턴스 생성 ↓를 통해 이미지 url로 읽기
        reader.readAsDataURL(theFile)

        // 파일을 읽은 후 내용을 받음.. result에 텍스트화된 이미지
        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent)

            const { currentTarget : {result}} = finishedEvent

            setAttachment(result)
        }
    }

    // 사진 Clear
    const onClearAttachment = () => setAttachment("")


    return (
        <div className="tweet_form">
            <form>
                <input value={tweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input onClick={onSubmit} type="submit" value="↑" /><br></br>
                <input className="asd" type="file" accept="image/*" onChange={onFileChange} />
                {attachment && <div>
                        <img src={attachment} width="100px" height="100px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>}
            </form>
        </div>
    )
}

export default TweetForm