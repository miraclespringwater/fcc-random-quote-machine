import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState(initialColor);

  const fetchQuotes = useCallback(async () => {
    setLoading(true);
    const { data } = await axios.get("https://api.quotable.io/quotes/random", {
      params: {
        limit: 50,
      },
    });
    setQuotes(data);
    setLoading(false);
  }, []);

  const handleClick = () => {
    setColor(getRandomColor);
    setCurrentQuote((oldQuote) => oldQuote + 1);
  };

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  useEffect(() => {
    if (quotes.length > 0 && currentQuote === quotes.length) {
      setCurrentQuote(0);
      fetchQuotes();
    }
  }, [fetchQuotes, currentQuote, quotes.length]);

  const text = quotes[currentQuote]?.content || "";
  const author = quotes[currentQuote]?.author || "";

  const tweetPath = `"${text}" -${author}`;

  const tweetUrl = `${tweetBaseUrl}${encodeURIComponent(tweetPath)}`;

  return (
    <div className="wrapper" style={{ color }}>
      <div id="quote-box" className="random-quote">
        <div className="random-quote__quote">
          <p id="text" className="random-quote__text">
            <span>
              <FaQuoteLeft />
            </span>
            {text}
            <span>
              <FaQuoteRight />
            </span>
          </p>
          <p id="author" className="random-quote__author">
            {author && `- ${author}`}
          </p>
        </div>
        <div className="random-quote__buttons">
          <a
            id="tweet-quote"
            onClick={handleClick}
            className="button"
            title="Tweet the darn quote!"
            href={tweetUrl}
            rel="noreferrer"
            target="_blank"
          >
            <span className="button__text">Tweet</span>
          </a>
          <button
            id="new-quote"
            disabled={loading}
            onClick={handleClick}
            className="button"
          >
            <span className="button__text">New Quote</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const colors = [
  "#f87171",
  "#fb923c",
  "#fbbf24",
  "#facc15",
  "#a3e635",
  "#4ade80",
  "#34d399",
  "#2dd4bf",
  "#22d3ee",
  "#38bdf8",
  "#60a5fa",
  "#818cf8",
  "#c084fc",
  "#e879f9",
  "#f472b6",
  "#fb7185",
];

const getRandomColor = (currentColor) => {
  const choices = [...colors];

  if (typeof currentColor !== "undefined") {
    const index = choices.indexOf(currentColor);
    index !== -1 && choices.splice(index, 1);
  }

  return choices[Math.floor(Math.random() * choices.length)];
};

const initialColor = getRandomColor();

const tweetBaseUrl =
  "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=";

export default App;
