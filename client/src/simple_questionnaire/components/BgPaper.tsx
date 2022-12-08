import styled from "styled-components/macro";
import {Paper} from "@mui/material";

export const BgPaper = styled(Paper)<{$bgUrl: string}>`
    height: 100%;
    background: url(${({$bgUrl}) => $bgUrl})  no-repeat center;
    background-size: cover;
`;
