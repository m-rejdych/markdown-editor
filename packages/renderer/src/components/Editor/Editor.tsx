import React from 'react';
import useCodeMirror from './hooks/useCodeMirror';
import type { ViewUpdate } from '@codemirror/view';

interface Props {
  onChange: (update: ViewUpdate) => void;
}

const Editor: React.FC<Props> = ({ onChange }) => {
  const { containerRef } = useCodeMirror({ onChange });

  return (
    <>
      <div
        ref={containerRef as React.Ref<HTMLDivElement>}
        css={{
          color: '#abb2bf',
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
