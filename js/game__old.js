// import lexicon from './russian_nouns.js'
// let difficulty = 'medium';
// const frequentWordsLexicon = lexicon[difficulty].toLowerCase().split(',');
// const wordLength = frequentWordsLexicon[0].length;
// const word = lexicon[difficulty].toLowerCase().split(',')[Math.floor(Math.random() * frequentWordsLexicon.length)];
// const input = [];

// const gameField = document.createElement('div');
// gameField.className = 'gameField';
// document.body.appendChild(gameField);
// const gameFieldRows = [];
// createGameFieldRow();

// document.addEventListener('keydown', main);

// function main(e) {
//     if (/^[a-zA-Z]$/i.test(e.key)) {
//         if (document.querySelectorAll('.gameField__alert').length < 3) {
//             showAlertMessage('Смени раскладку!');
//         }
//         return;
//     }
//     if (/^[а-яА-Я]$/i.test(e.key)) {
//         if (input.length < wordLength) {
//             gameFieldRows[gameFieldRows.length - 1].children[input.length].innerText = e.key.toUpperCase();
//             input.push(e.key.toLowerCase());
//         }
//         return;
//     }
//     if (e.key === 'Backspace') {
//         if (input.length >= 1) {
//             gameFieldRows[gameFieldRows.length - 1].children[input.length - 1].innerText = '';
//             input.pop();
//         }
//         return;
//     }
//     if (e.key === 'Enter') {
//         if (input.length === wordLength) {
//             if (!lexicon.hard.includes(input.join(''))) {
//                 showAlertMessage('Такого слова нет!');
//                 return;
//             }
//             let wordCopy = word.split('');
//             let inputCopy = JSON.parse(JSON.stringify(input));
//             for (let i = 0; i < inputCopy.length; i++) {
//                 gameFieldRows[gameFieldRows.length - 1].children[i].style.backgroundColor = '#ccc';
//                 if (inputCopy[i] === wordCopy[i]) {
//                     wordCopy[i] = '-';
//                     inputCopy[i] = '*';
//                     gameFieldRows[gameFieldRows.length - 1].children[i].style.backgroundColor = '#11dd11';
//                     continue;
//                 }
//             }
//             for (let i = 0; i < inputCopy.length; i++) {
//                 if (wordCopy.includes(inputCopy[i])) {
//                     wordCopy[wordCopy.indexOf(inputCopy[i])] = '-';
//                     inputCopy[i] = '*';
//                     gameFieldRows[gameFieldRows.length - 1].children[i].style.backgroundColor = '#ffdd11';
//                     continue;
//                 }
//             }

//             if (input.join('') !== word) {
//                 createGameFieldRow();
//                 input.length = 0;
//             } else {
//                 document.removeEventListener('keydown', main);
//                 showAlertMessage('Победа!')
//             }
//         }
//         return;
//     }
// }

window.addEventListener('resize', () => {
    for (let i = 0; i < gameFieldRows.length; i++) {
        for (let j = 0; j < wordLength; j++) {
            setGameFieldLettersSize(i, j);
        }
    }
})

function setGameFieldLettersSize(i, j) {
    gameFieldRows[i].children[j].style.height = `${+getComputedStyle(gameFieldRows[i]).width.match(/\d+/)[0] / wordLength}px`;
    gameFieldRows[i].children[j].style.fontSize = `${+getComputedStyle(gameFieldRows[i]).width.match(/\d+/)[0] / wordLength * 0.7}px`;
    gameFieldRows[i].children[j].style.lineHeight = `${+getComputedStyle(gameFieldRows[i]).width.match(/\d+/)[0] / wordLength}px`;
}

// function createGameFieldRow() {
//     const gameFieldRow = document.createElement('div');
//     gameFieldRow.className = 'gameField__row';
//     let gameFieldLetters = [];
//     gameField.appendChild(gameFieldRow);

//     for (let i = 0; i < wordLength; i++) {
//         let letterHeight = Math.min(+getComputedStyle(gameFieldRow).width.match(/\d+/)[0] / wordLength, 150);
//         gameFieldLetters.push(document.createElement('div'));
//         gameFieldLetters[i].className = 'gameField__letter';
//         gameFieldLetters[i].style.width = `${100 / wordLength}%`;
//         gameFieldLetters[i].style.height = `${letterHeight}px`;
//         gameFieldLetters[i].style.fontSize = `${letterHeight * 0.7}px`;
//         gameFieldLetters[i].style.lineHeight = `${letterHeight}px`;
//         gameFieldRow.appendChild(gameFieldLetters[i]);
//     }
//     gameFieldRows.push(gameFieldRow);
// }

// function showAlertMessage(message) {
//     const alertMessage = document.createElement('div');
//     alertMessage.className = 'gameField__alert';
//     alertMessage.innerText = message;
//     document.body.appendChild(alertMessage);
//     setTimeout(() => {
//         alertMessage.classList.add('gameField__alert-hide');
//         setTimeout(() => {
//             alertMessage.classList.remove('gameField__alert-hide');
//             alertMessage.remove();
//         }, 1000);
//     }, 1000);
// }