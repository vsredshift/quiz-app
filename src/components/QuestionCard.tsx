import React from 'react'
import { AnswerObject } from '../App'
import { Wrapper, ButtonWrapper } from './QuestionCard.styles'

type Props = {
    question: string;
    answers: Array<string>;
    callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNumber: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({ question, answers, callback, userAnswer, questionNumber, totalQuestions}) => {
    return (
        <Wrapper>
            <p className="number">
                Question: {questionNumber} out of {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question}}></p>

            <div>
                {answers.map(answer => (
                    <ButtonWrapper 
                        key={answer}
                        // props with optional chaining
                        correct={userAnswer?.correctAnswer === answer}
                        userClicked={userAnswer?.answer === answer}>


                        <button disabled={!!userAnswer} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: answer}} />
                        </button>
                    </ButtonWrapper>

                ))}
            </div>
        </Wrapper>
    )
}

export default QuestionCard
