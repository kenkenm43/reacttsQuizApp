import React, { useState } from "react"
import { fetchQuizQuestions } from "./API"
//Components
import QuestionCard from "./components/QuestionCard"
import QuestionSelect from "./components/QuestionSelect"

// Types
import { QuestionState, Difficulty } from "./API"

// Styles
import { GlobalStyle, Wrapper } from "./App.styles"

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const TOTAL_QUESTIONS = 10

const App = () => {

  const [loading, setLoading] = useState(false)
  const [questions, setQuestion] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY)

  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)
    
    console.log('start', difficulty)
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      difficulty
    )

    setQuestion(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // Users answer
      const answer = e.currentTarget.value
      // Check answer again correct answer
      const correct = questions[number].correct_answer === answer
      // Add score if answer if correct
      if (correct) setScore(prev => prev + 1)
      // Save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQuestion = number + 1
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
      setDifficulty(Difficulty.EASY)
    } else {
      setNumber(nextQuestion)
    }
  }

  const changeDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "easy") {
      setDifficulty(Difficulty.EASY)
    }
    if (e.target.value === "medium") {
      setDifficulty(Difficulty.MEDIUM)
    }
    if (e.target.value === "hard") {
      setDifficulty(Difficulty.HARD)
    }
  }

  return (
    <>
    <GlobalStyle />
    <Wrapper>
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <QuestionSelect 
        callback={changeDifficulty}
      />
      ): null}
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
        Start
      </button>
      ): null}
      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading && <p>Loading Questions ...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver &&
      !loading && 
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ):null
      }
    
      </Wrapper>
      </>
  )
}

export default App
