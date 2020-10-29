// Home.js / tweet
import { dbService } from 'fbase'
import React, { useEffect, useState } from 'react'

const Home = () => {
    const [tweet, setTweet] = useState("")
    const [tweets, setTweets] = useState([])
    const getTweets = async() => { // async이기에 개별함수
        const dbTweets = await dbService.collection("tweets").get()
        // ↕ dbTweets를 배열 요소에 담아... document에 담고...
        // setTweets(이전값 => 최근 데이터, 이전값) <- 모든 트윗 가져옴
        dbTweets.forEach(document => {
            const tweetObject = {
                ...document.data(),
                id: document.id
            }
            setTweets(prev => [tweetObject, ...prev])
        })
        console.log(`Get Tweets!!`)
    }

    useEffect(() => {
        getTweets()
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault()

        await dbService.collection("tweets").add({
            // tweet : tweet
            tweet,
            createdAt: Date.now()
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
                        <h4>{tweet.tweet}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Home