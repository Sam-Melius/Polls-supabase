// import functions and grab DOM elements
import { savePoll, getPolls, logout, checkLoggedIn } from '../fetch-utils.js';
import { renderPoll } from '../render-utils.js';

checkLoggedIn();

const questionEl = document.querySelector('.question');
const option1TitleEl = document.querySelector('.option-1-title');
const option1VotesEl = document.querySelector('.option-1-votes');
const option1ButtonEl = document.querySelector('.option-1-button');
const option2TitleEl = document.querySelector('.option-2-title');
const option2VotesEl = document.querySelector('.option-2-votes');
const option2ButtonEl = document.querySelector('.option-2-button');
const finishButtonEl = document.querySelector('.finish-button');
const pastPollsEl = document.querySelector('.past-polls');
const pollFormEl = document.querySelector('#poll-form');
const logoutButtonEl = document.querySelector('#logout');

let question = '';
let option1Title = '';
let option1Votes = 0;
let option2Title = '';
let option2Votes = 0;

window.addEventListener('load', async() => {
    await displayAllPolls();
});

logoutButtonEl.addEventListener('click', async() => {
    await logout();
});

pollFormEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(pollFormEl);

    displayCurrentPoll(data);

    pollFormEl.reset();
});
  
option1ButtonEl.addEventListener('click', () => {
    option1Votes++;

    option1VotesEl.textContent = option1Votes;
});

option2ButtonEl.addEventListener('click', () => {
    option2Votes++;

    option2VotesEl.textContent = option2Votes;
});

finishButtonEl.addEventListener('click', async() => {
    await savePoll(question, option1Title, option2Title, option1Votes, option2Votes);

    displayAllPolls();
    questionEl.textContent = '';
    option1TitleEl.textContent = '';
    option1VotesEl.textContent = 0;
    option2TitleEl.textContent = '';
    option2VotesEl.textContent = 0;
});

function displayCurrentPoll(data) {
    question = data.get('question');
    option1Title = data.get('option-1-title');
    option1Votes = data.get('option-1-votes');
    option2Title = data.get('option-2-title');
    option2Votes = data.get('option-1-votes');

    questionEl.textContent = question;
    option1TitleEl.textContent = option1Title;
    option1VotesEl.textContent = option1Votes;
    option2TitleEl.textContent = option2Title;
    option2VotesEl.textContent = option2Votes;
}

async function displayAllPolls() {
    const polls = await getPolls();

    pastPollsEl.textContent = '';
    
    for (let poll of polls) {
        const newPollEl = renderPoll(poll);

        pastPollsEl.append(newPollEl);
    }
    
}
