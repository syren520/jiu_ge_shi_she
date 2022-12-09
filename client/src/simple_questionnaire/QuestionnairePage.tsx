import React, {useEffect, useState} from 'react';
import {
    Typography,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
} from "@mui/material";
import {css} from "styled-components/macro";
import {useUserQuestionnaire} from "./utils/useUserQuestionnaire";
import {TypeUserQuestionnaire, TypeUserQuestionnaireQuestion} from "./utils/types";
import {getRemainingQuestions} from "./utils/getRemainingQuestions";
import {getStartQuestionIndex} from "./utils/getStartQuestionIndex";
import {BgPaper} from "./components/BgPaper";
import bgQuestion from "./images/bgQuestion.jpg"
import {getScore} from "./utils/getScore";

export const QuestionnairePage = ({
  userName,
  questionnaire,
  onSubmit
}: {
    userName: string,
    questionnaire: TypeUserQuestionnaire,
    onSubmit: (score: number) => void
}) => {
    const {setUserQuestionnaire} = useUserQuestionnaire();
    const [questionIndex, setQuestionIndex] = useState<number>(getStartQuestionIndex(questionnaire));
    const [answers, setAnswers] = useState<TypeUserQuestionnaireQuestion[]>(questionnaire);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setUserQuestionnaire({userName, userQuestionnaire: answers})
    }, [answers]);

    const question = answers[questionIndex];
    const remainingQuestions = getRemainingQuestions(answers);

    const handleMove = (index: number) => {
        const nextStep = Math.min(Math.max(questionIndex + index, 0), answers.length-1);

        setQuestionIndex(nextStep);
    };

    const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAnswers = [...answers];

        newAnswers[questionIndex] = {
            ...question,
            answer: event.target.value,
        }
        setAnswers(newAnswers);
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        const score = await getScore(answers);
        setIsLoading(false);

        if (score !== null) {
            setUserQuestionnaire({userName, userQuestionnaire: answers, isSubmitted: true});
            onSubmit(score);
        }
    };

    return (
        <BgPaper $bgUrl={bgQuestion}>
            <div
                css={css`
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding-top: 180px;
                    flex-direction: column;
                    gap: 20px;
                    width: 68%;
                    margin: 0 auto;
                `}
            >
                <div css={css`width: 100%;`}>
                    <Typography css={css`float: left;`}>已答{answers.length - remainingQuestions.length}题</Typography>
                    <Typography css={css`float: right;`}>未答{remainingQuestions.length}题</Typography>
                </div>
                <FormControl
                    key={question.id}
                >
                    <FormLabel
                        id="question"
                        css={css`margin-bottom: 20px; color: #f4bc33; font-weight: 800;`}
                    >
                        {question.question}
                    </FormLabel>
                    <RadioGroup
                        onChange={handleChangeAnswer}
                        value={question.answer}
                        aria-labelledby="question"
                        css={`
                            gap: 5px;
                            .PrivateSwitchBase-input {
                                color: #f4bc33;
                            }
                        `}
                    >
                        {
                            question.options.map((option) => {
                                return (
                                    <FormControlLabel
                                        key={option.value}
                                        value={option.value}
                                        control={
                                            <Radio
                                                sx={{
                                                    '&, &.Mui-checked': {
                                                      color: '#f4bc33',
                                                    },
                                                  }}
                                            />
                                        }
                                        label={option.label}
                                    />
                                );
                            })
                        }
                    </RadioGroup>
                </FormControl>
                <div
                    css={css`width: 100%;`}
                >
                    {
                        questionIndex > 0 && (
                            <Button
                                css={css`float: left`}
                                size={'small'}
                                disabled={isLoading}
                                variant={'contained'}
                                onClick={() => handleMove(-1)}
                            >
                                上一题
                            </Button>
                        )
                    }
                    {
                        questionIndex < answers.length - 1 && (
                            <Button
                                css={css`float: right`}
                                size={'small'}
                                disabled={isLoading}
                                variant={'contained'}
                                onClick={() => handleMove(1)}
                            >
                                下一题
                            </Button>
                        )
                    }
                    {
                        questionIndex == answers.length - 1 && (
                            <Button
                                css={css`float: right`}
                                size={'small'}
                                variant={'contained'}
                                disabled={isLoading}
                                onClick={handleSubmit}
                            >
                                交卷
                            </Button>
                        )
                    }
                </div>
            </div>
        </BgPaper>
    )
};