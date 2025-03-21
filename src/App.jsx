/* global chrome */
import React, { useEffect, useState } from "react";
import "./App.css";

const formatTime = (ms) => {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  let formattedTime = `${seconds}s`;
  if (minutes > 0) {
    formattedTime = `${minutes}m ${formattedTime}`;
  }
  if (hours > 0) {
    formattedTime = `${hours}h ${formattedTime}`;
  }
  return formattedTime;
};

function App() {
  const [times, setTimes] = useState({});
  const [blockedSites, setBlockedSites] = useState(["https://www.facebook.com/"]);

  useEffect(() => {
    const fetchTimes = () => {
      if (!chrome?.runtime?.sendMessage) {
        console.warn("chrome.runtime.sendMessage is not available.");
        return;
      }

      chrome.runtime.sendMessage({ type: "getTimes" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error fetching times:", chrome.runtime.lastError);
          return;
        }
        setTimes(response || {});
      });
    };

    fetchTimes();
    const intervalId = setInterval(fetchTimes, 1000);

    return () => clearInterval(intervalId);
  }, []);


  const generateReport = () => {
    if (Object.keys(times).length === 0) {
      alert("No data to generate report!");
      return;
    }

    let reportContent = "Website Usage Report\n\n";
    reportContent += "Website | Time Spent\n";
    reportContent += "--------------------------\n";

    Object.entries(times).forEach(([domain, time]) => {
      reportContent += `${domain} | ${formatTime(time)}\n`;
    });

    const blob = new Blob([reportContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "productivity_report.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const addBlockedSite = () => {
    const site = prompt("Enter a site to block (e.g., https://example.com):");
    if (site) {
      setBlockedSites([...blockedSites, site]);
      chrome.runtime.sendMessage({ type: "addBlockedSite", site });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Productivity Tracker</h1>
        <ul>
          {Object.entries(times).map(([domain, time]) => (
            <li key={domain}>
              <span>{domain}</span>
              <span>{formatTime(time)}</span>
            </li>
          ))}
        </ul>
        <div className="buttons">
          <button onClick={generateReport} className="generate-report-btn">
            Download Report
          </button>
          <button onClick={addBlockedSite} className="blocked-sites-btn">
            Block Site
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
