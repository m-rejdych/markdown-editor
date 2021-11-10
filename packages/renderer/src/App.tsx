// @jsxImportSource @emotion/react */
import React from 'react';

import TopBar from './components/TopBar';
import Editor from './components/Editor';
import Preview from './components/Preview';

const App: React.FC = () => (
  <div css={{ display: 'flex', backgroundColor: 'transparent', marginTop: 30 }}>
    <TopBar />
    <Editor />
    <Preview />
  </div>
);

export default App;
