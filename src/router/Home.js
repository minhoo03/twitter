// Home.js / tweet
import { dbService } from 'fbase'
import React, { useEffect, useState } from 'react'

const Home = ({userObj}) => {
    const [tweet, setTweet] = useState("")
    const [tweets, setTweets] = useState([])



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
    useEffect(() => {
        getTweets()
        // DB 상태 변화 감지
        dbService.collection("tweets").onSnapshot(snapshot => {
            console.log(`something happened`)
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
    const onChange = (event) => {
        const { target : { value }} = event
        setTweet(value)
    }
    console.log(tweets)



    return (
        <div>
            <form>
                <input value={tweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input onClick={onSubmit} type="submit" value="Tweet" />
            </form>
            <div>
                {/* tweets map => tweet에 담음 */}
                {tweets.map((tweet) => (
                    <div key={tweet.id}>
                        <h4>{tweet.text}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Home