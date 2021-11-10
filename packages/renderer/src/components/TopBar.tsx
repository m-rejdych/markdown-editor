// @jsxImportSource @emotion/react */
import React from 'react';

const TopBar: React.FC = () => {
  return (
    <div
      css={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 30,
        backgroundColor: '#333',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        WebkitAppRegion: 'drag',
      }}
    />
  );
};

export default TopBar;
