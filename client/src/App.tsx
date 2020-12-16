import React from 'react';
import { Grommet } from 'grommet';
import Home from './features/home/components/Home';

function App() {
  return (
    <div className="App">
      <Grommet plain>
        <Home/>
      </Grommet>
    </div>
  );
}

export default App;
