// script.js
function validarCampos() {
    var nombre = document.getElementById("nombre").value;
    var fechaNacimiento = document.getElementById("fechaNacimiento").value;
    var direccion = document.getElementById("direccion").value;
    var cedula=document.getElementById("cedula").value;
    if (nombre === "" || cedula === "" || direccion === "" || condicionesMedicas === "" || fechaNacimiento === "") {
        alert("Por favor, complete todos los campos obligatorios antes de mostrar los datos.");
        return;
    }
    if (!validarCedulaEcuador(cedula)) {
        alert("Cédula incorrecta.");
        return false;
    }

    if (!validarFecha(fechaNacimiento)) {
        alert("El formato de la fecha de nacimiento no es válido.");
        return false;
    }

    // Puedes agregar más validaciones aquí, por ejemplo para número de teléfono, etc.

    return true;
}

function validarFecha(fecha) {
    var regex = /^\d{4}-\d{2}-\d{2}$/; // Formato AAAA-MM-DD
    return regex.test(fecha);
}

function validarCedulaEcuador(cedula) {
    // Paso 1: Validar longitud de la cédula
    if (cedula.length !== 10 || isNaN(cedula)) {
        return false;
    }

    // Paso 2: Comprobar regiones
    var regiones = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
    var dosPrimerosDigitos = cedula.substring(0, 2);
    if (!regiones.includes(dosPrimerosDigitos)) {
        return false;
    }

    // Paso 3: Extraer el último dígito de la cédula
    var ultimoDigitoCedula = parseInt(cedula.charAt(9));

    // Paso 4: Extraer todos los pares y sumarlos
    var sumaPares = 0;
    for (var i = 1; i <= 8; i += 2) {
        sumaPares += parseInt(cedula.charAt(i));
    }

    // Paso 5: Extraer los impares, multiplicar por 2 y restar 9 si es mayor a 9
    var sumaImpares = 0;
    for (var j = 0; j <= 8; j += 2) {
        var valorImpar = parseInt(cedula.charAt(j)) * 2;
        if (valorImpar > 9) {
            valorImpar -= 9;
        }
        sumaImpares += valorImpar;
    }

    // Paso 6: Extraer el primer dígito de la suma
    var sumaTotal = sumaPares + sumaImpares;
    var primerDigitoSuma = parseInt(sumaTotal.toString().charAt(0));

    // Paso 7: Conseguir la decena inmediata del primer dígito de la suma
    var decenaInmediata = (primerDigitoSuma + 1) * 10;

    // Paso 8: Restar la decena inmediata a la suma
    var digitoVerificador = decenaInmediata - sumaTotal;
    if (digitoVerificador === 10) {
        digitoVerificador = 0;
    }

    // Paso 9: Comparar el dígito verificador con el último dígito de la cédula
    return digitoVerificador === ultimoDigitoCedula;
}

var nombrePersona = [];
// Función para guardar los datos en localStorage y agregar opción para agregar hijo
function guardarDatos() {
    if (!validarCampos()) {
        return;
    }

    var nombre = document.getElementById("nombre").value;
    var cedula = document.getElementById("cedula").value;
    var direccion = document.getElementById("direccion").value;
    var condicionesMedicas = document.getElementById("condicionesMedicas").value;
    var fechaNacimiento = new Date(document.getElementById("fechaNacimiento").value);

    

    var ahora = new Date();
    var diferencia = ahora - fechaNacimiento;
    var edad = new Date(diferencia);
    var edadAnios = Math.abs(edad.getUTCFullYear() - 1970);
    var edadMeses = edad.getUTCMonth();
    var edadDias = edad.getUTCDate() - 1;
    var edadHoras = edad.getUTCHours();
    var edadFormateada = edadAnios + " años, " + edadMeses + " meses, " + edadDias + " días y " + edadHoras + " horas";

    nombrePersona.push(nombre);

    var tabla = document.getElementById("tablaDatos");
    var fila = tabla.insertRow();
    fila.insertCell().textContent = nombre;
    fila.insertCell().textContent = cedula;
    fila.insertCell().textContent = direccion;
    fila.insertCell().textContent = condicionesMedicas;
    fila.insertCell().textContent = edadFormateada;

    var celdaAgregarHijo = fila.insertCell();
    var botonAgregarHijo = document.createElement("button");
    botonAgregarHijo.textContent = "Agregar Hijo";
    botonAgregarHijo.onclick = function() {
        agregarHijoEspecifico(nombre);
    };
    celdaAgregarHijo.appendChild(botonAgregarHijo);

    actualizarOpcionesSelect(nombrePersona);

    // Limpiar los campos del formulario
    document.getElementById("nombre").value = "";
    document.getElementById("cedula").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("condicionesMedicas").value = "";
    document.getElementById("fechaNacimiento").value = "";

}
    
// Función para actualizar las opciones del select con las personas disponibles
function actualizarOpcionesSelect(nombrePersona) {
    var selectPersona = document.getElementById("personaConsulta");
    selectPersona.innerHTML = ""; // Limpiar opciones existentes

    nombrePersona.forEach(function(nombre) {
        var option = document.createElement("option");
        option.text = nombre;
        option.value = nombre;
        selectPersona.appendChild(option);
    });
}



