import React, { Component, Fragment } from 'react';
import logo from './img/logo.png';
import './css/main.css';

export class Index extends Component {
    render() {
        return (
            <Fragment>
                <div className="body fc">
                    <div id="contenedor1">
                        <div className="header">
                            <h1 className="h1">Sistema de otorgamiento de carreras universitarias</h1>
                        </div>
                    </div>
                    <div id="contenedor2">
                        <aside>
                            <section id="cuadro1">
                                <p>Como parte del proceso educacional cubano, todo aspirante a estudiar en la Educación Superior, en cualquiera de sus modalidades de estudio, y para cualquier carrera, debe realizar con carácter obligatorio tres exámenes de ingreso: Matemática, Español e Historia de Cuba los cuales se realizan anualmente, a todos los estudiantes que optan por carreras universitarias para continuar su formación profesional. Cada estudiante debe llenar una voleta,  la cual contendrá las 10 opciones, en orden de prioridad por las que el estudiante aspira.
                                </p>
                                <p>Los exámenes se aplican nacionalmente en la misma fecha para todos los aspirantes y es un requisito indispensable obtener un mínimo de  sesenta puntos, en cada examen para ser incluido en el escalafón de otorgamiento de plazas, este escalafón se conforma de acuerdo a los resultados obtenidos en los exámenes de ingreso, del cual dependerán las carreras que serán otorgadas.
                                </p>
                                <p>Este sitio web tiene como objetivo informatizar todo este proceso de otorgamiento de carreras universitarias, desde el registro de boletas de cada estudiante, con sus datos requeridos, las carreras disponibles, y finalmente el proceso de otorgar una carrera a cada estudiante de acuerdo a su poisión que haya obtenido en el escalafón.    
                                </p>
                            </section>
                            <section id="cuadro2">
                                <p>Contáctenos: Calle 23 e/ F y G No. 565, Vedado, La Habana, Cuba.(+53)78382314-ext 233
                                </p>
                            </section> 
                        </aside> 
                    </div> 
                    <footer>
                        <img src={logo} alt="Ministerio de educación superior" class="logo"/>
                    </footer>
                </div>
            </Fragment>
        );
    }
}