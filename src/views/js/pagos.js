async function cargar(){

const res = await fetch("/api/pagos");
const data = await res.json();

let html="";

data.forEach(p=>{
html += `
<tr>
<td>${p.nombre}</td>
<td>${p.fecha_pago}</td>
<td>${p.fecha_vencimiento}</td>
<td>${p.estado}</td>
</tr>`;
});

document.getElementById("tablaPagos").innerHTML = html;
}

async function crearPago(){

    const identificacion = document.getElementById("identificacion").value;
    const fecha_pago = document.getElementById("fecha_pago").value;
    const fecha_vencimiento = document.getElementById("fecha_vencimiento").value;

    const res = await fetch("/api/pago",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({identificacion,fecha_pago,fecha_vencimiento})
    });

    const data = await res.json();

    alert(data.mensaje);

    cargar();
}

async function buscarPago(){

    const identificacion = document.getElementById("buscar_identificacion").value;

    const res = await fetch(`/api/pagos/${identificacion}`);
    const data = await res.json();

    let html="";

    if(data.mensaje){
    html = `<tr><td colspan="4">${data.mensaje}</td></tr>`;
    }else{

    data.forEach(p=>{
    html += `
    <tr>
    <td>${p.nombre}</td>
    <td>${p.fecha_pago}</td>
    <td>${p.fecha_vencimiento}</td>
    <td>${p.estado}</td>
    <td>
    <button onclick="abrirModalPago(${p.id_pago}, '${p.fecha_pago}', '${p.fecha_vencimiento}')">Editar</button>
    </td>
    </tr>`;
    });

    }

    document.getElementById("tablaPagos").innerHTML = html;

}

function abrirModalPago(id, fecha_pago, fecha_vencimiento){

    document.getElementById("modalPago").style.display="block";

    document.getElementById("edit_pago_id").value = id;
    document.getElementById("edit_fecha_pago").value = fecha_pago.split("T")[0];
    document.getElementById("edit_fecha_vencimiento").value = fecha_vencimiento.split("T")[0];

}

function cerrarModalPago(){
    document.getElementById("modalPago").style.display="none";
}

async function guardarPago(){

    const id = document.getElementById("edit_pago_id").value;
    const fecha_pago = document.getElementById("edit_fecha_pago").value;
    const fecha_vencimiento = document.getElementById("edit_fecha_vencimiento").value;

    await fetch(`/api/pago/${id}`,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({fecha_pago, fecha_vencimiento})
    });

    cerrarModalPago();
    buscarPago(); // recarga la tabla
}

cargar();