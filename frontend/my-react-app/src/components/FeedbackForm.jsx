import { useState } from 'react';

export default function Feedback() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = 'Имя обязательно';
    if (!form.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Некорректный email';
    }
    if (!form.message.trim()) newErrors.message = 'Сообщение обязательно';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmittedData(data);
        setForm({ name: '', email: '', message: '' });
      } else {
        if (data.errors) {
          const backendErrors = {};
          backendErrors.general = data.errors.join('; ');
          setErrors(backendErrors);
        }
      }
    } catch (err) {
      console.error('Ошибка сети:', err);
      setErrors({ general: 'Не удалось отправить отзыв. Попробуйте позже.' });
    } finally {
      setLoading(false);
    }
  };

  if (submittedData) {
    return (
      <div className="feedback-success">
        <h2>Спасибо за ваш отзыв!</h2>
        <p><strong>Имя:</strong> {submittedData.name}</p>
        <p><strong>Email:</strong> {submittedData.email}</p>
        <p><strong>Сообщение:</strong> {submittedData.message}</p>
        <button onClick={() => setSubmittedData(null)}>Отправить ещё</button>
      </div>
    );
  }

  return (
    <div className="feedback-form-container">
      <h2>Обратная связь</h2>
      <form onSubmit={handleSubmit}>
        {errors.general && <p className="error">{errors.general}</p>}

        <div className="form-group">
          <label htmlFor="name">Имя *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={errors.name ? 'error-input' : ''}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? 'error-input' : ''}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Сообщение *</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            className={errors.message ? 'error-input' : ''}
          />
          {errors.message && <span className="error">{errors.message}</span>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Отправка...' : 'Отправить'}
        </button>
      </form>
    </div>
  );
}