import React, { useState } from 'react'
export const ContextStates = React.createContext();

function Estados(props) {
    const [stateMenu, setStateMenu] = useState(false); 
    const [stateFormulario, setStateFormulario] =  useState(false); 
    const [stateLoading, setStateLoading] =  useState(true); 
    const [listaProspectos, setListaProspectos] = useState([]);  
    const [filterOpc, setFilter]  = useState('sin llamar');
    const [showFilter, setShowFilter] =  useState(false);
    const [sinLlamar, setSinLlamar] = useState(0);
    const [llamados, setLlamados] = useState(0);
    const [rechazados, setRechazados] = useState(0);
    const [APIDATA] = useState('https://bavel.herokuapp.com');
    return (
        <ContextStates.Provider value={
            {
                stateMenu, setStateMenu, 
                listaProspectos, setListaProspectos, 
                APIDATA,
                stateFormulario,setStateFormulario,
                filterOpc, setFilter, 
                showFilter, setShowFilter,
                stateLoading, setStateLoading,
                sinLlamar, setSinLlamar,
                llamados, setLlamados,
                rechazados, setRechazados
            }}>
            {props.children}
        </ContextStates.Provider>
    )
}

export default Estados;
