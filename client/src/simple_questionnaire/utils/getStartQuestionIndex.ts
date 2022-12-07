import {TypeUserQuestionnaire} from "./types";

export const getStartQuestionIndex = (userQuestionnaire: TypeUserQuestionnaire) => {
    const found = userQuestionnaire.findIndex(({answer}) => answer === null);
    return found === -1 ? userQuestionnaire.length - 1 : found;
};