"use strict";

import "./app.css";
import getCurrentTime from "./clock";
import getDay from "./day";
import quotes from "./quotes.json";

//overriding date function

(function() {
  function setTime() {
    const time = getCurrentTime();

    document.getElementById("clock").innerHTML = time;
  }

  function setDay() {
    const day = getDay();

    document.getElementById("day").innerHTML = day;
  }

  const setYearProgress = () => {
    const date = new Date();
    const isLeapYear = year => {
      return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
    };

    const initialDate = new Date(date.getFullYear(), 0, 1);
    console.log("initialDate: ", initialDate);
    const percent = Math.floor(
      (((date - initialDate) / (1000 * 60 * 60 * 24)) * 100) /
        (isLeapYear(date.getFullYear()) ? 366 : 365)
    );

    document.getElementById("progressInner").style.width = `${percent}%`;
    document.getElementById("progressInnerTxt").innerHTML = `${percent}%`;
  };

  function setRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex]["quote"];
    document.getElementById("quote").innerHTML = quote;
  }
  function setupDashboard() {
    setDay();
    setTime();
    setYearProgress();
    setRandomQuote();
    setInterval(setTime, 1000);
  }
  console.log({ quotes });
  setupDashboard();

  // Communicate with background file by sending a message
  chrome.runtime.sendMessage(
    {
      type: "GREETINGS",
      payload: {
        message: "Heyyy"
      }
    },
    response => {
      console.log(response.message);
    }
  );
})();
