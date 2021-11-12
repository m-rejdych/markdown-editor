import { useEffect, useRef } from 'react';
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
  containerRef: Ref<HTMLDivElement>;
}

interface Args {
  onChange: (update: ViewUpdate) => void;
}

const useCodeMirror = ({ onChange }: Args): CodeMirrorData => {
  const containerRef = useRef<HTMLDivElement | null>(null);


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
          EditorView.updateListener.of(onChange),
        ],
      }),
      parent: containerRef.current,
    });
  }, []);

  return { containerRef };
};

export default useCodeMirror;
