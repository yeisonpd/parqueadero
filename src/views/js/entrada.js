async function registrarEntrada(){

    const placa = document.getElementById("placa").value;

    const res = await fetch("/api/entrada",{
        method:"POST",
        headers:{
        "Content-Type":"application/json"
        },
        body: JSON.stringify({placa})
    });

    const data = await res.json();

    if(!res.ok){
        document.getElementById("mensaje").style.color = "red";
    }else{
        document.getElementById("mensaje").style.color = "green";
    }

    document.getElementById("mensaje").innerText = data.mensaje;

    if(res.ok){

    setTimeout(()=>{
        window.location.href = "/";
    },1500);

    }
}