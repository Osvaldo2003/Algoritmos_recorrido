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

    document.getElementById("searchDate").value = "";
});

document.getElementById("btn-delete").addEventListener("click", () => {
    const date = document.getElementById("deleteDate").value;
    const patientName = document.getElementById("deletePatientName").value;

    if (date.trim() === "" || patientName.trim() === "") {
        document.getElementById("error").innerText = "Por favor, ingrese la fecha y el nombre del paciente.";
        return;
    }

    const results = bst.search(date);
    const filteredResults = results.filter(reserva => reserva.patientName === patientName);
    if (filteredResults.length === 0) {
        document.getElementById("error").innerText = "No se encontró ninguna reserva con esa fecha y nombre de paciente.";
        return;
    }

    filteredResults.forEach(reserva => {
        bst.delete(reserva);
    });

    document.getElementById("deleteDate").value = "";
    document.getElementById("deletePatientName").value = "";

    document.getElementById("error").innerText = "";
    document.getElementById("message").innerText = "Reserva(s) eliminada(s) exitosamente.";
});

const printCallback = (value) => {
    console.log(`${value.patientName} - ${value.date}`);
};

const minValue = bst.getMin();
if (minValue) {
    console.log(`Primera reserva: ${minValue.patientName} - ${minValue.date}`);
}

const maxValue = bst.getMax();
if (maxValue) {
    console.log(`Última reserva: ${maxValue.patientName} - ${maxValue.date}`);
}

bst.printAll(printCallback);
