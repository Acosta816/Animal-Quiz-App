let questionNumber = 0;
let score = 0;

//-----------------------------------------------------------------------------------BEGIN
function renderQuestion(){
    $('.js-question-answer-form').html(generateQuestion());
    $('.js-quiz-start').hide();
}
//-----------------------------------------------------------------------------------END

$('.js-start-button').on('click', event=>{ //This listens for when we click the START button
    renderQuestion();
});

//-----------------------------------------------------------------------------------BEGIN
function displayFeedback(userChoice){ //This one generates the FEEDBACK HTML
    let correct = STORE[questionNumber].correctAnswer; //grabbing correct answer
    let answerView = "";
    if(userChoice === correct ){
        score ++;
        answerView =  `<div class ='right-wrong-html'>
        <img class = "animal-picture" src="${STORE[questionNumber].icon}">
                    <h2>You Got it RIGHT!</h2>
                    <p>correct answer: ${correct}</p>
                </div>`;
    } else {
        answerView = `<div class ='right-wrong-html'>
        <img class = "animal-picture" src="${STORE[questionNumber].icon}">
                    <h2>THATS WRONG,... READ A BOOK!</h2>
                    <p>correct answer: ${correct}</p>
                </div>`;
    }
    $('.js-next-button').show(); //unhide the next button
    return answerView;
} //-----------------------------------------------------------------------------------END


//-------------------------------------------------------------------------------------START
$('.js-question-answer-form').on('submit', event => { //displays FEEDBACK view (wrong..read a book)
    event.preventDefault();
    const userAnswer = $('input[name="answer"]:checked').val(); 
    console.log(userAnswer);

    const feedBackHTML= displayFeedback(userAnswer);
    $('.score-display').text(`${score}`);
    $('.js-question-answer-form').html(feedBackHTML);
})
//--------------------------------------------------------------------------------------END

//--------------------------------------------------------------------------------------START
$('footer').on('click', '.js-next-button', event=> {
    questionNumber ++;
 console.log(`This is the current question number: ${questionNumber}`);
    if((questionNumber) < STORE.length){
        $('.question-number-display').text(`${questionNumber + 1}`);
        $('.js-next-button').hide();
        renderQuestion();
        
    } else {

        let finalDisplay = renderResults(score);
        console.log(finalDisplay);
        $('.js-question-answer-form').html(finalDisplay);
        
        $('.js-next-button').hide();
        $('.js-quiz-start').hide();
    }
});
//--------------------------------------------------------------------------------------END


//--------------------------------------------------------------------------------------START
function renderResults(userScore){
    let finalScoreHTML = "";
    if(userScore < STORE.length/2){
        finalScoreHTML = `<div class="ranking-html water">
        <h2>Looks like you need to visit a zoo or read a book...</h2>
        <img class="icon" src= "images/gold-fish-icon.png">
        <p>YOU RECEIVED THE GOLDFISH EMBLEM</p> 
    </div>`
    } else {
        finalScoreHTML = `<div class="ranking-html water">
        <h2>NOT BAD! You know your meats! You could go work for a Butcher if you wanted to!!!</h2>
        <img class="icon" src= "images/meat_butcher.jpg">
        <p>YOU RECEIVED THE BUTCHER EMBLEM</p> 
    </div>`
    }
    $('.js-restart-button').show();
    return finalScoreHTML;
}
//--------------------------------------------------------------------------------------END


//--------------------------------------------------------------------------------------START
//this will generate the htmlfor the questions, basically the view
function generateQuestion() {
    if(questionNumber < STORE.length){ //accessing question object by STORE index using the questionNumber as the cycler/iterator
        return `
        <div class="question-${questionNumber} window">
        <img class = "animal-picture" src="${STORE[questionNumber].mystery}">
        <h2>${STORE[questionNumber].question}</h2>  

        <form>
        <fieldset>
        <div class="answerOptionA">
        <label>
        <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
        <span>${STORE[questionNumber].answers[0]}</span>
        </label>

        <label>
        <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
        <span>${STORE[questionNumber].answers[1]}</span>
        </label>
        </div>

        <div class="answerOptionB">
        <label>
        <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
        <span>${STORE[questionNumber].answers[2]}</span>
        </label>
        <label>
        <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
        <span>${STORE[questionNumber].answers[3]}</span>
        </label>
        </div>

        <button type="submit" class="js-submit-button">Submit</button>
        </fieldset>
        </form>
        </div>`;
    } else {
        renderResults();
        }

}
//--------------------------------------------------------------------------------------END

