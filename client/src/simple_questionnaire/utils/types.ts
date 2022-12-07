export type TypeUserQuestionnaire = TypeUserQuestionnaireQuestion[];
export type TypeUserQuestionnaireQuestion = {
    id: string,
    question: string,
    options: {value: string, label: string}[],
    answer: string | null;
};