import {TypeUserQuestionnaire} from "./types";

const fixtures = [
    {
        id: '1',
        question: '谁是诗鬼？',
        options: [
            {
                value: 'liei',
                label: '李贺'
            },
            {
                value: 'libai',
                label: '李白'
            },
            {
                value: 'liyu',
                label: '李煜'
            },
        ],
        answer: null,
    },
    {
        id: '2',
        question: '谁是诗仙？',
        options: [
            {
                value: 'liei',
                label: '李贺'
            },
            {
                value: 'libai',
                label: '李白'
            },
            {
                value: 'liyu',
                label: '李煜'
            },
        ],
        answer: null,
    },
    {
        id: '3',
        question: '谁是诗圣？',
        options: [
            {
                value: 'liei',
                label: '李贺'
            },
            {
                value: 'libai',
                label: '李白'
            },
            {
                value: 'dufu',
                label: '杜甫'
            },
        ],
        answer: null,
    }
];

export const getInitialUserQuestionnaire = async (): Promise<{questions: TypeUserQuestionnaire | null}> => {
    const response = await fetch("/api/simple-questionnaire/get-questions");

    if (response.ok) {
        const data = await response.json();

        return data;
    }

    return {questions: null};
};