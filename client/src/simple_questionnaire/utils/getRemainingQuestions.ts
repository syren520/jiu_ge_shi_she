import {TypeUserQuestionnaire} from "./types";

export const getRemainingQuestions = (userQuestionnaire: TypeUserQuestionnaire) => {
    return userQuestionnaire.filter(({answer}) => answer === null);
};