const firebaseConfig = {
  apiKey: "AIzaSyBjTSABchzKfRpzqMCvUiZT-c-0GTCAtnc",
  authDomain: "pruebadatabase-7e515.firebaseapp.com",
  projectId: "pruebadatabase-7e515",
  storageBucket: "pruebadatabase-7e515.firebasestorage.app",
  messagingSenderId: "299548159984",
  appId: "1:299548159984:web:6493e90ad4f315439ff735",
  measurementId: "G-TBR64S993K",
};

firebase.initializeApp(firebaseConfig); // Inicializaar app Firebase

const db = firebase.firestore(); // db representa mi BBDD //inicia Firestore
// Array para almacenar los contactos//
let contactos = [];
db.collection("usuarios")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data().mensaje);
    });
  });
const printData = () => {
  //Petición a Firestore para leer todos los documentos de la colección album
  const listaContactos = document.getElementById("listaContactos");
  listaContactos.innerHTML = "";

  db.collection("usuarios")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const contactoDiv = document.createElement("div");
        const botonBorrar = document.createElement("button")
        botonBorrar.setAttribute("id", doc.id)
        botonBorrar.addEventListener("click" , ()=>{
            db.collection('usuarios').doc(doc.id).delete().then(() => {
                alert(`Usuario ${doc.id} ha sido borrado`);
                //Clean
                document.getElementById('listaContactos').innerHTML = "";
                //Read all again¡
              })
                .catch(() => console.log('Error borrando documento'));
            
        })
        contactoDiv.innerHTML = `
            <p>Nombre: ${doc.data().nombre}</p>
            <p>Email: ${doc.data().email}</p>
            <p>Mensaje: ${doc.data().mensaje}</p>
            <p>URL: ${doc.data().url}</p>
            <p>ID: ${doc.id}</p>
        `;
        contactoDiv.appendChild(botonBorrar)
        listaContactos.appendChild(contactoDiv);
      });
    });
};
const readAll = (array) => {
  db.collection("usuarios")
    .add(array)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      printData();
    })
    .catch((error) => console.error("Error adding document: ", error));
};

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  // Obtener valores de el formulario//
  const nuevoContacto = {
    nombre: document.getElementById("nombre").value,
    email: document.getElementById("email").value,
    mensaje: document.getElementById("mensaje").value,
    url: document.getElementById("url").value,
  };
  readAll(nuevoContacto);
});
// Borrar todos los contactos
document.getElementById("borrarTodo").addEventListener("click", function () {
    db.collection("usuarios")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
  //printData();
  //window.location.reload();
  contactos = [];
  //readAll();
  alert("Todos los contactos han sido eliminados");
});
  document.getElementById("borrarSeleccionado").addEventListener("click", function () {
  alert("iefbibo")
    const id = prompt('Introduce el ID a borrar');
  db.collection('usuarios').doc(id).delete().then(() => {
    alert(`Usuario ${id} ha sido borrado`);
    //Clean
    document.getElementById('listaContactos').innerHTML = "";
    //Read all again¡
  })
    .catch(() => console.log('Error borrando documento'));

  })
