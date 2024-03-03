//When I press the begin quiz button, the following things happen: 
// 1. the page to change to the quiz question 
// 2. the timer to start ticking down

// Also build a Highscores HTML page

// Next step. Display the options and question of the first question. 
// When the correct answer is chosen, display "correct" proceed to the next question
// If the wrong answer is chosen, display "wrong", reduce the timer by 15 seconds, and proceed to the next question. 

//After the last question is answered, stop the timer. Log the final time as the score. 
// Display the final score and prompt the user to enter initials 
// After the "submit" button is clicked, display the HighScores Page. 
// log the initials and score in an ordered list in descending order
// Have an option to "Go Back" and "Clear the HighScores"

// Acceptance Criteria

// ```
// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score
// ```

// ------------------------------------------------------------ //


// Quiz time, question, and ID variables

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;


// Initial Variables 

var beginVar = document.getElementById('start-button');
var timerVar = document.getElementById('time');
var resultVar = document.getElementById('feedback');
var penaltyVar = document.getElementById('penalty');
var questionsVar = document.getElementById('questions');
var choicesVar = document.getElementById('choices');
var submitVar = document.getElementById('submit');
var initialsVar = document.getElementById('initials');



//SFX

var sfxCorrect = new Audio('assets/sfx/mycorrect.mp3');
var sfxIncorrect = new Audio('assets/sfx/myincorrect.mp3');
var sfxStart = new Audio('assets/sfx/start.mp3');
var sfxVictory = new Audio('assets/sfx/victory.mp3');





// MAIN FUNCTIONS 

function playIntro() {
  var introSong = document.getElementById('introSong');
  var playButton = document.getElementById('playbutton');


  if(introSong.paused) {
    introSong.play();
    playButton.textContent = '⏸'
    
    playButton.setAttribute('class', 'buttonPlay');
    playButton.classList.remove('class', 'buttonPause');

  }
  else {
    introSong.pause();
    playButton.textContent = '▶'

    playButton.classList.remove('class', 'buttonPlay');
    playButton.setAttribute('class', 'buttonPause');
  }
}


// Begin Quiz Function // -----> This function needs to: hide the start page, reveal the first question, start the timer, show the timer.

function beginQuiz() {

      // hide start screen
  var startScreenVar = document.getElementById('start-screen');
  startScreenVar.setAttribute('class', 'hide'); //How do I hide an element in JS? Use a CSS class set to display: none

  sfxStart.play();

  // un-hide questions section
  questionsVar.removeAttribute('class'); //How do I remove a CSS class using JS? .removeAttribute

  // start timer
  timerId = setInterval(clockTick, 1000); //Why can't I set this to 1 second? Why does it have to be in milliseconds? 

  // show starting time
  timerVar.textContent = time;

  showQuestion(); // <----- Next Variable to Work on
}

// Timer Function

function clockTick() {
    // update time
    time--;
    timerVar.textContent = time;
  
    // check if user ran out of time
    if (time <= 0) {
      quizEnd();
    }
  }

  // showQuestion Function <----- This function needs to: get questions from questions.js file, display the correct question and choices,
  //                               make sure there are no old choices or text elements showing, 

  function showQuestion() {

    var currentQuestion = questions [currentQuestionIndex];

    var questionText = document.getElementById('question-title');

    questionText.textContent = currentQuestion.title;

  
    choicesVar.innerHTML = '';

     // loop over choices
  for (var i = 0; i < currentQuestion.choices.length; i++) {

    // create new button for each choice
    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);

    choiceNode.textContent = i + 1 + '. ' + choice;

    // display on the page
    choicesVar.appendChild(choiceNode);
  }


  }
  
  // answerChoice Function <----- this function needs to handle what happens when I choice button is clicked, decide if the answer is correct, and proceed
      //                          to the next questions, 

  function answerChoice(event) { 
    
      var buttonEl = event.target;
    
      // if the clicked element is not a choice button, do nothing.
      if (!buttonEl.matches('.choice')) {
        return;
      }
    
      // check if user guessed wrong
      if (buttonEl.value !== questions[currentQuestionIndex].answer) {
        // penalize time
        time -= 15;
    
        if (time < 0) {
          time = 0;
        }
    
        // display new time on page
        timerVar.textContent = time;
    
        // play "wrong" sound effect
        sfxIncorrect.play();

        
        resultVar.style.color = 'red';
        penaltyVar.style.color = 'red'
        penaltyVar.style.color = 'red'
        resultVar.textContent = 'Wrong!';
        penaltyVar.setAttribute('class', 'penalty');
        
        
        
      } else {
        // play "right" sound effect
        sfxCorrect.play();

        resultVar.style.color = 'green';
        resultVar.textContent = 'Correct!';
      }
    
      // flash right/wrong feedback on page for half a second
      resultVar.setAttribute('class', 'feedback');
      
      setTimeout(function () {
        resultVar.setAttribute('class', 'feedback hide');
        penaltyVar.setAttribute('class', 'feedback hide');
      }, 1000);
    
      // move to next question
      currentQuestionIndex++;
    
      // check if we've run out of questions
      if (time <= 0 || currentQuestionIndex === questions.length) {
        quizEnd();
      } else {
        showQuestion();
      }
    }
    
    //_________________________________________________
    
    function quizEnd() {
      // stop timer
      clearInterval(timerId);

      sfxVictory.play();
    
      // show end screen
      var endScreenEl = document.getElementById('end-screen');
      endScreenEl.removeAttribute('class');
    
      // show final score
      var finalScoreEl = document.getElementById('final-score');
      finalScoreEl.textContent = time;
    
      // hide questions section
      questionsVar.setAttribute('class', 'hide');
    }



function saveHighscore() {
  // get value of input box
  var initials = initialsVar.value.trim();

  // make sure value wasn't empty
  if (initials !== '') {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem('highscores')) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials,
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    // redirect to next page
    window.location.href = 'highscores.html';
  }
}

//_________________________________________________

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === 'Enter') {
    saveHighscore();
  }
}






// start quiz
beginVar.onclick = beginQuiz;

// click on choice
choicesVar.onclick = answerChoice;

submitVar.onclick = saveHighscore;

initialsVar.onkeyup = checkForEnter;



