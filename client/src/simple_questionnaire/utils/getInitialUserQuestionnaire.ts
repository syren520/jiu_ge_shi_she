import {TypeUserQuestionnaire} from "./types";

export const getInitialUserQuestionnaire = async ({userName}: {userName: string}): Promise<{questions: TypeUserQuestionnaire | null}> => {
    const response = await fetch("/api/simple-questionnaire/get-questions", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName,
        })
    });

    if (response.ok) {
        const data = await response.json();

        return data;
    }

    return {questions: null};
};