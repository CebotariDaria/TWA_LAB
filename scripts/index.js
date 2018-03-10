(function () {
    var questionsJson = [];

    $.getJSON('scripts/questions.json', function(data) {
        questionsJson = data;

        function buildQuiz(myQuestions, quizContainer) {
            const output = [];
            myQuestions.forEach((currentQuestion, questionNumber) => {
                var answers = [];
                for (var letter in currentQuestion.answers) {
                    answers.push(
						`
						<div class="radio radio-success">
						<input type="radio" name="question${questionNumber}" value="${letter}" >
							<label>
									${letter} : ${currentQuestion.answers[letter]}
							</label>
						</div>
						`
                    );
                }

                output.push(
                    `<div class="slide">
                        <div class="card-block">
                            <h4 class="card-title">${currentQuestion.question}</h4>
                        </div>
                        <ul class="list-group list-group-flush answers">${answers.join("")}</ul>
                    </div>`
                );
            });

            quizContainer.innerHTML = output.join("");
        }

        function showResults() {

            const answerContainers = quizContainer.querySelectorAll(".answers");
            let numCorrect = 0;

            questionsJson.forEach((currentQuestion, questionNumber) => {

                const answerContainer = answerContainers[questionNumber];
                const selector = `input[name=question${questionNumber}]:checked`;
                const userAnswer = (answerContainer.querySelector(selector) || {}).value;
                
                if (userAnswer === currentQuestion.correctAnswer) {
                    numCorrect++;
                    answerContainers[questionNumber].style.color = "lightgreen";
                } else {
                    answerContainers[questionNumber].style.color = "red";
                }
            });

            resultsContainer.innerHTML = `${numCorrect} out of ${questionsJson.length}`;
        }

        function showSlide(n) {
            slides[currentSlide].classList.remove("active-slide");
            slides[n].classList.add("active-slide");
            currentSlide = n;

            if (currentSlide === 0) {
                previousButton.style.display = "none";
            } else {
                previousButton.style.display = "inline-block";
            }

            if (currentSlide === slides.length - 1) {
                nextButton.style.display = "none";
                submitButton.style.display = "inline-block";
            } else {
                nextButton.style.display = "inline-block";
                submitButton.style.display = "none";
            }
        }

        function showNextSlide() {
            showSlide(currentSlide + 1);
        }

        function showPreviousSlide() {
            showSlide(currentSlide - 1);
        }


        var currentSlide = 0;
        const previousButton = document.getElementById("previous");
        const nextButton = document.getElementById("next");
        const submitButton = document.getElementById("submit");
        const quizContainer = document.getElementById("quiz");
        const resultsContainer = document.getElementById("results");

        buildQuiz(questionsJson, quizContainer);

        const slides = document.querySelectorAll(".slide");

        showSlide(0);

        submitButton.addEventListener("click", showResults);
        previousButton.addEventListener("click", showPreviousSlide);
        nextButton.addEventListener("click", showNextSlide);
    });

})();