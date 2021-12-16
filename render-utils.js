export function renderPoll(poll) {

    const newPollEl = document.createElement('div');
    const newQuestionEl = document.createElement('p');
    const newOption1El = document.createElement('p');
    const newOption2El = document.createElement('p');
    const newVotes1El = document.createElement('p');
    const newVotes2El = document.createElement('p');

    newPollEl.classList.add('poll');
    newQuestionEl.textContent = poll.question;
    newOption1El.textContent = poll.option_1;
    newOption2El.textContent = poll.option_2;
    newVotes1El.textContent = poll.votes_1;
    newVotes2El.textContent = poll.votes_2;

    newPollEl.append(newQuestionEl, newOption1El, newOption2El, newVotes1El, newVotes2El,);

    return newPollEl;
}