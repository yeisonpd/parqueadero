async function cargarUsuarios(){

    const res = await fetch("/api/usuarios");
    const data = await res.json();

    let html="";

    data.forEach(u=>{
    html += `
    <tr>
    <td>${u.nombre}</td>
    <td>${u.identificacion}</td>
    <td>${u.telefono}</td>
    <td>
    <button onclick="eliminar(${u.id_usuario})">Eliminar</button>
    <button onclick="abrirModal(${u.id_usuario}, '${u.nombre}', '${u.identificacion}', '${u.telefono}')">Editar</button>
    </td>
    </tr>`;
    });

    document.getElementById("tablaUsuarios").innerHTML = html;
}

async function crearUsuario(){

    const nombre = document.getElementById("nombre").value;
    const identificacion = document.getElementById("identificacion").value;
    const telefono = document.getElementById("telefono").value;

    await fetch("/api/usuario",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({nombre,identificacion,telefono})
    });

    cargarUsuarios();
}

async function buscarUsuario() {
    const id = document.getElementById("idBuscar").value;
    const res = await fetch(`/api/usuario/id?id=${id}`);
    const data = await res.json();
    
    let tabla = `
      <tr>
        <td>${data.nombre}</td>
        <td>${data.identificacion}</td>
        <td>${data.telefono}</td>
        <td>
          <button onclick="eliminar(${data.id_usuario})">Eliminar</button>
          <button onclick="abrirModal(${data.id_usuario}, '${data.nombre}', '${data.identificacion}', '${data.telefono}')">Editar</button>
        </td>
      </tr>`;
    
    document.getElementById("tablaUsuarios").innerHTML = tabla;
}


async function eliminar(id){

    await fetch(`/api/usuario/${id}`,{method:"DELETE"});

    cargarUsuarios();
}

function abrirModal(id, nombre, identificacion, telefono){

    document.getElementById("modal").style.display = "block";

    document.getElementById("edit_id").value = id;
    document.getElementById("edit_nombre").value = nombre;
    document.getElementById("edit_identificacion").value = identificacion;
    document.getElementById("edit_telefono").value = telefono;

}

function cerrarModal(){
    document.getElementById("modal").style.display = "none";
}

async function guardarCambios(){

    const id = document.getElementById("edit_id").value;
    const nombre = document.getElementById("edit_nombre").value;
    const identificacion = document.getElementById("edit_identificacion").value;
    const telefono = document.getElementById("edit_telefono").value;

    await fetch(`/api/usuario/${id}`,{
        method:"PUT",
        headers:{
        "Content-Type":"application/json"
        },
        body: JSON.stringify({nombre, identificacion, telefono})
    });

    cerrarModal();
    cargarUsuarios();

}

cargarUsuarios();