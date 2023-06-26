export interface SingePost  {
  title: string;
  date: string;
  tags: string[];
  description: string;
  slug: string;
};

export interface PaginatedPost {
  date: string;
  description: string;
  id: string;
  slug: string;
  tags: string[];
  title: string;
};
