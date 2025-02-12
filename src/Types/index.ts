export type TService = {
  id: string;
  title: string;
  description: string;
};

export type TArticle = {
  id: string;
  title: string;
  cover: string;
  content: string;
  created_at: string;
  time: string;
  author: string;
  readTime?: string;
  presentation?: string;
};

export type TFeedback = {
  id: string;
  authorName: string;
  authorPosition: string;
  content: string;
};
