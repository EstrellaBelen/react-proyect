import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import atle from './img/atletismo.jpeg';
import paint from './img/dibujo.jpeg';
import rouse from './img/flor.jpeg';
import sky from './img/cielo.jpeg';
import dog from './img/perro.jpeg';
import progra from './img/progra.jpeg';
import travel from './img/viaje.jpeg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';

const Navbar = () => (
  <nav className='navbar'>
    <Link to="/">Inicio</Link>
    <Link to="/carousel">Carrusel</Link>
    <Link to="/empleados">Empleados</Link>
  </nav>
);

const Header = () => (
  <>
    <header className='header'>
      <h2>Estrella Belen </h2>
      <p>Soy una persona alegre, comprensiva, detallista, me gusta enfrentar retos y cuidar de mi salud.</p>
    </header>
    <div className='section'>
      <h2>Gustos e Intereses</h2>
      <p>Me gusta dibujar, viajar, la programación, me gusta el atletismo.</p>
      <div className="interests">        
        <img src={paint} alt="Dibujo" />
        <img src={travel} alt="Viajes" />
        <img src={progra} alt="Programación" />      
        <img src={atle} alt="Atletismo" />
      </div>
    </div>
  </>


);

const ImageCarousel = () => {
  const images = [
    sky,
    dog,
    rouse,
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className='carousel-container'>
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className='carousel-slide'>
            <img src={img} alt={`Slide ${index + 1}`} className='carousel-image' />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const RandomUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://randomuser.me/api/?results=20").then((response) => {
      setUsers(response.data.results);
    });
  }, []);

  return (
    <div className='section'>
      <h2>Nombres de Empleados</h2>
      <table className='user-table'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name.first} {user.name.last}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Contact = () => (
  <div className='section'>
    <h2>Contáctanos</h2>
    <form className='contact-form'>
      <input type="text" placeholder="Nombre" />
      <input type="email" placeholder="Correo electrónico" />
      <textarea placeholder="Mensaje"></textarea>

    </form>
  </div>
);


function App() {
  return (
    <div className='App'>
      <Router>

        <Navbar />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/carousel" element={<ImageCarousel />} />
          <Route path="/empleados" element={<RandomUsers />} />
        </Routes>
        <Contact />
      </Router>
    </div>
  );
}

export default App;
