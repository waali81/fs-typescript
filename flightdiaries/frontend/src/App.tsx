import axios from 'axios';
import { useEffect, useState } from 'react';
import type { DiaryEntry } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios.get<DiaryEntry[]>('/api/diaries').then(response => {
      setDiaries(response.data);
    });
  }, []);

  return (
    <div>
      {diaries.map(diary => (
        <p key={diary.id}>
          {diary.date} {diary.weather} {diary.visibility}
        </p>
      ))}
    </div>
/*     <div>
      <h1>Flight Diaries</h1>
    </div> */
  );
};

export default App;