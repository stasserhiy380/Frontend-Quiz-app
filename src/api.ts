import type { Quizzes } from "./types";

export async function loadJson<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return (await response.json()) as T;
}

export async function loadQuizzes(url: string): Promise<Quizzes> {
    return loadJson<Quizzes>(url);
}