import firstPrize from './images/firstPrize.png'
import secondPrize from './images/secondPrize.png'
import thirdPrize from './images/thirdPrize.png'
import fourthPrize from './images/fourthPrize.png'
import styled, {css} from "styled-components/macro";
import {BgPaper} from "./components";
import bgPrize from "./images/bgPrize.jpg";
import qr from "./images/qr.png";
import prizeCta from "./images/prizeCta.png";
import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";
import {useState, useRef, useCallback} from "react";
import { toJpeg } from 'html-to-image';
import {LoadingSpinner} from "./components/LoadingSpinner";

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
    onClickConfirm

                                       }: {
    userName: string,
    title: string,
    role: string,
    scoreToDisplay: string,
    onClickConfirm: () => void,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        if (!isLoading) {
            setIsLoading(true);
            await onClickConfirm();
            setIsLoading(false);
            setIsOpen(false);
        }
    };

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
            {
                !isOpen && (
                    <img css={css`
                            width: 200px; 
                            height: 100px;
                            `}
                         src={prizeCta}
                         onClick={() => setIsOpen(true)}
                    />
                )
            }
            {
                isOpen && (
                    <img css={css`
                            margin-top: 15px;
                            width: 100px; 
                            height: 100px;
                        `}
                         src={qr}
                    />
                )
            }
            <Dialog open={isOpen}>
                {
                    isLoading && (
                        <LoadingSpinner
                            css={css`
                                margin: auto;
                                position: absolute;
                                top: 0; left: 0; bottom: 0; right: 0;
                            `}
                        />
                    )
                }
                <DialogContent
                    css={css`position: relative;`}
                >
                    请截图保存该页面，凭此截图可以在载歌在谷-诗词大会活动现场领取小礼品一份，先到先得。
                </DialogContent>
                <DialogActions>
                    <Button
                        variant={'contained'}
                        onClick={handleClick}
                    >
                        截图保存
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const getRewardContent = ({
    userName,
    prize,
    scoreToDisplay,
    onClickConfirm

                                       }: {
    userName: string,
    prize: number,
    scoreToDisplay: string,
    onClickConfirm: () => void
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
                onClickConfirm={onClickConfirm}
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
                <br/>
                亲爱的考生，很遗憾您不幸落榜。
                <br/>
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
    const ref = useRef<HTMLDivElement>(null);
    const prize: number = score / numberOfQuestions;
    const scoreToDisplay = `${score}`;

    let prizeImage = fourthPrize;
    let content = <DefaultContent scoreToDisplay={scoreToDisplay}/>;

    const onClickConfirm = useCallback(
        async () => {
            if (ref.current === null) {
                return
            }

            const dataUrl = await toJpeg(ref.current, {cacheBust: true,});

            const link = document.createElement('a');
            link.download = `shi_ci_ke_ju_result_${Date.now()}.jpeg`;
            link.href = dataUrl;
            link.click();
            link.remove();
        },
        [ref]);


    if (prize >= 0.6) {
        ({prizeImage, content} = getRewardContent({userName, prize, scoreToDisplay, onClickConfirm}));
    }

    return (
        <BgPaper
            ref={ref}
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