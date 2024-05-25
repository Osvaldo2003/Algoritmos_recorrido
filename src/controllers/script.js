import { bst } from "../dependencies.js";
import Reservacion from "../models/bst/Reservacion.js";

document.getElementById("btn-add").addEventListener("click", () => {
    const patientName = document.getElementById("patientName").value;
    const date = document.getElementById("date").value;
    const reservacion = new Reservacion(patientName, date);

    if (bst.add(reservacion)) {
        alert("Reserva agregada exitosamente");
    } else {
        alert("La reserva ya existe");
    }

    // Limpiar los campos de entrada
    document.getElementById("patientName").value = "";
    document.getElementById("date").value = "";
});

document.getElementById("btn-search").addEventListener("click", () => {
    const date = document.getElementById("searchDate").value;
    const results = bst.search(date);

    if (results.length > 0) {
        const resultMessage = results.map(reserva => `${reserva.patientName} - ${reserva.date}`).join("\n");
        alert(`Reservas encontradas:\n${resultMessage}`);
    } else {
        alert(`No se encontraron reservas para la fecha ${date}.`);
    }

    // Limpiar el campo de búsqueda
    document.getElementById("searchDate").value = "";
});

document.getElementById("btn-delete").addEventListener("click", () => {
    const date = document.getElementById("deleteDate").value;
    const patientName = document.getElementById("deletePatientName").value;

    // Verificar si se proporcionó una fecha y un nombre de paciente
    if (date.trim() === "" || patientName.trim() === "") {
        document.getElementById("error").innerText = "Por favor, ingrese la fecha y el nombre del paciente.";
        return;
    }

    // Eliminar la reserva
    const results = bst.search(date);
    const filteredResults = results.filter(reserva => reserva.patientName === patientName);
    if (filteredResults.length === 0) {
        document.getElementById("error").innerText = "No se encontró ninguna reserva con esa fecha y nombre de paciente.";
        return;
    }

    // Eliminar todas las reservas encontradas con esa fecha y nombre de paciente
    filteredResults.forEach(reserva => {
        bst.delete(reserva);
    });

    // Limpiar los campos de entrada
    document.getElementById("deleteDate").value = "";
    document.getElementById("deletePatientName").value = "";

    // Mostrar mensaje de éxito
    document.getElementById("error").innerText = "";
    document.getElementById("message").innerText = "Reserva(s) eliminada(s) exitosamente.";
});

// Callback para imprimir todas las reservas
const printCallback = (value) => {
    console.log(`${value.patientName} - ${value.date}`);
};

// Obtener y mostrar la primera reserva
const minValue = bst.getMin();
if (minValue) {
    console.log(`Primera reserva: ${minValue.patientName} - ${minValue.date}`);
}

// Obtener y mostrar la última reserva
const maxValue = bst.getMax();
if (maxValue) {
    console.log(`Última reserva: ${maxValue.patientName} - ${maxValue.date}`);
}

// Imprimir todas las reservas
bst.printAll(printCallback);
