import React from 'react';
import './App.css';
import UserList from './components/UserList';
import EventList from './components/EventList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Välkommen till RaveRave</h1>
        <UserList />
        <EventList />
      </header>
    </div>
  );
}

export default App;
