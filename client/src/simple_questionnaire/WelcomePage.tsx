import React from "react";
import bgWelcome from "./images/bgWelcome.gif";
import {BgPaper} from "./components";
import {css} from "styled-components/macro";
import bgQuestion from "./images/bgQuestion.jpg";
import bgIntro from "./images/bgIntro.jpg";
import bgPrize from "./images/bgPrize.jpg";

export const WelcomePage = ({onClick}: {onClick: () => void}) => {
    return (
        <div>
            <BgPaper $bgUrl={bgWelcome} onClick={onClick}/>
            <div css={css`height: 0; width: 0; visibility: hidden;`}>
                 <BgPaper $bgUrl={bgQuestion} $heightOverride={'0px'}/>
                 <BgPaper $bgUrl={bgIntro} $heightOverride={'0px'}/>
                 <BgPaper $bgUrl={bgPrize} $heightOverride={'0px'}/>
            </div>
        </div>
    );
};