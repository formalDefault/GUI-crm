import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import ContextStates from "./context/Estados";      
import img from "./img/imagenes"
import Aos from "aos";
import Pendientes from "./components/Pendientes";
import Prospectos from "./components/Prospectos";
import Formulario from "./components/Formulario";
import VistaTarjeta from "./components/VistaTarjeta";
import Home from "./components/Home";
 

const Navbar = () => {
  const [stateMenu, setStateMenu ] =  useState(false);
  const handleChange = () => setStateMenu(current => !current)

  const menuOpciones = () => {
    return(
      <div data-aos="fade-left"  data-aos-duration="400" className="z-50 xl:hidden text-white float-right py-4 w-5/12 bg-black grid grid-rows gap-y-2">
        <NavLink exact to="/" activeClassName="text-yellow-600" onClick={handleChange} className="px-4 py-2 flex justify-between">
          <i className="fas fa-home text-lg"></i>
          <h1>Home</h1>
        </NavLink> 
        <NavLink onClick={handleChange} className="px-4 py-2 flex justify-between" activeClassName="text-yellow-600" to="/pendientes">
          <i className="far fa-clock text-lg"></i>
          <h1>Pendientes</h1>
        </NavLink> 
        <NavLink to="/prospectos" activeClassName="text-yellow-600" onClick={handleChange} className="px-4 py-2 flex justify-between">
          <i className="fas fa-users text-lg"></i> 
          <h1>Prospectos</h1>
        </NavLink> 
      </div>
    )
  }

  return (
    <div data-aos="fade-down" className="z-50 fixed w-screen ">
      <div className=" bg-black px-4 py-1 text-white flex justify-between">
        <img
          onClick={() => window.location.assign("/")}
          src={img.Logotipo}
          alt="logo"
          className="w-4 cursor-pointer"
        />
        <i
          onClick={handleChange}
          className="fas fa-bars text-2xl xl:hidden"
        ></i>
        <div className="hidden xl:flex pr-8">
          <NavLink
            exact
            to="/"
            activeClassName="text-yellow-600"
            className="px-8 py-2 flex justify-between"
          >
            <h1>Home</h1>
          </NavLink>
          <NavLink
            className="px-8 py-2 flex justify-between"
            activeClassName="text-yellow-600"
            to="/pendientes"
          >
            <h1>Pendientes</h1>
          </NavLink>
          <NavLink
            to="/prospectos"
            activeClassName="text-yellow-600"
            className="px-8 py-2 flex justify-between"
          >
            <h1>Prospectos</h1>
          </NavLink>
        </div>
      </div>
      {stateMenu ? menuOpciones() : null}
    </div>
  );
}

const page404 = () => {
  return (
    <div className="bg-gray-900 h-screen pt-32 text-white">
      <div className="m-auto text-center w-10/12 ">
        <h1 className="text-3xl my-8">Error 404</h1>
        <img src={img.Logotipo} alt="logo" className="w-24 m-auto" />
        <h1 className="text-2xl my-4">Lo sentimos no encontramos esta pagina</h1>
      </div>
    </div>
  )
}

function App() { 
  useEffect(() => {
    Aos.init({ duration: 650 });  
  }, []);  
  
  return (
    <div className="">
      <ContextStates>
        <Router>
          {Navbar()}
          <Switch>
            <Route exact path="/pendientes">
              <div className="pt-9"><Pendientes/></div>
            </Route>
            <Route exact path="/agregar">
              <div className="pt-9"><Formulario/> </div> 
            </Route>
            <Route exact path="/prospectos">
              <div className="pt-9"><Prospectos/> </div> 
            </Route>
            <Route exact path="/detalles/">
              <div className="pt-9"><VistaTarjeta/> </div> 
            </Route>
            <Route exact path="/">
              <div className="pt-9 xl:pt-12"><Home/> </div> 
            </Route>
            <Route path="*" component={page404} />
          </Switch>
        </Router>
      </ContextStates>
    </div>
  );
}

export default App;
