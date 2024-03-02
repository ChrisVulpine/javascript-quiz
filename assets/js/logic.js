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


// Begin Quiz Function // -----> This function needs to: hide the start page, reveal the first question, start the timer, show the timer.

function beginQuiz() {

      // hide start screen
  var startScreenVar = document.getElementById('start-screen');
  startScreenVar.setAttribute('class', 'hide'); //How do I hide an element in JS? Use a CSS class set to display: none


  // un-hide questions section
  questionsVar.removeAttribute('class'); //How do I remove a CSS class using JS? .removeAttribute

  // start timer
  timerId = setInterval(clockTick, 1000); //Why can't I set this to 1 second? Why does it have to be in milliseconds? 

  // show starting time
  timerVar.textContent = time;

  getQuestion(); // <----- Next Variable to Work on
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
  



// start quiz
beginVar.onclick = beginQuiz;



