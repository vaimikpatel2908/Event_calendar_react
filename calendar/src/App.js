import React from 'react';
import './App.css';
import Calendar from './Component/Calendar/';


const style={
  position : 'relative',
  margin : '50px auto'
}

function App() {
  return (
    <div className="App">
      <Calendar style={style} width="400px" />
    </div>
  );
}

export default App;