// Función para agregar un hijo específico para la persona seleccionada
function agregarHijoEspecifico(persona) {
    var tablaHijos = document.getElementById("tablaHijos").getElementsByTagName("tbody")[0];
    var fila = tablaHijos.insertRow();

    // Aquí podrías implementar la lógica para ingresar los datos del hijo,
    // como abrir un modal para que el usuario ingrese los datos del hijo.
    abrirModalHijo();


    // Insertar celda para el botón de eliminar
    var celdaAccion = fila.insertCell();
    celdaAccion.appendChild(botonEliminar);

    // Podrías agregar aquí más lógica para actualizar los datos en localStorage, si es necesario
}

// Función para abrir el modal del hijo
function abrirModalHijo() {
    var modal = document.getElementById("modalHijo");
    modal.style.display = "block";
}

// Función para cerrar el modal del hijo
function cerrarModalHijo() {
    var modal = document.getElementById("modalHijo");
    modal.style.display = "none";
}

// Cuando el usuario haga clic fuera del modal, se cerrará
window.onclick = function(event) {
    var modal = document.getElementById("modalHijo");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}





function agregarConsulta() {
    
    var tablaDatos = document.getElementById("tablaDatos");
    var listaPersonas = tablaDatos.getElementsByTagName("tbody")[0].getElementsByTagName("tr");


    // Obtener la persona seleccionada del menú desplegable
    
    if (nombrePersona.length === 0) {
        alert("No hay personas registradas. Por favor, agregue al menos una persona antes de agregar una consulta.");
        return;
    }

    // Crear una nueva fila en la tabla de consultas
    var fila = document.createElement("tr");

    // Crear celdas para la fecha, hora, persona y acción
    var celdaFecha = document.createElement("td");
    var celdaHora = document.createElement("td");
    var celdaPersona = document.createElement("td");
    var celdaAccion = document.createElement("td");

    // Obtener la fecha y hora actual
    var fechaActual = new Date();
    var fecha = fechaActual.toLocaleDateString();
    var hora = fechaActual.toLocaleTimeString();

    // Asignar texto a las celdas de fecha, hora y persona
    celdaFecha.textContent = fecha;
    celdaHora.textContent = hora;
    celdaPersona.textContent = nombrePersona;

    // Crear un botón para la acción de la consulta
    var botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.onclick = function() {
        // Eliminar la fila cuando se hace clic en el botón "Eliminar"
        fila.parentNode.removeChild(fila);
        guardarDatos(); // Actualizar después de eliminar
    };

    // Agregar el botón a la celda de acción
    celdaAccion.appendChild(botonEliminar);

    // Agregar las celdas a la fila
    fila.appendChild(celdaFecha);
    fila.appendChild(celdaHora);
    fila.appendChild(celdaPersona);
    fila.appendChild(celdaAccion);

    // Obtener el cuerpo de la tabla de consultas y agregar la fila
    var tbodyConsultas = document.getElementById("tablaConsultas").getElementsByTagName("tbody")[0];
    tbodyConsultas.appendChild(fila);

    // Llamar a la función guardarDatos para actualizar el menú desplegable de personas
    guardarDatos();
}



document.getElementById("fotoInput").addEventListener("change", function() {
    var file = this.files[0]; // Obtener el archivo seleccionado
    var reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById("fotoContainer").style.backgroundImage = "url('" + e.target.result + "')";
    };

    reader.readAsDataURL(file);

});

// Función para cargar dinámicamente las ciudades según el país seleccionado
function cargarCiudades() {
    var paisSeleccionado = document.getElementById("pais").value;
    var ciudadSelect = document.getElementById("ciudad");

    // Limpiar opciones anteriores
    ciudadSelect.innerHTML = "";

    // Agregar opciones de ciudades según el país seleccionado
    if (paisSeleccionado === "Ecuador") {
        var ciudadesEcuador = ["Quito", "Guayaquil", "Cuenca"]; // Ejemplo de ciudades para Ecuador
        ciudadesEcuador.forEach(function(ciudad) {
            var option = document.createElement("option");
            option.text = ciudad;
            option.value = ciudad;
            ciudadSelect.appendChild(option);
        });
    }
    // Agregar más casos para otros países si es necesario
}

// Función para agregar una nueva fila a la tabla de posibles hijos
// Función para guardar los datos del hijo ingresados en el modal
function guardarHijo() {
    // Obtener los valores ingresados en el modal
    var nombreHijo = document.getElementById("nombreHijo").value;
    var fechaNacimientoHijo = document.getElementById("fechaNacimientoHijo").value;
    var generoHijo = document.getElementById("generoHijo").value;

    // Crear una nueva fila en la tabla de posibles hijos
    var tablaHijos = document.getElementById("tablaHijos").getElementsByTagName("tbody")[0];
    var fila = tablaHijos.insertRow();

    // Insertar celdas con los datos del hijo
    fila.insertCell().textContent = nombreHijo;
    fila.insertCell().textContent = fechaNacimientoHijo;
    fila.insertCell().textContent = generoHijo;

    // Crear botón para eliminar la fila del hijo
    var botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.onclick = function() {
        // Eliminar la fila cuando se hace clic en el botón "Eliminar"
        fila.parentNode.removeChild(fila);
    };

    // Insertar celda para el botón de eliminar
    var celdaAccion = fila.insertCell();
    celdaAccion.appendChild(botonEliminar);

    // Cerrar el modal después de guardar los datos del hijo
    cerrarModalHijo();
}


