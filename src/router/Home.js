// Tweet get
import Tweet from 'components/Tweet'
import TweetForm from 'components/TweetForm'
import { dbService, storageService } from 'fbase'
import React, { useEffect, useState } from 'react'

const Home = ({userObj}) => {
    const [tweets, setTweets] = useState([])

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

    return (
        <div className="content">
            <TweetForm userObj={userObj}/>
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