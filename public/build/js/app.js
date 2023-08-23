let paso=1;const pasoInicial=1,pasoFinal=3,paginaAnterior=document.querySelector("#anterior"),paginaSiguiente=document.querySelector("#siguiente"),cita={id:"",nombre:"",fecha:"",hora:"",servicios:[]};function iniciarApp(){mostrarSeccion(),tabs(),botonesPaginador(),pagSiguiente(),pagAnterior(),consultarAPI(),idCliente(),nombreCliente(),seleccionarFecha(),seleccionarHora(),mostrarResumen()}function mostrarSeccion(){const e=document.querySelector(".mostrar");e&&e.classList.remove("mostrar");document.querySelector("#paso-"+paso).classList.add("mostrar");const t=document.querySelector(".actual");t&&t.classList.remove("actual");document.querySelector(`[data-paso="${paso}"]`).classList.add("actual")}function tabs(){document.querySelectorAll(".tabs button").forEach(e=>{e.addEventListener("click",(function(e){paso=parseInt(e.target.dataset.paso),mostrarSeccion(),botonesPaginador()}))})}function botonesPaginador(){switch(paso){case 1:paginaAnterior.classList.add("ocultar"),paginaSiguiente.classList.remove("ocultar");break;case 2:paginaAnterior.classList.remove("ocultar"),paginaSiguiente.classList.remove("ocultar");break;case 3:paginaAnterior.classList.remove("ocultar"),paginaSiguiente.classList.add("ocultar"),mostrarResumen()}mostrarSeccion()}function pagAnterior(){paginaAnterior.addEventListener("click",(function(){paso>1&&(paso--,botonesPaginador())}))}function pagSiguiente(){paginaSiguiente.addEventListener("click",(function(){paso<3&&(paso++,botonesPaginador())}))}async function consultarAPI(){try{const e="/apiServicios",t=await fetch(e);mostrarServicios(await t.json())}catch(e){console.log(e)}}function mostrarServicios(e){e.forEach(e=>{const{id:t,nombre:a,precio:o}=e,n=document.createElement("P");n.classList.add("nombre-servicio"),n.textContent=a;const r=document.createElement("P");r.classList.add("precio-servicio"),r.textContent="$ "+o;const c=document.createElement("DIV");c.classList.add("servicio"),c.dataset.idServicio=t,c.onclick=function(){seleccionarServicio(e)},c.appendChild(n),c.appendChild(r),document.querySelector("#servicios").appendChild(c)})}function seleccionarServicio(e){const{id:t}=e,{servicios:a}=cita,o=document.querySelector(`[data-id-servicio="${t}"]`);a.some(e=>e.id===t)?(cita.servicios=a.filter(e=>e.id!==t),o.classList.remove("seleccionado")):(cita.servicios=[...a,e],o.classList.add("seleccionado"))}function idCliente(){cita.id=document.querySelector("#id").value}function nombreCliente(){cita.nombre=document.querySelector("#nombre").value}function seleccionarFecha(){document.querySelector("#fecha").addEventListener("input",(function(e){const t=new Date(e.target.value).getUTCDay();[0,1].includes(t)?(e.target.value="",mostrarAlerta("error","domingos y lunes no abrimos",".formulario")):cita.fecha=e.target.value}))}function seleccionarHora(){document.querySelector("#hora").addEventListener("input",(function(e){const t=e.target.value.split(":")[0];t<9||t>17?(e.target.value="",mostrarAlerta("error","Atendemos de 9 a 18 horas",".formulario")):cita.hora=e.target.value}))}function mostrarAlerta(e,t,a,o=!0){const n=document.querySelector(".alerta");n&&n.remove();const r=document.createElement("DIV");r.textContent=t,r.classList.add("alerta"),r.classList.add(e);document.querySelector(a).appendChild(r),o&&setTimeout(()=>{r.remove()},2e3)}function mostrarResumen(){const e=document.querySelector(".contenido-resumen");for(;e.firstChild;)e.removeChild(e.firstChild);if(Object.values(cita).includes("")||0===cita.servicios.length)return void mostrarAlerta("error","Faltan datos de Servicios, Fecha u Hora",".contenido-resumen",!1);const{nombre:t,fecha:a,hora:o,servicios:n}=cita,r=document.createElement("h3");r.textContent="Resúmen de Servicios",e.appendChild(r),n.forEach(t=>{const{id:a,precio:o,nombre:n}=t,r=document.createElement("DIV");r.classList.add("contenedor-servicio");const c=document.createElement("P");c.textContent=n;const i=document.createElement("P");i.innerHTML="<span>Precio:</span> $ "+o,r.appendChild(c),r.appendChild(i),e.appendChild(r)});const c=document.createElement("h3");c.textContent="Resúmen de Cita",e.appendChild(c);const i=document.createElement("P");i.innerHTML="<span>Nombre:</span> "+t;const s=new Date(a),d=s.getMonth(),l=s.getDate()+2,u=s.getFullYear(),m=new Date(Date.UTC(u,d,l)).toLocaleDateString("es-AR",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),p=document.createElement("P");p.innerHTML="<span>Fecha:</span> "+m;const v=document.createElement("P");v.innerHTML=`<span>Hora:</span> ${o} horas`;const h=document.createElement("BUTTON");h.classList.add("boton"),h.textContent="Reservar Cita",h.onclick=reservarCita,e.appendChild(i),e.appendChild(p),e.appendChild(v),e.appendChild(h)}async function reservarCita(){const{nombre:e,fecha:t,hora:a,servicios:o,id:n}=cita,r=o.map(e=>e.id),c=new FormData;c.append("fecha",t),c.append("hora",a),c.append("usuarioId",n),c.append("servicios",r);try{const e="/apiCitas",t=await fetch(e,{method:"POST",body:c});(await t.json()).resultado&&Swal.fire({icon:"success",title:"Cita Creada",text:"Tu cita fue creada correctamente",button:"OK"}).then(()=>{setTimeout(()=>{window.location.reload()},3e3)})}catch(e){Swal.fire({icon:"error",title:" Error ",text:"Hubo un error al guardar tu cita"})}}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));