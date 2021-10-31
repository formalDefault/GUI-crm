import React from "react"; 
import { NavLink } from 'react-router-dom'
// import { ContextStates } from "../context/Estados";
// const lista = [
//         {"nombreNegocio":"Taller","telefono":345345,"direccion":"su puta madre. jal #9","segundaLlamada":null,"recordatorios":"gdfg","clasificacion":"descartado","_id":"61241d9c64b0e561s0ba0fda","primeraLlamada":null,"__v":0},
//         {"nombreNegocio":"Taller","telefono":345345,"direccion":"su puta madre. jal #9","segundaLlamada":null,"recordatorios":"gdfg","clasificacion":"","_id":"61241d9c650e561s0ba0fda","primeraLlamada":null,"__v":0},
//         {"nombreNegocio":"pasteleria","telefono":345345,"direccion":"su puta madre. jal #9","segundaLlamada":null,"recordatorios":"llamar al cliente entre las 4 y 5 de la tarde del dia martes 25/08/21","clasificacion":"posible","_id":"61241d9c64b0e561f0ba0fda","primeraLlamada":'24/28/2021',"__v":0}
//       ]; 

const barraDeInformacion = () => {
    return(
        <div className="fixed xl:px-32 py-1 xl:pt-3 xl:shadow-lg w-screen bg-white border-b text-gray-500 px-4 py-1 text-center flex justify-between">
            <div>
                <h1 className="text-2xl text-red-500">0</h1>
                <h1 className="text-sm">Pendientes</h1>
            </div>
            <div>
                <h1 className="text-2xl">0</h1>
                <h1 className="text-sm">completados</h1>
            </div>
            <div><i className="fas fa-sort-amount-down-alt text-2xl p-2"></i></div>
            
        </div>
    )
}

function Pendientes() {
    
    return (
        <div>
            {barraDeInformacion()}
            <NavLink to="/agregar" className="border w-11/12 text-gray-500 m-auto mt-4 rounded-2xl px-2 py-1 flex justify-start">
                <i className="fas fa-plus text-xl"></i> 
                <h1 className="ml-4">Agregar tarea</h1>
            </NavLink>
        </div>
    )
}

export default Pendientes
