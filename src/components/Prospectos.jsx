import React, {useContext, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { ContextStates } from "../context/Estados";  
import Axios from 'axios';   

const BarraDeInformacion = () => {

    const { showFilter, setShowFilter } = useContext(ContextStates);
    const { listaProspectos } = useContext(ContextStates);  
    const { filterOpc, setFilter } = useContext(ContextStates);  
    const { sinLlamar, setSinLlamar } = useContext(ContextStates);   
    const { llamados, setLlamados } = useContext(ContextStates);   
    const { rechazados, setRechazados } = useContext(ContextStates);    
    var NSinLlamar = listaProspectos.filter(prop => prop.estado === 'sin llamar'); 
    var NRechazados = listaProspectos.filter(prop => prop.estado === 'Rechazado'); 
    var NSinContestar = listaProspectos.filter(prop => prop.estado === 'No contesto'); 
    setSinLlamar(NSinLlamar.length)
    setRechazados(NRechazados.length)
    setLlamados(NSinContestar.length + NRechazados.length)

    const mostrarFiltro = () => setShowFilter(current => !current);

    const handleChange = (event) => { 
        setFilter(event.target.value);
      }

    return (
      <div className="bg-white ">
        <div className="fixed w-screen bg-white border-b text-gray-500 px-4 py-1 text-center flex justify-between">
          <div>
            <h1 className="text-2xl">{ sinLlamar }</h1>
            <h1 className="text-sm">Sin llamar</h1>
          </div>
          <div>
            <h1 className="text-2xl">{ llamados }</h1>
            <h1 className="text-sm">Llamados</h1>
          </div>
          <div>
            <h1 className="text-2xl">{ rechazados }</h1>
            <h1 className="text-sm">Rechazados</h1>
          </div> 
          <div onClick={() => mostrarFiltro()}>
            <i className="fas fa-sort-amount-down-alt text-2xl p-2"></i>
          </div>
        </div>
        {showFilter ? (
          <div
            data-aos="fade-right"
            className="mt-14 w-screen fixed py-2 px-1 bg-white text-center text-sm border-b shadow-md xl:border-l-2 xl:border-b-2 xl:float-right xl:w-4/12"
          >
            <select
              className="outline-none bg-white border-b text-black px-2 w-9/12 cursor-pointer"
              id="selectFilter"
              value={filterOpc}
              onChange={handleChange}
            >
              <option value="sin llamar">Sin llamar</option>
              <option value="Aceptado">Aceptados</option>
              <option value="Rechazado">Rechazados</option>
              <option value="No contesto">No contesto</option>
            </select>
            <div
              onClick={mostrarFiltro}
              className="float-right cursor-pointer bg-red-500  rounded-xl w-1/12"
            >
              <i className="text-white fas fa-times"></i>
            </div>
          </div>
        ) : null}
      </div>
    );
} 

const ListarProspectos = () => {
    const { listaProspectos } = useContext(ContextStates);  
    const { filterOpc } = useContext(ContextStates);    
    let filtro = listaProspectos.filter(prop => prop.estado === filterOpc);  
    return(
        <div className="mt-14 h-screen">
            <div className="grid grid-cols-1 gap-4">
                {filtro.map((i) => {
                let estilo = `bg-white shadow-md w-full p-2 rounded xl:rounded-xl border text-black duration-500 hover:shadow-2xl cursor-pointer`;
                let ruta = `/detalles/?type=prospecto&id=${i._id}`;
                return (
                  <NavLink exact to={ruta} key={i._id}>
                    <div className={estilo}>
                      <div className="flex justify-between">
                        <h1>{i.nombreNegocio}</h1>
                        <h1>{i.telefono}</h1>
                      </div>
                    </div>
                  </NavLink>
                );
            })}
            </div>
        </div>
    )
}

function Prospectos() {
     
  const { stateLoading, setStateLoading } = useContext(ContextStates);  
  const { APIDATA } = useContext(ContextStates);   
  const { listaProspectos, setListaProspectos } = useContext(ContextStates);  
  const URL = APIDATA;

  useEffect(() => {
    Axios.get(`${URL}/api/system`)
    .then((response) => {
      setStateLoading(false)
      setListaProspectos(response.data); 
    }) 
    .catch((error) => {console.log(error);})
  }, []); 

    return (
      <div> 
        {stateLoading ? (
          <div className="mt-64 m-auto text-5xl text-center w-3/6">
            <i className=" animate-spin fas fa-circle-notch"></i>
          </div>
        ) : (
          <div>
            {BarraDeInformacion()}
            <NavLink
            to="/agregar"
            className="z-50 fixed bottom-8 right-8 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-full px-3 py-2 "
            >
            <i className="fas fa-plus text-2xl"></i>
            </NavLink>
            <div className="px-4 pt-8">{ListarProspectos()}</div>
          </div>
        )}
      </div>
    );
}

export default Prospectos
