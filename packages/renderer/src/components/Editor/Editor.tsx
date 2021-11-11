//* @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from 'react';
import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
import { markdown } from '@codemirror/lang-markdown';
import type { ViewUpdate } from '@codemirror/view';

const Editor: React.FC = () => {
  const [value, setValue] = useState('Hello world!');
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (update: ViewUpdate): void => {
    setValue(update.state.doc.text[0]);
  };

  useEffect(() => {
    new EditorView({
      state: EditorState.create({
        doc: value,
        extensions: [
          basicSetup,
          markdown(),
          EditorView.updateListener.of(handleChange),
        ],
      }),
      parent: containerRef.current,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      css={{
        width: '50%',
        paddingTop: 24,
        paddingLeft: 24,
        paddingBottom: 24,
        paddingRight: 16,
      }}
    >
      Hello editor
    </div>
  );
};

export default Editor;
