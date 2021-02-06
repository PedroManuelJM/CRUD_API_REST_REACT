import React, { Component } from 'react';
import { ApiWebUrl } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery/dist/jquery';
import img1 from '../assets/img/chatbot.svg';
import img2 from '../assets/img/info.png';

import swal from 'sweetalert'; /* importando sweealert */
export default class Usuario extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listaCategorias: [],
            nombres: "", // nombres para poder insertar
            apellidos: "",  // apellidos para insertar
            edad: "",  // edad para insertar
            alumnoSeleccionadoIdusuario: "",  // esta variables sirver para poder actualizar el dato idusuario
            alumnoSeleccionadoNombre: "",  // esta variables sirver para poder actualizar el dato nombre
            alumnoSeleccionadoApellido: "", // esta variables sirver para poder actualizar el dato apellido
            alumnoSeleccionadoEdad: "", // esta variables sirver para poder actualizar el dato edad
        }
    }
    componentDidMount() {
        this.obtenerAlumnos();
    }
    obtenerAlumnos() {
        const rutaServicio = ApiWebUrl + "listaalumnos.php";
        fetch(rutaServicio, {
            'Cache-Control': 'no-cache, must-revalidate', 'Expires': 0,
            method: 'GET',
        })
            .then(
                res => res.json()
            )
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        listaCategorias: result
                    })
                }
            )
    }

    dibujarCategorias = (datosTablaCategorias) => {
        return (
            <div>
                <table className="table table-striped table-hover overflow-auto">
                    <thead className="thead-dark">
                        <tr className="text-center">
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Edad</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datosTablaCategorias.map(itemCategoria =>
                            <tr key={itemCategoria.idusuario} className="text-center">
                                <td>{itemCategoria.idusuario}</td>
                                <td>{itemCategoria.nombres}</td>
                                <td>{itemCategoria.apellidos}</td>
                                <td>{itemCategoria.edad}</td>
                                <td>
                                    <FontAwesomeIcon className="fa-icon min-padded" icon={faPen} onClick={() => this.mostrarActualizar(itemCategoria)} />
                                    <FontAwesomeIcon className="fa-icon min-padded " icon={faTimes} onClick={() => this.categoriaEliminar(itemCategoria)} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
    categoriaEliminar(itemCategoria) {
        var respuesta = window.confirm("¿Está seguro que desea eliminar al alumno(a) " + itemCategoria.nombres + " ?");
        if (respuesta === true) {
            const rutaServicio = ApiWebUrl + "eliminaralumnos.php";
            var formData = new FormData();
            formData.append("idusuario", itemCategoria.idusuario)
            fetch(rutaServicio, {
                method: 'POST',
                body: formData
            })

                .then(
                    () => {
                        this.obtenerAlumnos();
                        alert("Se eliminó al alumno(a) " + itemCategoria.nombres);
                    }
                )
        }
    }
    // pasando a esta funcion los datos de la tabla principal para el modal actualizar 
    mostrarActualizar(itemAlumno) {
        this.setState({
            alumnoSeleccionadoIdusuario: itemAlumno.idusuario,
            alumnoSeleccionadoNombre: itemAlumno.nombres,
            alumnoSeleccionadoApellido: itemAlumno.apellidos,
            alumnoSeleccionadoEdad: itemAlumno.edad,
        })
        $("#modalActualizar").modal();
    }

    dibujarFormularioAgregar() {
        return (
            <div id="formulario-agregar">
                <br />
                <div className="card">
                    <div className="">
                        <button type="button" className="btn btn-danger" onClick={this.ocultarFormularioAgregar} style={{ float: 'right' }}>   <FontAwesomeIcon className="fa-icon" icon={faTimes} onClick={() => this.ocultarFormularioAgregar} /></button>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.categoriasInsertar}>
                            <div className="form-group">
                                <input type="text" id="nombre" className="form-control " placeholder="Nombres"
                                    onChange={(e) => this.setState({ nombres: e.target.value })}
                                    required minLength="3" />
                            </div>
                            <div className="form-group">
                                <input type="text" id="apellido" className="form-control " placeholder="Apellidos"
                                    onChange={(e) => this.setState({ apellidos: e.target.value })}
                                    required minLength="1" />
                            </div>
                            <div className="form-group">
                                <input type="text" id="edad" className="form-control " placeholder="Edad"
                                    onChange={(e) => this.setState({ edad: e.target.value })}
                                    required minLength="2" maxLength="2" />
                            </div>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <button type="submit" className="btn btn-success">Guardar</button>
                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }



    categoriasInsertar = (e) => {
        e.preventDefault();
        const rutaServicio = ApiWebUrl + "registraralumnos.php";// registrarcat.php
        var formData = new FormData();
        formData.append("nombres", this.state.nombres) // nombre_categoria es el nombre del atributo de la variable tabla categoria
        formData.append("apellidos", this.state.apellidos)
        formData.append("edad", this.state.edad)
        //Asi se agregan todos los parámetros que el servicio requiera (nombre del parámetro , valor que se envía)  
        fetch(rutaServicio, {
            method: 'POST',
            body: formData
        })
            .then(
                res => res.text()
            )
            .then(
                (result) => {
                    console.log(result);
                    this.obtenerAlumnos();
                    this.ocultarFormularioAgregar();
                    /* alert("Se agregó una nueva categoría con id " + result);*/
                    swal(
                        {
                            text: " Se inserto la categoria " + this.state.nombres + " sastifactoriamente.",
                            icon: "success",
                            button: "Ok",
                            timer: "2000",
                        });
                }
            )
    }


    mostrarFormularioAgregar() {
        $("#formulario-agregar").slideDown("slow");
    }
    ocultarFormularioAgregar() {
        $("#formulario-agregar").slideUp("slow");
        // limpiando los inputs cuando termina de registrar
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('edad').value = '';
    }

    alumnosActualizar = (e) => {
        const rutaServicio = ApiWebUrl + "actualizaralumnos.php";
        var formData = new FormData();
        formData.append("idusuario", this.state.alumnoSeleccionadoIdusuario)
        formData.append("nombres", this.state.alumnoSeleccionadoNombre)
        formData.append("apellidos", this.state.alumnoSeleccionadoApellido)
        formData.append("edad", this.state.alumnoSeleccionadoEdad)
        //Asi se agregan todos los parámetros que el servicio requiera (nombre del parámetro , valor que se envía)  
        fetch(rutaServicio, {
            method: 'POST',
            body: formData
        })
            .then(
                () => {
                    this.obtenerAlumnos();
                    $("#modalActualizar").modal("toggle");
                    swal({
                        text: "Se actualizo los datos del alumno (a) " + this.state.alumnoSeleccionadoNombre + " , " + this.state.alumnoSeleccionadoApellido,
                        icon: "success",
                        button: "Ok",
                        timer: "2000",
                    })
                }
            )
    }
    // Modal actualizar alumno 
    dibujarModal() {
        return (
            <div className="modal fade" id="modalActualizar" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Actualizar Alumno</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="form-group">
                                    <input type="hidden" className="form-control" value={this.state.alumnoSeleccionadoIdusuario} disabled />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1"> Nombres </span>
                                    <input type="text" className="form-control" value={this.state.alumnoSeleccionadoNombre}
                                        onChange={(e) => this.setState({ alumnoSeleccionadoNombre: e.target.value })}
                                        aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1"> Apellidos </span>
                                    <input type="text" className="form-control" value={this.state.alumnoSeleccionadoApellido}
                                        onChange={(e) => this.setState({ alumnoSeleccionadoApellido: e.target.value })}
                                        aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"> Edad </span>
                                    <input type="text" className="form-control" value={this.state.alumnoSeleccionadoEdad}
                                        onChange={(e) => this.setState({ alumnoSeleccionadoEdad: e.target.value })}
                                    />
                                    <span className="input-group-text"> años .</span>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.alumnosActualizar()}>Actualizar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        let contenidoCategorias = this.dibujarCategorias(this.state.listaCategorias);
        let contenidoFormularioAgregar = this.dibujarFormularioAgregar();
        let contenidoModal = this.dibujarModal();
        return (
            <>
                <nav id="nav-color" className="navbar navbar-light bg-light">
                    <div className="container-fluid" style={{ padding: "8px" }}>
                        <a className="navbar-brand" href="#">
                            <img src={img1} alt="" width="30" height="24" className="d-inline-block align-top" />
                CRUD - API REST - REACT
                </a>
                    </div>
                </nav>
                <section id="tabla-categorias" className="">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="wrapper float-left">
                                    <div className="icon info">
                                        <div className="tooltip">Desarrollado por Pedro M.A Jurado Moreno</div>
                                        <a href="#"
                                            style={{ width: "32px" }}>
                                            <img src={img2} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <button type="button" className="btn btn-primary" onClick={this.mostrarFormularioAgregar}>
                                        Nuevo Alumno</button>
                                    {contenidoFormularioAgregar}
                                </div>
                            </div>
                            <div className="col-md-8">
                                {contenidoCategorias}
                            </div>
                        </div>
                    </div>
                    {contenidoModal}
                </section>


            </>
        );
    }
}