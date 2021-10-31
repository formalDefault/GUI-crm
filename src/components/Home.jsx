import React, {useContext, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { ContextStates } from "../context/Estados";  
import Axios from 'axios';   

function Home() { 
    const { listaProspectos } = useContext(ContextStates);   
    const { sinLlamar, setSinLlamar } = useContext(ContextStates);      
    const { stateLoading, setStateLoading } = useContext(ContextStates);  
    const { APIDATA } = useContext(ContextStates);   
    const { setListaProspectos } = useContext(ContextStates); 
    var NSinLlamar = listaProspectos.filter(prop => prop.estado === 'sin llamar');  
    setSinLlamar(NSinLlamar.length) 
 
    useEffect(() => {
        Axios.get(`${APIDATA}/api/system`)
        .then((response) => {
          setStateLoading(false)
          setListaProspectos(response.data); 
        }) 
        .catch((error) => {console.log(error);})
      }, []);  

    let estiloTarjetas = "border shadow-lg xl:hover:shadow-2xl duration-500 px-2 py-6 rounded-2xl text-center";
    return (
      <div className="">
        {stateLoading ? (
          <div className="mt-64 m-auto text-5xl text-center w-3/6">
            <i className=" animate-spin fas fa-circle-notch"></i>
          </div>
        ) : (
          <div className="mt-36 xl:mt-56">
            <div className="m-auto w-8/12 p-2 grid grid-cols-1 xl:grid-cols-2 gap-12">
              <NavLink to="/prospectos" className={estiloTarjetas}>
                <b>{sinLlamar}</b>
                <br />
                <b>Prospectos sin llamar</b>
              </NavLink>
              <NavLink to="/pendientes" className={estiloTarjetas}>
                <b>0</b>
                <br />
                <b>Pendientes</b>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    );
}

export default Home
