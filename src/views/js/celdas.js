async function cargar(){

    const res = await fetch("/api/celdas");
    const data = await res.json();

    let html="";

    data.forEach(c=>{
    html += `
    <tr>
    <td>${c.numero}</td>
    <td>${c.estado}</td>
    <td>
    <button onclick="eliminar(${c.id_celda})">Eliminar</button>
    </td>
    </tr>`;
    });

    document.getElementById("tablaCeldas").innerHTML = html;
}

async function crearCelda(){

    const numero = document.getElementById("numero").value;

    await fetch("/api/celda",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({numero})
    });

    cargar();
}

async function eliminar(id){

    await fetch(`/api/celda/${id}`,{method:"DELETE"});

    cargar();
}

cargar();