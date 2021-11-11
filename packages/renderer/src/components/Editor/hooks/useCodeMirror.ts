import { useEffect, useState, useRef } from 'react';
import type { Ref } from 'react';
import {
  markdown,
  markdownKeymap,
  markdownLanguage,
} from '@codemirror/lang-markdown';
import { defaultKeymap } from '@codemirror/commands';
import { languages } from '@codemirror/language-data';
import {
  defaultHighlightStyle,
} from '@codemirror/highlight';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { lineNumbers, highlightActiveLineGutter } from '@codemirror/gutter';
import { oneDark } from '@codemirror/theme-one-dark';
import { history, historyKeymap } from '@codemirror/history';
import { bracketMatching } from '@codemirror/matchbrackets';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/closebrackets';
import type { ViewUpdate } from '@codemirror/view';

import { transparentTheme, syntaxHighlighting } from '../constants/styles';

interface CodeMirrorData {
  values: string[];
  containerRef: Ref<HTMLDivElement>;
}

const useCodeMirror = (): CodeMirrorData => {
  const [values, setValues] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (update: ViewUpdate): void => {
    setValues(update.state.doc.text);
  };

  useEffect(() => {
    new EditorView({
      state: EditorState.create({
        doc: 'Hello world!',
        extensions: [
          keymap.of(markdownKeymap),
          keymap.of(defaultKeymap),
          keymap.of(historyKeymap),
          keymap.of(closeBracketsKeymap),
          markdown({
            base: markdownLanguage,
            codeLanguages: languages,
            addKeymap: true,
          }),
          lineNumbers(),
          syntaxHighlighting,
          highlightActiveLineGutter(),
          defaultHighlightStyle.fallback,
          oneDark,
          transparentTheme,
          history(),
          bracketMatching(),
          closeBrackets(),
          EditorView.lineWrapping,
          EditorView.updateListener.of(handleChange),
        ],
      }),
      parent: containerRef.current,
    });
  }, []);

  return { values, containerRef };
};

export default useCodeMirror;
