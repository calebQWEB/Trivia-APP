const startPage = document.getElementById('start-page')
const categoryPage = document.getElementById('category-page')
const getStarted = document.querySelector('.get-started')
const cardSpan = document.querySelectorAll('.card-span')
const difficultyMain = document.querySelectorAll('.difficulty')
const difficultyPage = document.querySelector('.trivia__difficulty-page')

// Question and answer
const questionPage = document.getElementById('question-page')
const question = document.querySelector('.question')
const allAnswers = document.querySelector('.answers')

// result
const resultPage = document.querySelector('.trivia__result-page')
const score = document.querySelector('.score')
const newGame = document.querySelector('.new-game')
const scoreStatement = document.querySelector('.score-statement')
const questionNumber = document.querySelector('.question-count')

let cardText
let difficulty

// the array where all the fetched answers will be pushed to
let answerArray = []

// All the correct answer you chose
let correctArray = []

let questionCount = 1


const addCategories = () => {
    questionNumber.innerHTML = `${questionCount}/10`
    cardSpan.forEach(card => {
        card.addEventListener('click', () => {
            cardText = card.innerHTML
            categoryPage.style.display = 'none'
            difficultyPage.removeAttribute('hidden')

            difficultyMain.forEach(dif => {
                dif.addEventListener('click', () => {
                    difficulty = dif.innerHTML
                    difficultyPage.style.display = 'none'
                    questionPage.removeAttribute('hidden')

                    fetch(`https://the-trivia-api.com/api/questions?categories=${cardText}&limit=1&difficulty=${difficulty}`)
                        .then(response => response.json())
                        .then(data => {
                            question.innerHTML = data[0].question

                            // Getting the answers and pushing them to answerArray above
                            answerArray.push(data[0].correctAnswer)
                            data[0].incorrectAnswers.forEach(incorrect => {
                                answerArray.push(incorrect)
                            })

                            // Shuffling the array
                            for (let i = answerArray.length - 1; i >= 1; i--) {
                                let j = Math.floor(Math.random() * (i + 1)); // 0 <= j <= i
                                let temp = answerArray[j];
                                answerArray[j] = answerArray[i];
                                answerArray[i] = temp;
                            }

                            // Collecting each of the answers from the array and appending it 
                            // to a div(created) and adding a class(created) then appending everything
                            // to the answers div
                            answerArray.forEach(answer => {
                                const answersCard = document.createElement('div')
                                answersCard.classList.add('answer-cards')

                                answersCard.append(answer)
                                allAnswers.append(answersCard)

                                // For every answer you clicked
                                answersCard.addEventListener('click', () => {
                                    if (answersCard.innerHTML === data[0].correctAnswer) {
                                        correctArray.push(answersCard.innerHTML)
                                    }
                                    secondQuestion()
                                })
                            })
                        })
                })
            })
        })
    })
}

const secondQuestion = () => {
    questionCount++
    allAnswers.innerHTML = ''
    answerArray.length = 0
    questionNumber.innerHTML = `${questionCount}/10`

    // Setting the limit of questions to be asked
    if (questionCount > 10) {
        resultPage.removeAttribute('hidden')
        questionPage.style.display = 'none'
        score.innerHTML = correctArray.length * 10 + '%'
        scoreStatement.innerHTML = `You got ${correctArray.length} out of 10`
    } else {
        fetch(`https://the-trivia-api.com/api/questions?categories=${cardText}&limit=1&difficulty=${difficulty}`)
            .then(response => response.json())
            .then(data => {
                question.innerHTML = data[0].question

                // Getting the answers and pushing them to answerArray above
                answerArray.push(data[0].correctAnswer)
                data[0].incorrectAnswers.forEach(incorrect => {
                    answerArray.push(incorrect)
                })

                // Shuffling the array
                for (let i = answerArray.length - 1; i >= 1; i--) {
                    let j = Math.floor(Math.random() * (i + 1)); // 0 <= j <= i
                    let temp = answerArray[j];
                    answerArray[j] = answerArray[i];
                    answerArray[i] = temp;
                }

                // Collecting each of the answers from the array and appending it 
                // to a div(created) and adding a class(created) then appending everything
                // to the answers div
                answerArray.forEach(answer => {
                    const answersCard1 = document.createElement('div')
                    answersCard1.classList.add('answer-cards')

                    answersCard1.append(answer)
                    allAnswers.append(answersCard1)

                    // Checking whether the answers is correct or not
                    answersCard1.addEventListener('click', () => {
                        // If your answer is correct it gets pushed to an array to be used later
                        if (answersCard1.innerHTML === data[0].correctAnswer) {
                            correctArray.push(answersCard1.innerHTML)
                        }
                        secondQuestion()
                    })
                })

            })
    }
}



// Get started button will call the add categories button when clicked
getStarted.addEventListener('click', () => {
    startPage.style.display = 'none'
    categoryPage.removeAttribute('hidden')

    addCategories()
})

newGame.addEventListener('click', () => {
    location.reload()
})



// Animations
let tl = gsap.timeline()

tl.from('#start-page > h1', {
    opacity: 0,
    y: -50,
    duration: 1,
    ease: 'tween'
})

tl.from('.get-started', {
    scale: 0,
    ease: 'elastic',
    duration: 1,
})













