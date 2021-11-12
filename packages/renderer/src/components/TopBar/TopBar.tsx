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
        WebkitUserSelect: 'none',
        userSelect: 'none',
        WebkitAppRegion: 'drag',
        zIndex: 1,
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      <div
        css={{
          display: 'flex',
          marginLeft: 32,
          alignItems: 'center',
        }}
      >
        <button
          id="close-button"
          onClick={window.electron.close}
          css={{
            backgroundColor: '#ffadad',
            width: 12,
            height: 12,
            borderRadius: '50%',
            marginRight: 16,
            border: 'none',
          }}
        />
        <button
          id="minimize-button"
          onClick={window.electron.minimize}
          css={{
            backgroundColor: '#fdffb6',
            width: 12,
            height: 12,
            borderRadius: '50%',
            border: 'none',
            marginRight: 16,
          }}
        />
        <button
          id="maximize-button"
          onClick={window.electron.maximize}
          css={{
            backgroundColor: '#caffbf',
            width: 12,
            height: 12,
            border: 'none',
            borderRadius: '50%',
          }}
        />
      </div>
    </div>
  );
};

export default TopBar;
