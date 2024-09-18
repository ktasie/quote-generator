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
    const response = await fetch(url, { headers: { 'X-Api-Key': '/Wk5aTr/b1fqJWCmv11mcg==UObrUHGXSKCy64o0' } });
    quotes = await response.json();
    console.log(quotes[0]);
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
  //const quoteObj = quotes[`${randomQuotesIdentifier(quotes)}`];
  // Only a single quote is returned.
  const quoteObj = quotes[0];
  //console.log(quoteObj);
  //if (quoteObj.text.length > 120) {
  quoteTxt.classList.add('long-quote');
  //} else {
  //  quoteTxt.classList.remove('long-quote');
  //}

  //   set quote, hide loader
  //quoteTxt.textContent = quoteObj.text;
  quoteTxt.textContent = quoteObj.quote;
  authorTxt.textContent = quoteObj.author;
  complete();
  //console.log(quotes[randomQuotesIdentifier(quotes)].text);
};

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteTxt.textContent} - ${authorTxt.textContent}`;
  window.open(twitterUrl, '_blank');
}

//Onload
//new api link for learning purpose.
fetchQuotes('https://api.api-ninjas.com/v1/quotes');

//quoteBtn.addEventListener('click', displayQuotes);
quoteBtn.addEventListener('click', fetchQuotes.bind(null, 'https://api.api-ninjas.com/v1/quotes'));
twitterBtn.addEventListener('click', tweetQuote);
