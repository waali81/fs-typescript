import axios from 'axios';
import { useEffect, useState } from 'react';
import type { DiaryEntry } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');

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
    });
  };

  return (
    <div>
      <h2>Add new diary entry</h2>

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

      {diaries.map(diary => (
        <p key={diary.id}>
          {diary.date} {diary.weather} {diary.visibility}
        </p>
      ))}
    </div>
  );
};

export default App;