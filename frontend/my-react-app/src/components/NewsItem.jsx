import { Link } from 'react-router-dom';

export default function NewsItem({ id, title, date }) {
  // проверка сегодняшней даты
  const isToday = (articleDate) => {
    const today = new Date();
    const article = new Date(articleDate);

    return (
      article.getDate() === today.getDate() &&
      article.getMonth() === today.getMonth() &&
      article.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="news-item">
      <h3>
        <Link to={`/news/${id}`} className="news-title-link">
          {title}
          {isToday(date) && <span className="news-badge">Новое!</span>}
        </Link>
      </h3>
      <p className="news-date">{date}</p>
    </div>
  );
}