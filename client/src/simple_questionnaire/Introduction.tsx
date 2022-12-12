import {Button, FormControl, FormLabel, Paper, TextField, Typography} from "@mui/material";
import React, {FormEvent, useState} from "react";
import {useUserQuestionnaire} from "./utils/useUserQuestionnaire";
import {getInitialUserQuestionnaire} from "./utils/getInitialUserQuestionnaire";
import {BgPaper} from "./components";
import bgIntro from "./images/bgIntro.jpg";
import userNameInput from "./images/userNameInput.png";
import styled, {css} from "styled-components/macro";
import {getScore} from "./utils/getScore";

const IntroductionContainer = styled(BgPaper)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const IntroductionContent = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    max-width: 200px;
`;

export const Introduction = ({onNameSubmitted}: {onNameSubmitted: (userName: string, isSubmitted: boolean, score: number | null) => void}) => {
    const {setUserQuestionnaire, getUserQuestionnaire} = useUserQuestionnaire();
    const [userName, setUserName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const {userQuestionnaire, isSubmitted} = getUserQuestionnaire({userName});

        if (userQuestionnaire === null) {
            setIsLoading(true);

            const {questions} = await getInitialUserQuestionnaire({userName});

            setIsLoading(false);

            if (questions !== null) {
                setUserQuestionnaire({
                    userName, userQuestionnaire: questions,
                });
                onNameSubmitted(userName, false, null);
            }
        } else {
            if (isSubmitted) {
                setIsLoading(true);
                const score = await getScore({userQuestionnaire, userName, isRevisit: true});
                setIsLoading(false);

                if (score !== null) {
                    onNameSubmitted(userName, isSubmitted, score);

                    return;
                }

            } else {
                onNameSubmitted(userName, isSubmitted, null);
            }

        }

    }

    return (
        <IntroductionContainer $bgUrl={bgIntro}>
            <IntroductionContent>
                <Typography variant={'subtitle1'}>
                    欢迎各位仕子来到诗词科举考场！<br/>
                    本场科举共20题，考试时间不限。预计答题所花时间为十分钟。
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl
                        css={css`
                            gap: 10px;
                        `}
                    >
                        <FormLabel id="username">
                            <Typography
                                variant={'subtitle2'}
                                component={'span'}
                                css={css`color: #f4bc33; font-weight: bold;`}
                            >
                                请输入你的名字
                            </Typography>
                        </FormLabel>
                        <input
                            aria-describedby='username'
                            type={'text'}
                            value={userName}
                            onChange={(event) => setUserName(event.target.value)}
                            css={css`
                                background: url(${userNameInput})  no-repeat center;
                                background-size: contain;
                                padding-left: 38px;
                                width: 110px;
                                height: 40px;
                                color: green;
                                border: none;
                                color: #f4bc33;
                                font-size: 23px;
                                
                                :focus-visible {
                                    outline: none;
                                }
                            `}
                        />
                        <div css={css`text-align: center`}>
                            <Button
                                disabled={isLoading}
                                type={'submit'}
                                variant={'contained'}
                            >
                                开始
                            </Button>
                        </div>
                    </FormControl>
                </form>
            </IntroductionContent>
        </IntroductionContainer>
    );
};