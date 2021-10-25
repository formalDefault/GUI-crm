import React, { useContext } from 'react'   
import { Formik, Form, Field, ErrorMessage } from 'formik' //npm i formik --save 
import { NavLink } from 'react-router-dom';  
import Axios from 'axios'; 
import { ContextStates } from "../context/Estados"; 
 
export default function Formulario() {   
    const { APIDATA } = useContext(ContextStates);  
    const {stateFormulario} = useContext(ContextStates);  
    const {setStateFormulario} = useContext(ContextStates);  
    const {listaProspectos} = useContext(ContextStates);  
    const URL =APIDATA; 
    const fields = "outline-none text-black bg-white border-b-2 border-yellow-500 rounded-lg w-full h-12 mt-2 px-4"

    const Formulario = () => {
        return (
            <Formik 
                //valores de los campos del formulario
                initialValues = {{ 
                    nombreNegocio: '',
                    telefono: '',
                    direccion: '' 
                }}

                //validacion de los input
                validate = {(valores) => {
                    let errores = {};   
                    
                    //validacion para telefono
                    if (!valores.telefono) {
                        errores.telefono = 'ingresa un numero de telefono';
                    } else if(!/^[+]?([0-9]+(?:[0-9]*)?|[0-9]+)$/.test(valores.telefono)) {
                        errores.telefono = 'Favor de ingresar solo numeros del 0 al 9';
                    } 
                    if(!valores.nombreNegocio) { 
                        errores.nombreNegocio = 'ingresa un nombre';
                    }
                    if(!valores.direccion) { 
                        errores.direccion = 'ingresa una direccion';
                    } 

                    return errores;
                }}

                //funcion del boton de enviar
                onSubmit={(valores) => { 
                    let coincidencias = listaProspectos.filter(i => i.telefono === valores.telefono)
                    if(coincidencias.length > 0) {
                        alert('El numero ya esta registrado en otro negocio')
                    } else {
                      var body = valores;
                      Axios.post(`${URL}/api/system`, body)
                          .then(() => {
                              setStateFormulario(true);
                              window.location.assign('/');
                          })
                          .catch((err) => { console.log(err)});
                    } 
                }}
            >
                {( {errors} ) => (
                <div className="z-40 "> 
                        <div data-aos="fade-right" className="pt-8 mb-8">   
                            <div className="w-5/6 border rounded-md text-black m-auto p-4 shadow-xl "> 
                                <NavLink exact to="/prospectos"><span className=" relative xl:float-right text-white bg-red-500 px-4 pb-1 rounded-full cursor-pointer"><b>x</b></span></NavLink>
                                <div className="text-center mb-4">
                                    <b>Registrar prospecto</b>
                                </div>
                                <Form className="grid grid-cols-1 xl:grid-cols-3 gap-8 "> 
                                    <div className=" mb-5">
                                        <label htmlFor="Negocio">Negocio:</label>
                                        <Field  
                                            name="nombreNegocio"
                                            id="nombreNegocio"  
                                            type="text" 
                                            placeholder="Nombre del negocio" 
                                            className={fields}
                                        />
                                        <ErrorMessage name="nombreNegocio" component={() => (<div className="text-red-500">{errors.nombreNegocio}</div>)}/> 
                                    </div>
                                    <div className=" mb-5">
                                        <label htmlFor="Telefono">Telefono:</label>
                                        <Field  
                                            name="telefono"
                                            id="telefono"  
                                            type="text" 
                                            placeholder="Numero de telefono" 
                                            className={fields}
                                        />
                                        <ErrorMessage name="telefono" component={() => (<div className="text-red-500">{errors.telefono}</div>)}/> 
                                    </div>
                                    <div className=" mb-5">
                                        <label htmlFor="Direccion">Direccion:</label>
                                        <Field  
                                            name="direccion"
                                            id="direccion"  
                                            type="text" 
                                            placeholder="Direccion del negocio" 
                                            className={fields}
                                        />
                                        <ErrorMessage name="direccion" component={() => (<div className="text-red-500">{errors.direccion}</div>)}/> 
                                    </div>
                                    <div className="xl:col-start-2">
                                        { stateFormulario ? 
                                            <button type="submit" className="py-1 w-full rounded-xl px-8 bg-yellow-500 hover:bg-yellow-400 duration-500 text-white xl:m-auto"><i className="animate-spin fas fa-circle-notch"></i></button>
                                        :
                                            <button type="submit" className="py-1 w-full rounded-xl px-8 bg-yellow-500 hover:bg-yellow-400 duration-500 text-white xl:m-auto">Registrar</button>
                                        } 
                                    </div>
                                </Form>
                            </div>
                        </div>
                </div>
                )}
            </Formik>
        )
    }
    
    return (
        <div> 
            {Formulario()} 
        </div>
    )
    
}
 