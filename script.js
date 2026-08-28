// Importar Firebase desde CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBLrYQ3bqcuVeitMQtltA-JzKGLZz3gl-Q",
  authDomain: "ingresomensajes.firebaseapp.com",
  projectId: "ingresomensajes",
  storageBucket: "ingresomensajes.firebasestorage.app",
  messagingSenderId: "24432476432",
  appId: "1:24432476432:web:b1d22e1341c906cde2e595",
  measurementId: "G-W6XTR9BDF9"
};


// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referencia al formulario
const formulario = document.getElementById("formulario");
const lista = document.getElementById("lista");

// Guardar datos en Firestore
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const mensaje = document.getElementById("mensaje").value;

  await addDoc(collection(db, "mensajes"), { nombre, mensaje });
  alert("Mensaje guardado!");
  mostrarMensajes();
});

// Mostrar datos guardados
async function mostrarMensajes() {
  lista.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "mensajes"));
  querySnapshot.forEach((doc) => {
    const li = document.createElement("li");
    li.textContent = `${doc.data().nombre}: ${doc.data().mensaje}`;
    lista.appendChild(li);
  });
}

// Cargar mensajes al inicio
mostrarMensajes();
