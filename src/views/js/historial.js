async function cargarHistorial(){
    const res = await fetch("/api/historial");

    const data = await res.json();

    let tabla = "";

    data.forEach(r => {

        tabla += `
            <tr>
            <td>${r.placa}</td>
            <td>${r.fecha_entrada}</td>
            <td>${r.fecha_salida || ""}</td>
            <td>${r.observacion || ""}</td>
            </tr>
            `;

    });

    document.getElementById("tabla").innerHTML = tabla;

}

async function buscarHistorial(){

    const placa = document.getElementById("placaBuscar").value;

    const res = await fetch(`/api/historial/placa?placa=${placa}`);

    const data = await res.json();

    let tabla = "";

    data.forEach(r => {

        tabla += `
            <tr>
            <td>${r.placa}</td>
            <td>${r.fecha_entrada}</td>
            <td>${r.fecha_salida || ""}</td>
            <td>${r.observacion || ""}</td>
            </tr>
            `;

    });

    document.getElementById("tabla").innerHTML = tabla;

}

cargarHistorial();