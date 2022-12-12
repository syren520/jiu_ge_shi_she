import firstPrize from './images/firstPrize.png'
import secondPrize from './images/secondPrize.png'
import thirdPrize from './images/thirdPrize.png'
import fourthPrize from './images/fourthPrize.png'
import styled, {css} from "styled-components/macro";
import {BgPaper} from "./components";
import bgPrize from "./images/bgPrize.jpg";
import prizeCta from "./images/prizeCta.png";
import tryAgain from "./images/tryAgain.png";
import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";
import {useState} from "react";
import {useUserQuestionnaire} from "./utils/useUserQuestionnaire";

const DefaultContentStyled = styled.div`
    font-family: "MyFont";
    color: black;
    font-size: 21px;
    overflow: scroll;
    height: 250px;
    width: 215px;
    margin: 0 auto;
`;
const RewardContentStyled = styled(DefaultContentStyled)`
    height: 195px;
    writing-mode: vertical-lr;
    line-height: 26px;
`;
const Special = styled.span`
    color: #9c1d18;
    font-size: 23px;
`
const Reward = ({
    userName,
    title,
    role,
    scoreToDisplay,

                                       }: {
    userName: string,
    title: string,
    role: string,
    scoreToDisplay: string,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <RewardContentStyled>
                {`奉天承运 皇帝诏曰`}
                <br/>
                <br/>
                {`仕子 ${userName}`}
                <br/>
                {`在诗词科举答对`}
                <strong css={css`writing-mode: horizontal-tb;`}>{scoreToDisplay}</strong>
                {`题`}
                <br/>
                {`堪称`}
                <Special>{title}</Special>
                <br/>
                {'钦赐称号'}
                <Special>{role}</Special>
                <br/>
                {'特昭天下'}
                <br/>
                {'钦此'}
            </RewardContentStyled>
            <img css={css`width: 200px; height: 100px;`} src={prizeCta} onClick={() => setIsOpen(true)}/>
            <Dialog open={isOpen}>
                <DialogContent>
                    请截图保存皇榜页面，凭此截图可以在载歌在谷-诗词大会活动现场领取小礼品一份，先到先得。
                </DialogContent>
                <DialogActions>
                    <Button variant={'contained'} onClick={() => {setIsOpen(false)}}>了解</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const getRewardContent = ({
    userName,
    prize,
    scoreToDisplay,

                                       }: {
    userName: string,
    prize: number,
    scoreToDisplay: string,
}) => {
    let prizeImage;
    let title;
    let role;

    if (prize === 1) {
        prizeImage = firstPrize;
        title = '状元之才';
        role = '诗坛状元';
    } else if (prize >= 0.8) {
        prizeImage = secondPrize;
        title = '博古通今';
        role = '诗坛举人';
    } else {
        prizeImage = thirdPrize;
        title = '满腹经纶';
        role = '诗坛秀才';
    }

    return {
        prizeImage,
        content: (
            <Reward
                userName={userName}
                title={title}
                role={role}
                scoreToDisplay={scoreToDisplay}
            />
        )
    };
}

const DefaultContent = ({scoreToDisplay, userName}: {scoreToDisplay: string, userName: string}) => {
    const {setUserQuestionnaire} = useUserQuestionnaire();

    const handleTryMore = () => {
        setUserQuestionnaire({
            userName, userQuestionnaire: null, isSubmitted: false,
        })
        window.location.reload();
    };
    return (
            <DefaultContentStyled>
                只差一点点哟！
                您在此次科举考试中答对<strong>{scoreToDisplay}</strong>题。
                <br/>
                <br/>
                亲爱的考生，很遗憾您不幸落榜。
                <br/>
                <br/>
                请继续保持对诗词的热忱，再接再厉！
                <br/>
                <img css={css`width: 200px; height: 100px;`} src={tryAgain} onClick={handleTryMore}/>
            </DefaultContentStyled>
        );
};

export const Prize = ({numberOfQuestions, score, userName}: {
    numberOfQuestions: number,
    score: number,
    userName: string,
}) => {
    const prize: number = score / numberOfQuestions;
    const scoreToDisplay = `${score}`;

    let prizeImage = fourthPrize;
    let content = <DefaultContent scoreToDisplay={scoreToDisplay} userName={userName}/>;

    if (prize >= 0.6) {
        ({prizeImage, content} = getRewardContent({userName, prize, scoreToDisplay}));
    }

    return (
        <BgPaper
            $bgUrl={bgPrize}
            css={css`
                display: flex;
                align-items: center;
                justify-content: center;
            `}
        >
            <div
                css={css`
                    min-height: 70%;
                    text-align: center;
                `}
            >
                <img
                    css={css`
                            width: 289px;
                            height: 155px;
                            margin-top: 25px;
                            margin-bottom: 25px;
                    `}
                    src={prizeImage}
                />
                {content}
            </div>
        </BgPaper>
    );
}