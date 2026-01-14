import Layout from "../components/Layout";
import NewsItem from '../components/NewsItem';

const mockNews = [
  { id: 1, title: 'Статья 1', date: '2026-01-14' },
  { id: 2, title: 'Статья 2', date: '2026-01-12' },
  { id: 3, title: 'Статья 3', date: '2026-01-11' },
];

export default function Home() {
  return (
    <Layout>
        <div className="home-page">
            <h2>Добро пожаловать в Новостной Блог!</h2>
            <div className="news-list">
                {mockNews.map((article) => (
                <NewsItem
                    key={article.id}
                    id={article.id}
                    title={article.title}
                    date={article.date}
                />
                ))}
            </div>
        </div>
    </Layout>

  );
}