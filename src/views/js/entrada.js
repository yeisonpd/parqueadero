async function registrarEntrada(){


    const placa = document.getElementById("placa").value;
    const identificacion = document.getElementById("identificacion").value;

    const res = await fetch("/api/entrada",{
        method:"POST",
        headers:{
        "Content-Type":"application/json"
        },
        body: JSON.stringify({placa, identificacion})
    });

    const data = await res.json();

    const mensaje = document.getElementById("mensaje");

    if(!res.ok){
        mensaje.style.color = "red";
    }else{
        mensaje.style.color = "green";
    }

    mensaje.innerText = data.mensaje;

    // solo redirige si todo salió bien
    if(res.ok){
        setTimeout(()=>{
        window.location.href = "/";
    },1500);
    }

}