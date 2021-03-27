import './App.css';
import React from 'react';

function App() {
  const [command, setCommand] = React.useState('');
  const [buffer, setBuffer] = React.useState([`Type 'help' to get a list of commands.`]);
  const inputRef = React.createRef();
  
  const handleClick = () => {
    inputRef.current.focus();
  }
  const handleOnKeyUp = e => {
    let parsedCommand = command.toLowerCase().trim();

    if (e.key === 'Enter' && e.keyCode === 13 && parsedCommand) {
      let output = commands[parsedCommand];
      if(!output) {
        output = `Invalid command: ${command}`;
      } else {
        output = output();
      }

      if(typeof output === 'string') {
        setBuffer([...buffer, command, output]);
      } else {
        setBuffer([...buffer, command, ...output]);
      }
      setCommand('');
    }
  };
  return (
    <div className="terminal-container" >
      { buffer.length > 0 && buffer.map(b => {
        return (<div className="command" key={Math.random()}>
          {`> `} {b}
        </div>);
      })}
      <div onClick={handleClick} className="command input">{`> `}
        <span>{command}</span>
        <input 
          ref={inputRef} 
          type="text" 
          value={command} 
          onChange={(e) => setCommand(e.target.value)}
          onKeyUp={handleOnKeyUp}/>
        <Cursor/>
      </div>
    </div>
  );
}

function Cursor() {
  const [opaque, setOpaque] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setOpaque(!opaque);
    }, 500)
    
    return (() => {
      clearInterval(interval);
    });
  })
  return (
  <span className={`cursor ${opaque&&'opaque'}`}>
    |
  </span>);
}

const commands = {
  'ls': () => {
    return ['Project: YTsync', 'Project: foodie'];
  },
  'help': () => {
    return ['Here are a list of commands:', `'ls'`, `'more [project]'`]
  },
  'more ytsync': () => ['YTsync is web application for those wanting to watch youtube videos together. Features include: live chat, queueing of videos, and a synchronized player.',
  <>Visit the website:<a className="command-link" href="https://modest-benz-608ea8.netlify.app/">https://modest-benz-608ea8.netlify.app/</a></>,
  'Repositories:',
  <>Client:<a className="command-link" href="https://github.com/janeligio/ytsync-client">https://github.com/janeligio/ytsync-client</a></>,
  <>Server:<a className="command-link" href="https://github.com/janeligio/ytsync-server">https://github.com/janeligio/ytsync-server</a></>,
  ],
};
export default App;
