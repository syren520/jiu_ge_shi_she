import {TypeUserQuestionnaire} from "./types";

export const getScore = async (userQuestionnaire: TypeUserQuestionnaire): Promise<number | null> => {
    const response = await fetch("/api/simple-questionnaire/validate-questions", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            answers: userQuestionnaire,
        })
    });

    if (response.ok) {
        const {score} = await response.json();

        return score ?? null;
    }

    return null;
};