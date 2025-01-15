import React from 'react';
import sushiBoat from '../../../public/img/sushiCentro.png'; 
import arrow from '../../../public/img/Curly-Arrow-PNG.png'; 
import exclamation from '../../../public/img/signos.png'; 
import sushiPieza from '../../../public/img/sushiBackground.png'; 
import './SushiDesign.css';

const SushiDesign = () => {
  return (
    <div className="sushi-container">
      <img src={sushiBoat} alt="Sushi Boat" className="sushi-boat" />
      <img src={arrow} alt="Arrow" className="arrow" />
      <img src={exclamation} alt="Exclamation" className="exclamation" />
      <img src = {sushiPieza} alt = "Sushi Pieza" className = "sushi-pieza" />
    </div>
  );
};

export default SushiDesign;