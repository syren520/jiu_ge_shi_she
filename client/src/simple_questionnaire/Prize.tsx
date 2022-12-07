import firstPrize from './images/firstPrize.png'
import secondPrize from './images/secondPrize.png'
import thirdPrize from './images/thirdPrize.png'
import fourthPrize from './images/fourthPrize.png'
import styled, {css} from "styled-components/macro";
import {BgPaper} from "./components";
import bgPrize from "./images/bgPrize.jpg";
import prizeCta from "./images/prizeCta.png";
import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";
import {useState} from "react";

const DefaultContentStyled = styled.div`
    color: black;
    font-size: 17px;
    font-family: STFangsong, serif;
    font-weight: 800;
    overflow: scroll;
    height: 250px;
    width: 215px;
    margin: 0 auto;
`;
const RewardContentStyled = styled(DefaultContentStyled)`
    height: 180px;
    writing-mode: vertical-lr;
`;

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
                {`诗词科举答对`}
                <strong css={css`writing-mode: horizontal-tb;`}>{scoreToDisplay}</strong>
                {`题`}
                <br/>
                {`堪称${title}`}
                <br/>
                {'钦赐称号'}
                {`【${role}】`}
                <br/>
                {'特昭天下'}
                <br/>
                {'钦此'}
            </RewardContentStyled>
            <img src={prizeCta} onClick={() => setIsOpen(true)}/>
            <Dialog open={isOpen}>
                <DialogContent>
                    请截图保存该页面，凭此截图可以在载歌在谷-诗词大会活动现场领取小礼品一份，先到先得。
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

const DefaultContent = ({scoreToDisplay}: {scoreToDisplay: string}) => {
    return (
            <DefaultContentStyled>
                只差一点点哟！
                您在此次科举考试中成绩为: <strong>{scoreToDisplay}</strong>
                <br/>
                亲爱的考生，很遗憾您不幸落榜。
                <br/>
                请继续保持对诗词的热忱，再接再厉！
            </DefaultContentStyled>
        );
};

export const Prize = ({numberOfQuestions, score, userName}: {
    numberOfQuestions: number,
    score: number,
    userName: string,
}) => {
    const prize: number = score / numberOfQuestions;
    // const scoreToDisplay = score.toLocaleString("zh-Hans-CN-u-nu-hanidec");
    const scoreToDisplay = `${score}`;

    let prizeImage = fourthPrize;
    let content = <DefaultContent scoreToDisplay={scoreToDisplay}/>;

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
                    min-height: 70vh;
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