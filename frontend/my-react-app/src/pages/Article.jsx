import { useParams } from 'react-router-dom';

export default function Article() {
  const { id } = useParams(); // айди из юрл

  return (
    <div className="article">
      <h1>Статья {id}</h1>
      <p>Это заглушка для статьи с ID = {id}.</p>
    </div>
  );
}