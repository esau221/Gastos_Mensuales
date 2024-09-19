let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDesGastos = [];

let estaEditando = false; //Variable para indicar si estamos editando o no
let indiceGastoEditado = null; //Índice del gasto que se está editando

//Funciones del botón que permite tanto el registro como modificación de los datos ingresados
function clickBoton() {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;
    let desGasto = document.getElementById('desGasto').value;

    //Validación ingreso de datos
    if (!nombreGasto || isNaN(valorGasto) || valorGasto <=0 || !desGasto) {
        alert('Por favor, ingrese la información solicitada en todos los campos.');
        return;

      //Validación de gastos mayores a $150.000
    } else if(valorGasto > 150000){
        //Se muestra una alerta de confirmación, y detener el registro si se cancela
        if (confirm('¡Atención! Estás registrando un gasto superior a $150.000 CLP. ¿Deseas continuar?')){
        } else{
            //Si el usuario cancela, se detiene el registro
            alert('Se ha cancelado el registro del gasto.');
            return;
        }
    }

    //Permite realizar la edición (modificación) de los datos 
    if(estaEditando){
        //Actualizar (modificar) los datos
        listaNombresGastos[indiceGastoEditado] = nombreGasto;
        listaValoresGastos[indiceGastoEditado] = valorGasto;
        listaDesGastos[indiceGastoEditado] = desGasto;

        //Se reinicia el estado a "Agregar Gasto"
        estaEditando = false;
        indiceGastoEditado = null;
        document.getElementById('btnAgregar').textContent = 'Agregar Gasto';
        
        actualizarListaGastos();

    } else {
        listaNombresGastos.push(nombreGasto);
        listaValoresGastos.push(valorGasto);
        listaDesGastos.push(desGasto);

        actualizarListaGastos();
    }
    
}

//Función que formatea el valor a CLP (Peso chileno)
function formatearCLP(valor) {
    const formatter = new Intl.NumberFormat('es-cl', {
        style: 'currency',
        currency: 'CLP'
    });
    return formatter.format(valor);
}

//Funciones que muestra los registros en la tabla
function actualizarListaGastos(){
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    
    let htmlLista = '';
    let totalGatos = 0;

    listaNombresGastos.forEach((elemento,posicion) => {
        
        const valorGasto = Number(listaValoresGastos[posicion]);
        const desGasto = listaDesGastos[posicion];

        htmlLista += `<tr>
                      <td>${elemento}</td>
                      <td>${desGasto}</td>
                      <td>${formatearCLP(valorGasto)}</td>
                      <td>
                         <button class="btnEliminar" onclick="eliminarGasto(${posicion});">Eliminar</button>
                         <button class="btnModificar "onclick="modificarGastos(${posicion});">Modificar</button>
                     </td>
                     </tr>`;
        //Se calcula el total de gastos
       totalGatos += Number(valorGasto);   
    });

    console.log(htmlLista);

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = formatearCLP(totalGatos);
    limpiar(); 
}

//Función que limpia los inputs al realizar el registro
function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('desGasto').value = '';
}

//Función que permite realizar la eliminación de un registro
function eliminarGasto(posicion) {
    if(confirm('¿Estás seguro de que deseas eliminar este gasto?')){
    //Lógica para eliminar el gasto
    } else {
        return;
    } 

    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);

    actualizarListaGastos();
}

//Función que permite realizar tanto la modificación, como también el cambio de nombre del botón
function modificarGastos(posicion){
    estaEditando =true;
    indiceGastoEditado = posicion;

    //Se cargan los datos del gasto en los inputs correspondientes
    document.getElementById('nombreGasto').value = listaNombresGastos[posicion];
    document.getElementById('valorGasto').value = listaValoresGastos[posicion];
    document.getElementById('desGasto').value = listaDesGastos[posicion];

    //Se cambia el texto del botón "Agregar" a "Actualizar"
    document.getElementById('btnAgregar').textContent = 'Actualizar';
}