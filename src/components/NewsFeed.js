import {useEffect, useState} from "react"
import axios from "axios"
import {FaRegPaperPlane} from "react-icons/fa";

const NewsFeed = () => {
    const [articles, setArticles] = useState(null)

    useEffect(() => {

        var options = {
            method: 'GET',
            url: 'https://crypto-news-live.p.rapidapi.com/news',
            headers: {
                'x-rapidapi-host': 'crypto-news-live.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
            }
        };

        axios.request(options).then((response) => {
            console.log(response.data)
            setArticles(response.data)
        }).catch((error) => {
            console.error(error)
        })
    }, [])

    console.log("articles",articles)

    const firstSevenArticles = articles?.slice(20,40)
    console.log("7 articles",firstSevenArticles)


    return (
        <div className="news-feed link">
            <h2>Crypto News:</h2>

            {firstSevenArticles?.map((article, _index) => (
                <div key={_index}>
                    <p> <FaRegPaperPlane/>  <a className="link" href={article.url}> {article.title}</a></p>

                </div>))}
        </div>
    )
}

export default NewsFeed