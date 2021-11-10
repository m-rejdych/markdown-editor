// @jsxImportSource @emotion/react */
import React, { useState } from 'react';

import TopBar from './components/TopBar';


const App: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = (): void => {
    setCount((prev) => prev + 1);
  };

  return (
    <div css={{ backgroundColor: 'transparent', marginTop: 30 }}>
      <TopBar />
      <h1>Hello world!</h1>
      <h3>{count}</h3>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
};

export default App;
