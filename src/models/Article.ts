export interface ArticleReader {
    id: number;
    title: string;
    author: string;
    duration: string;
    timeAgo: string;
    category: string;
    image: string;
    description: string;
    articleUrl: string;
  }

export interface NewsArticle {
  id: string;
  title: string;
  link: string;
  summary: string;
  interest: string;
  category: string;
  readTime: string;
  publishedAt: string;
  trending: boolean;
  author: string;
}