async function registrarSalida(){

    const placa = document.getElementById("placa").value;
    const observacion = document.getElementById("observacion").value;

    const res = await fetch("/api/salida",{
        method:"POST",
        headers:{
        "Content-Type":"application/json"
        },
        body: JSON.stringify({placa,observacion})
    });

    const data = await res.json();

    document.getElementById("mensaje").innerText = data.mensaje;
        if(res.ok){

        setTimeout(()=>{
            window.location.href = "/";
        },1500);
    }
}