import { useEffect, useState } from 'react';
import '@pages/popup/Popup.css';

export interface News {
  is_trusted_url: boolean;
  is_real_author: boolean;
  is_real_article: boolean;
  url?: string | null;
  author?: string;
  title?: string | null;
  text?: string;
  is_article?: boolean;
  truth_percentage: number;
  uniqueness_hits: number;
  found_articles: string[];
}

const getCurrentTabUrl = () => new Promise<string>((resolve, reject) => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    const [activeTab] = tabs;
    const { url: tabURL } = activeTab;
    if (typeof tabURL === 'string') {
      resolve(tabURL);
    }
    reject(new Error('Unable to get the current tab'));
  });
});

const Popup = () => {
  const [result, setResult] = useState<News>();

  useEffect(() => {
    getCurrentTabUrl()
      .then((url) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/parser/url`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url })
        })
          .then((res) => res.json())
          .then(setResult);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {result && `Статья на ${result.truth_percentage}% не фейк`}
          {!result && 'Loading...'}
        </p>
      </header>
    </div>
  );
};

export default Popup;
