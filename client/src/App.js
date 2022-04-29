import React, { useRef, useState } from "react";
import "./App.css";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const shortUrl = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        originalUrl: originalUrl,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setLoading(false);
        } else {
          shortUrl.current = data.shortUrl;
          setLoading(false);
        }
      })
      .catch((err) => {
        setError("Something went wrong");
        setLoading(false);
      });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl.current);
  };

  return (
    <div className="App">
      <div className="App-header">
        <form onSubmit={handleSubmit} className="longBlock">
          <input
            type="text"
            className="urlInput"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="paste your long url"
          />
          <button className="shortButton" type="submit">
            Shorten
          </button>
        </form>
        <div className="shortBlock">
          <input
            type="text"
            className="urlOutput"
            value={shortUrl.current}
            placeholder="Your Short URL"
            readOnly
          />
          <button className="copyButton" onClick={copyToClipboard}>
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
