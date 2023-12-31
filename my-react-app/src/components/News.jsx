import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { TickerContext } from './StockSearch';
import {ApiContext} from '../App'

const News = () => {
  const ticker = useContext(TickerContext);
  const { apiKEY } = useContext(ApiContext); 

  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const getNews = () => {
      axios
        .get(
          `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=${apiKEY}`
        )
        .then((response) => {
          console.log("News Data:", response.data);
          setNewsData(response.data.feed);
        })
        .catch((error) => {
          console.error("Error fetching news data:", error);
        });
    };

    if (ticker) {
      getNews();
    }
  }, [ticker]);

  return (
    <div>
      <div>
        {newsData && newsData.length > 0 ? ( 
          <ul>
            {newsData.map((feed, index) => (
              <li key={index}>
                <h2>
                  <a href={feed.url} target="_blank">
                    {feed.title} ({feed.source})
                  </a>
                </h2>
                <h3>{feed.summary}</h3>
                <h3>Overall Sentiment: {feed.overall_sentiment_label}</h3>
              </li>
            ))}
          </ul>
        ) : (
          <p>No news data available.</p>
        )}
      </div>
    </div>
  );
};

export default News;
