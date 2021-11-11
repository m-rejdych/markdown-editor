//* @jsxImportSource @emotion/react */
import React from 'react';
import useCodeMirror from './hooks/useCodeMirror';

const Editor: React.FC = () => {
  const { containerRef } = useCodeMirror();

  return (
    <>
      <div
        ref={containerRef}
        css={{
          color: '#fff',
          width: '50%',
          paddingRight: 16,
          fontSize: 18,
          overflow: 'hidden',
        }}
      />
    </>
  );
};

export default Editor;
