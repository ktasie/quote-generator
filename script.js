const quoteTxt = document.querySelector('#quote');
const authorTxt = document.querySelector('#author');
const quoteBtn = document.querySelector('#new-quote');
const twitterBtn = document.querySelector('#twitter');
const loader = document.querySelector('#loader');
const quoteContainer = document.querySelector('#quote-container');

let quotes = [];

// show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// getQuotes from api
const fetchQuotes = async (url) => {
  loading();
  try {
    const response = await fetch(url);
    quotes = await response.json();
    displayQuotes();
  } catch (e) {
    console.log(e);
  }
};

// randommise quote to display
const randomQuotesIdentifier = (quotes) => {
  const length = quotes.length;
  const num = Math.round(Math.random() * length);
  return num;
};

const displayQuotes = async () => {
  loading();
  //Display quote to the DOM
  const quoteObj = quotes[`${randomQuotesIdentifier(quotes)}`];
  //console.log(quoteObj);
  if (quoteObj.text.length > 120) {
    quoteTxt.classList.add('long-quote');
  } else {
    quoteTxt.classList.remove('long-quote');
  }

  //   set quote, hide loader
  quoteTxt.textContent = quoteObj.text;
  authorTxt.textContent = quoteObj.author;
  complete();
  //console.log(quotes[randomQuotesIdentifier(quotes)].text);
};

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteTxt.textContent} - ${authorTxt.textContent}`;
  window.open(twitterUrl, '_blank');
}

//Onload
fetchQuotes('https://type.fit/api/quotes');

quoteBtn.addEventListener('click', displayQuotes);
twitterBtn.addEventListener('click', tweetQuote);
