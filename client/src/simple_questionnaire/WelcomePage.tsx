import React from "react";
import bgWelcome from "./images/bgWelcome.gif";
import {BgPaper} from "./components";
import {css} from "styled-components/macro";
import bgQuestion from "./images/bgQuestion.jpg";
import bgIntro from "./images/bgIntro.jpg";
import bgPrize from "./images/bgPrize.jpg";
import qr from "./images/qr.png";
import {Typography} from "@mui/material";

export const WelcomePage = ({onClick}: { onClick: () => void }) => {
    return (
        <>
            <BgPaper $bgUrl={bgWelcome} onClick={onClick}>
                <div css={css`height: 0; width: 0; visibility: hidden;`}>
                    <BgPaper $bgUrl={bgQuestion}/>
                    <BgPaper $bgUrl={bgIntro}/>
                    <BgPaper $bgUrl={bgPrize}/>
                    <Typography>welcome</Typography>
                </div>
            </BgPaper>
        </>
    );
};