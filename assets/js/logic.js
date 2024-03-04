// Quiz time, question, and ID variables

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// Main Variables 

var beginVar = document.getElementById('start-button');
var timerVar = document.getElementById('time');
var resultVar = document.getElementById('feedback');
var penaltyVar = document.getElementById('penalty');
var questionsVar = document.getElementById('questions');
var choicesVar = document.getElementById('choices');
var submitVar = document.getElementById('submit');
var initialsVar = document.getElementById('initials');
var javaLogo = document.getElementById('JavaScript-logo');
var bgmVar = document.getElementById('bgmText');
var playButton = document.getElementById('playbutton');

//SFX

var sfxCorrect = new Audio('assets/sfx/mycorrect.mp3');
var sfxIncorrect = new Audio('assets/sfx/myincorrect.mp3');
var sfxStart = new Audio('assets/sfx/start.mp3');
var sfxVictory = new Audio('assets/sfx/victory.mp3');

// MAIN FUNCTIONS 

// Background Music Control

let music = document.getElementById("introSong");
music.volume = .1;

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

// Begin Quiz Function

function beginQuiz() {

  var startScreenVar = document.getElementById('start-screen');
  startScreenVar.setAttribute('class', 'hide'); 
  javaLogo.setAttribute('class', 'hide');
  bgmVar.setAttribute('class', 'hide');
  playButton.setAttribute('class', 'hide');

  sfxStart.play();

  
  questionsVar.removeAttribute('class'); 

 
  timerId = setInterval(clockTick, 1000); 

  timerVar.textContent = time;

  showQuestion(); 
}

// Timer Function

function clockTick() {
    
    time--;
    timerVar.textContent = time;
  
    
    if (time <= 0) {
      quizEnd();
    }
  }

  // showQuestion Function

  function showQuestion() {

    var currentQuestion = questions [currentQuestionIndex];

    var questionText = document.getElementById('question-title');

    questionText.textContent = currentQuestion.title;

    choicesVar.innerHTML = '';

  for (var i = 0; i < currentQuestion.choices.length; i++) {

    var choice = currentQuestion.choices[i];
    var choiceNode = document.createElement('button');
    choiceNode.setAttribute('class', 'choice');
    choiceNode.setAttribute('value', choice);

    choiceNode.textContent = i + 1 + '. ' + choice;

    choicesVar.appendChild(choiceNode);
  }

  }
  
  // answerChoice Function

  function answerChoice(event) { 
    
      var buttonEl = event.target;
    
      if (!buttonEl.matches('.choice')) {
        return;
      }
    
      if (buttonEl.value !== questions[currentQuestionIndex].answer) {

        time -= 15;
    
        if (time < 0) {
          time = 0;
        }
  
        timerVar.textContent = time;
    
        sfxIncorrect.play();

        resultVar.style.color = 'red';
        penaltyVar.style.color = 'red'
        penaltyVar.style.color = 'red'
        resultVar.textContent = 'Wrong!';
        penaltyVar.setAttribute('class', 'penalty');
        
      } else {
        sfxCorrect.play();

        resultVar.style.color = 'green';
        resultVar.textContent = 'Correct!';
      }

      resultVar.setAttribute('class', 'feedback');
      
      setTimeout(function () {
        resultVar.setAttribute('class', 'feedback hide');
        penaltyVar.setAttribute('class', 'feedback hide');
      }, 1000);
    
      currentQuestionIndex++;
    
      if (time <= 0 || currentQuestionIndex === questions.length) {
        quizEnd();
      } else {
        showQuestion();
      }
    }
    
    // Quiz End Function

    function quizEnd() {

      playButton.setAttribute('class', 'hide');

      clearInterval(timerId);

      introSong.pause();

      let vMusic = document.getElementById("victorySong");

      vMusic.volume = 0.2;
      vMusic.play();

      vMusic.addEventListener('ended', function() {
      vMusic.pause();
      vMusic.currentTime = 0;
      });

      var endScreenEl = document.getElementById('end-screen');
      endScreenEl.removeAttribute('class');
  
      var finalScoreEl = document.getElementById('final-score');
      finalScoreEl.textContent = time;
    
      questionsVar.setAttribute('class', 'hide');
    }

// Save Highscore Function

function saveHighscore() {

  var initials = initialsVar.value.trim();

  if (initials !== '') {

    var highscores =
      JSON.parse(window.localStorage.getItem('highscores')) || [];

    var newScore = {
      score: time,
      initials: initials,
    };

    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));

    window.location.href = 'highscores.html';
  }
}

// Let user use Enter key Function

function checkForEnter(event) {

  if (event.key === 'Enter') {
    saveHighscore();
  }
}

// Function & Event mapping

beginVar.onclick = beginQuiz;

choicesVar.onclick = answerChoice;

submitVar.onclick = saveHighscore;

initialsVar.onkeyup = checkForEnter;
