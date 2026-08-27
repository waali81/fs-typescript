import axios from 'axios';
import { useEffect, useState } from 'react';
import type { DiaryEntry } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get<DiaryEntry[]>('/api/diaries').then(response => {
      setDiaries(response.data);
    });
  }, []);

  const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();

    axios.post<DiaryEntry>('/api/diaries', {
      date,
      weather,
      visibility,
      comment
    }).then(response => {
      setDiaries(diaries.concat(response.data));
      setDate('');
      setWeather('');
      setVisibility('');
      setComment('');
      setError('');
    }).catch(error => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.error[0];
        const field = errorMessage.path[0];

        const value =
          field === 'weather' ? weather :
          field === 'visibility' ? visibility :
          date;

        setError(
          value
            ? `Error: Incorrect ${field}: ${value}`
            : `Error: Incorrect ${field}`
        );
      } else {
        setError('Unknown error');
      }
    });
  };

  return (
    <div>
      <h2>Add new diary entry:</h2>

      {error && <p>{error}</p>}

      <form onSubmit={addDiary}>
        <div>
          Date:
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <div>
          Weather:
          <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>

        <div>
          Visibility:
          <input
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>

        <div>
          Comment:
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>

        <button type="submit">Add</button>
      </form>

      <h3>Diary entries:</h3>

      {diaries.map(diary => (
        <div key={diary.id}>
          <h4>{diary.date}</h4>
          <div>Weather: {diary.weather}</div>
          <div>Visibility: {diary.visibility}</div>
        </div>
      ))}
    </div>
  );
};

export default App;