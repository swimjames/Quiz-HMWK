// List of questions and a possible answers and correct answer
const questions = [
    {
        question: "How many types of Pokeballs are there?",
        choices: ["a. 7", "b. 12", "c. 27", "d. 36"],
        answer: "d. 36"
    },
    {
        question: "Who is the first Pokemon?",
        choices: ["a. Bulbasaur", "b. Mew", "c. Arceus", "d. Rhydon"],
        answer: "c. Arceus"
    },
    {
        question: "Who is the first Pokemon Ash catches in the anime?",
        choices: ["a. Caterpie", "b. Pidgey", "c. Charizard", "d. Pikachu"],
        answer: "a. Caterpie"
    },
    {
        question: "How many Pokemon are you allowed to have on you at one time?",
        choices: ["a. 3", "b. 6", "c. 10", "d. 12"],
        answer: "b. 6"
    },
    {
        question: "How many different species of Pokemon are there?",
        choices: ["a. 151", "b. 427", "c. 762", "d. 1015"],
        answer: "d. 1015"
    },
    {
        question: "How many different evolutions does Eevee have?",
        choices: ["a. 1", "b. 3", "c. 8", "d. 10"],
        answer: "c. 8"
    },
    {
        question: "Which of these Pokemon is not a starter Pokemon?",
        choices: ["a. Oshawott", "b. Grookey", "c. Meowth", "d. Charmander"],
        answer: "c. Meowth"
    },
    {
        question: "What is Piplup's final evolution?",
        choices: ["a. Empoleon", "b. Prinplup", "c. Turtwig", "d. Celebi"],
        answer: "a. Empoleon"
    },
    {
        question: "Who is Ash's rival?",
        choices: ["a. Brock", "b. Red", "c. Gary", "d. Cilan"],
        answer: "c. Gary"
    },
    {
        question: "What color is Arbok?",
        choices: ["a. Yellow", "b. Black", "c. Purple", "d. Green"],
        answer: "c. Purple"
    },
    {
        question: "What type of Pokemon is Accelgor?",
        choices: ["a. Bug", "b. Electric", "c. Fighting", "d. Water"],
        answer: "a. Bug"
    },
    {
        question: "Which Pokemon do not have eyes?",
        choices: ["a. Zubat", "b. Jinx", "c. Caterpie", "d. Cloyster"],
        answer: "a. Zubat"
    }
];

// This is the timer for how much time has gone by
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

// start quiz button
var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-quiz-button");

// This allows you to choose which answer you want for each question 
var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");

var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");
var everything = document.getElementById("everything");

var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");

var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn"); 
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");

var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;

// timer function
var totalTime = 151;
function newQuiz() {
    questionIndex = 0;
    totalTime = 150;
    timeLeft.textContent = totalTime;
    initialInput.textContent = "";

    startDiv.style.display = "none";
    questionDiv.style.display = "block";
    timer.style.display = "block";
    timesUp.style.display = "none";

    var startTimer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < questions.length - 1) {
                gameOver();
            }
        }
    },1000);

    showQuiz();
};


function showQuiz() {
    nextQuestion();
}

function nextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
}

// check to see if the answer is correct or if the answer is wrong
function checkAnswer(answer) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";

    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        
        correctAns++;
       
        answerCheck.textContent = "Correct!";
    } else {
       
        totalTime -= 10;
        timeLeft.textContent = totalTime;
        answerCheck.textContent = "Wrong! The correct answer is: " + questions[questionIndex].answer;
    }

    questionIndex++;
    
    if (questionIndex < questions.length) {
        nextQuestion();
    } else {
      
        gameOver();
    }
}
// functions for choosing and checking answers
function chooseA() { checkAnswer(0); }

function chooseB() { checkAnswer(1); }

function chooseC() { checkAnswer(2); }

function chooseD() { checkAnswer(3); }


function gameOver() {
    summary.style.display = "block";
    questionDiv.style.display = "none";
    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "block";

  
    finalScore.textContent = correctAns;
}

// function for storing and recording high scores and players initials
function storeHighScores(event) {
    event.preventDefault();

    if (initialInput.value === "") {
        alert("Please enter your initials!");
        return;
    } 

    startDiv.style.display = "none";
    timer.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";   

   
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var userScore = {
        initials: initialInput.value,
        score: finalScore.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);

    
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
   
    showHighScores();
}
// function for showing stored high scores and initials
var i = 0;
function showHighScores() {

    startDiv.style.display = "none";
    timer.style.display = "none";
    questionDiv.style.display = "none";
    timesUp.style.display = "none";
    summary.style.display = "none";
    highScoreSection.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

  
    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);
    storedHighScores.sort((a,b) => b.score - a.score);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}


// event listeners for user interaction
startQuizBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

// buttons for when the submitting, viewing high scores, going back, and clearing high scores
submitInitialBtn.addEventListener("click", function(event){ 
    storeHighScores(event);
});

viewHighScore.addEventListener("click", function(event) { 
    showHighScores(event);
});

goBackBtn.addEventListener("click", function() {
    startDiv.style.display = "block";
    highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: 'Prima Nova', sans-serif; font-style: italic;")
});
