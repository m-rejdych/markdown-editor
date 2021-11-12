//* @jsxImportSource @emotion/react */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkHeadingGap from 'remark-heading-gap';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
interface Props {
  codeLines: string[];
}

interface HeadingGapOptions {
  after: number;
  before: number;
}

const headingGapOptionsMap: { [size: number]: HeadingGapOptions } = {
  1: {
    after: 3,
    before: 3,
  },
  2: {
    after: 2,
    before: 2,
  },
  3: {
    after: 1,
    before: 1,
  },
};

const Preview: React.FC<Props> = ({ codeLines }) => {
  return (
    <div
      css={{
        width: '50%',
        paddingLeft: 16,
        overflow: 'hidden',
        color: '#abb2bf',
        fontSize: 18,
      }}
    >
      <ReactMarkdown
        children={codeLines.join('\n')}
        remarkPlugins={[
          [remarkHeadingGap, headingGapOptionsMap],
          remarkGfm,
        ]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={atomDark}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};

export default Preview;
