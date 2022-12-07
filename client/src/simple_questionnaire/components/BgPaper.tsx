import styled from "styled-components/macro";
import {Paper} from "@mui/material";

export const BgPaper = styled(Paper)<{$bgUrl: string, $heightOffset?: string, $heightOverride?: string}>`
    height: ${({$heightOverride, $heightOffset}) => $heightOverride ?? `calc(100vh - ${$heightOffset ?? '0px'})`};
    background: url(${({$bgUrl}) => $bgUrl})  no-repeat center;
    background-size: cover;
`;
