// Home.js / tweet
// tweet - DB에 저장할 데이터 입력 / tweets - DB의 데이터 끌고온 state (tweet이란 지역변수에 값을 보내주어 화면에 DB값 출력)
import Tweet from 'components/Tweet'
import { dbService } from 'fbase'
import React, { useEffect, useState } from 'react'

const Home = ({userObj}) => {
    const [tweet, setTweet] = useState("")
    const [tweets, setTweets] = useState([])
    const [attachment, setAttachment] = useState()

    // getTweets()
    useEffect(() => {
        // DB 상태 변화 감지-변화 데이터를 담고 최근데이터, 이전값(모든 값) 들고옴
        dbService.collection("tweets").onSnapshot(snapshot => {
            const tweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setTweets(tweetArray)
        })
    }, [])
    
    // DB에 저장
    const onSubmit = async (event) => {
        event.preventDefault()

        await dbService.collection("tweets").add({
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid     
        })
        setTweet("")
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
    const onClearAttachment = () => setAttachment(null)

    return (
        <div>
            <form>
                <input value={tweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input onClick={onSubmit} type="submit" value="Tweet" />
                {attachment && <div>
                        <img src={attachment} width="100px" height="100px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>}
            </form>
            <div>
                {/* tweets(DB값 저장 state) map => tweet 변수에 담음 */}
                {tweets.map((tweet) => (
                    <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    )
}
export default Home

/*
    // DB의 내용 get
    const getTweets = async() => { // async이기에 개별함수
        const dbTweets = await dbService.collection("tweets").get()
        // ↕ dbTweets를 배열 요소에 담아... document에 담고...
        // setTweets(이전값 => 최근 데이터, 이전값) <- 모든 트윗 가져옴
        dbTweets.forEach(document => {
            const tweetObject = {
                ...document.data(),
                id: document.id,
            }
            setTweets(prev => [tweetObject, ...prev])
        })
        console.log(`Get Tweets!!`)
    }
*/