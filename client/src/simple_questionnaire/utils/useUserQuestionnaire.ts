import {TypeUserQuestionnaire} from "./types";

const STORAGE_NAME = 'jiugequiz';


export const getStorage = (): Record<string, {
    userQuestionnaire: TypeUserQuestionnaire,
    isSubmitted: boolean
}> => JSON.parse(localStorage.getItem(STORAGE_NAME) ?? '{}');

export const useUserQuestionnaire = () => {
    const setUserQuestionnaire = ({
        userName,
        userQuestionnaire,
        isSubmitted = false,
    }: {
        userName: string,
        userQuestionnaire: TypeUserQuestionnaire | null,
        isSubmitted?: boolean,
    }) => {
        const jiugequiz = getStorage();

        localStorage.setItem(STORAGE_NAME, JSON.stringify({
            ...jiugequiz,
            [userName]: {
                userQuestionnaire,
                isSubmitted,
            },
        }));
    }

    const getUserQuestionnaire = (({userName}: {userName: string}) => {
        const jiugequiz = getStorage();
        const fallback = {
            userQuestionnaire: null,
            isSubmitted: false,
        };

        return userName ? jiugequiz[userName] ?? fallback : fallback;
    });

    return {
        setUserQuestionnaire,
        getUserQuestionnaire,
    }
}