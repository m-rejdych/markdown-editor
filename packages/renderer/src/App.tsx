import React, { useState } from 'react';
import type { ViewUpdate } from '@codemirror/view';
import type { Text } from '@codemirror/text';

import TopBar from './components/TopBar';
import Editor from './components/Editor';
import Preview from './components/Preview';

interface Update extends Text {
  text: string[];
}

const App: React.FC = () => {
  const [codeLines, setCodeLines] = useState<string[]>([]);

  const handleChange = (update: ViewUpdate): void => {
    setCodeLines((update.state.doc as Update).text);
  };

  return (
    <div
      css={{
        display: 'flex',
        backgroundColor: 'transparent',
        marginTop: 46,
        paddingLeft: 24,
        paddingRight: 24,
        minHeight: 'calc(100vh - 46px)',
      }}
    >
      <TopBar />
      <Editor onChange={handleChange} />
      <Preview codeLines={codeLines} />
    </div>
  );
};

export default App;
