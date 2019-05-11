let questionNumber = 0;
let score = 0;

console.log('anything ');

$('.js-start-button').on('click', event=>{

    console.log(event);

    $('.js-question-answer-form').html(generateQuestion());
    $('.js-quiz-start').hide();
});

function displayFeedback(userAnswer){
    if(userAnswer === STORE[questionNumber].correctAnswer){
        return `<div>
                    <h2>You Got it RIGHT!</h2>
                    <p>correct answer: ${STORE[questionNumber].correctAnswer}</p>
                </div>`;
    }
}


$('#myForm input').on('change', function() {
    alert($('input[name=radioName]:checked', '#myForm').val()); 
 });





$('.js-question-answer-form').on('submit', 'input', event => {
    event.preventDefault();
    console.log(event);

    let answerPicked = getUserAnswer();

    displayFeedback(answerPicked);

    //  displayFeedback(event.CurrentTarget.)
    /*if userchoice ==== question.correctAnswer{
        call display CORRECT feedback div function}
        else {
         call display WRONG feedback div w/correct answer
        }
    } */

})



//this will generate the htmlfor the questions, basically the view
function generateQuestion() {
    if(questionNumber < STORE.length){ //accessing question object by STORE index using the questionNumber as the cycler/iterator
        return `<div class="question-${questionNumber}">
        <h2>${STORE[questionNumber].question}</h2>  
        <form>
        <fieldset>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
        <span>${STORE[questionNumber].answers[0]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
        <span>${STORE[questionNumber].answers[1]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
        <span>${STORE[questionNumber].answers[2]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
        <span>${STORE[questionNumber].answers[3]}</span>
        </label>
        <button type="submit" class="js-submit-button">Submit</button>
        </fieldset>
        </form>
        </div>`;
    } else {
        renderResults();
        restartQuiz();
        $('.questionNumber').text(5);
    }   
}//closing bracket for generateQuestion()