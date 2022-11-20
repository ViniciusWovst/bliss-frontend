import axios from 'axios';

type QuestionChoice = {
  choice: string;
  votes: number;
};
export type Question = {
  id: number;
  question: string;
  image_url: string;
  thumb_url: string;
  published_at: string;
  choices: QuestionChoice[];
};

export const getQuestions = async (
  limit: number,
  offset: number,
  filter: string,
): Promise<Question[]> => {
  const res = await axios.get(
    `questions?limit=${limit}&offset=${offset}&filter=${filter}`,
  );
  return res.data;
};
