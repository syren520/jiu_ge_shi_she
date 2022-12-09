import {useRef, useState} from "react";
import {QuestionnairePage} from "./QuestionnairePage";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useUserQuestionnaire} from "./utils/useUserQuestionnaire";
import {WelcomePage} from "./WelcomePage";
import {Introduction} from "./Introduction";
import {Prize} from "./Prize";
import {css} from "styled-components/macro";
import './font.css';

const theme = createTheme({
    palette: {
        text: {
            primary: '#f4bc33',
        },
        background: {
            paper: '#9c1d18'
        },
        primary: {
            main: '#f4bc33',
        }
    },

    typography: {
        fontSize: 18,
        fontFamily: [
            '"MyFont"',
        ].join(','),
      },
});

const SimpleQuestionnaire = () => {
    const [isStart, setIsStart] = useState(false);
    const [userName, setUserName] = useState('');
    const {getUserQuestionnaire} = useUserQuestionnaire();
    const data = getUserQuestionnaire({userName});
    const [isSubmitted, setIsSubmitted] = useState(data.isSubmitted);
    const [score, setScore] = useState<number | null>(null);
    const height = useRef(window.innerHeight);

    return (
        <ThemeProvider theme={theme}>
            <div css={css`background-color: #9c1d18; height: ${height.current}px`}>
                {
                    userName && data.userQuestionnaire !== null && !isSubmitted &&
                        <QuestionnairePage
                                onSubmit={(scoreNew) => {
                                    setIsSubmitted(true);
                                    setScore(scoreNew)
                                }}
                                userName={userName}
                                questionnaire={data.userQuestionnaire}
                        />
                }
                {
                    !userName && isStart && (
                        <Introduction
                            onNameSubmitted={(name, userHasSubmitted, score) => {
                                setUserName(name);
                                setIsSubmitted(userHasSubmitted);
                                setScore(score);
                            }}
                        />
                    )
                }
                {!isStart && <WelcomePage onClick={() => setIsStart(true)}/>}
                {
                    score !== null && (isSubmitted || data.isSubmitted) && (
                        <Prize
                            numberOfQuestions={(data.userQuestionnaire??[]).length}
                            score={score}
                            userName={userName}
                        />
                    )
                }
            </div>
        </ThemeProvider>
    );
};

export default SimpleQuestionnaire;