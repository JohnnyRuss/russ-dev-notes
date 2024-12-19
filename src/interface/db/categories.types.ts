export type CategoryT = {
  _id: string;
  title: string;
  query: string;
  thumbnail?: string;
};

export type TopicT = {
  _id: string;
  title: string;
  query: string;
  thumbnail?: string;
  category: string;
};
