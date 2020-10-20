// Home.js / tweet
import React, { useState } from 'react'

const Home = () => {
    const [tweet, setTweet] = useState("")
    
    const onSubmit = (event) => {
        event.preventDefault()
    }
    const onChange = (event) => {
        const { target : { value }} = event
        setTweet(value)
    }
    return (
        <div>
            <form>
                <input value={tweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input onClick={onSubmit} type="submit" value="Tweet" />
            </form>
        </div>
    )
}
export default Home