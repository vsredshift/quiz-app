import React, { useState } from 'react';
import { getQuestions } from './API';
// IMPORT STYLES
import { GlobalStyle, Wrapper } from './App.styles';

// IMPORT COMPONENTS
import QuestionCard from './components/QuestionCard';

// IMPORT TYPES
import { QuestionState, Difficulty } from './API';


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

// TODO: Let the user decide on number of questions at game start
// TODO: Let the user decide category or random
const TOTAL_QUESTIONS = 10;

function App() {
  // States
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);


  // function to start quiz. Async call to api
  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    // TODO: Allow customer to set difficulty level at start
    const newQuestions = await getQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    // Initialise values after load
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  // Check to evaluate whether given answer is correct
  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // Get Users Answer
      const answer = event.currentTarget.value;

      // Check if correct
      const correct = questions[number].correct_answer === answer;

      // Update score if correct
      if (correct) setScore(prev => prev + 1)

      // Save answer to user answers array
      const AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers(prev => [...prev, AnswerObject])

    }
  }

  // Get next question
  const nextQuestion = () => {
    const nextQuest = number + 1;

    if (nextQuest === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuest)
    }
  }

  // TODO: Add final score and Game Over Card. Change Start Quiz button to Play Again at game's end.
  // TODO: Add dynamic timer based on number of questions and difficulty level.
  // TODO: Store highest score in local Storage.
  return (
    <>
    <GlobalStyle/>
    <Wrapper>
      <h1>Quiz Time!</h1>
      { userAnswers.length === TOTAL_QUESTIONS ? 
        <button className="start" onClick={startQuiz}>Play Again</button>
        : null
      }
      { gameOver ? 
        <button className="start" onClick={startQuiz}>Start Quiz</button>
        : null
      }
      { !gameOver ? <p className="score">Score: {score} </p> : null }
      { loading && <p>Loading Questions...</p> }
      { !loading && !gameOver && (
          <QuestionCard 
          questionNumber= {number + 1}
          totalQuestions = {TOTAL_QUESTIONS}
          question = {questions[number].question}
          answers = {questions[number].answers}
          userAnswer = {userAnswers ? userAnswers[number] : undefined}
          callback = {checkAnswer}
          />
      )}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ?
        (<button className="next" onClick={nextQuestion}>Next Question</button>) : null }
    </Wrapper>
    </>
  );
}

export default App;
