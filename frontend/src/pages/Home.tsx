// Home.tsx
import React from 'react';
import SmileyContainer from '../components/SmileyContainer';
import './Home.css';


const Home: React.FC = () => {
  return (
    <div className="home" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <SmileyContainer />
       <div className="home-text">
        <h1>Välkommen till RaveRave</h1>
        <p>Curated förening & medlemskapsfester</p>
        <button className="button">Starta RaveRave</button>
        <button className="button">Logga In</button>
      </div>
    </div>
  );
};

export default Home;
