const firebaseConfig = {
    apiKey: "AIzaSyBjTSABchzKfRpzqMCvUiZT-c-0GTCAtnc",
  authDomain: "pruebadatabase-7e515.firebaseapp.com",
  projectId: "pruebadatabase-7e515",
  storageBucket: "pruebadatabase-7e515.firebasestorage.app",
  messagingSenderId: "299548159984",
  appId: "1:299548159984:web:6493e90ad4f315439ff735",
  measurementId: "G-TBR64S993K",
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Función para mostrar los datos//
  const printData = () => {
    const listaContactos = document.getElementById("listaContactos");
    listaContactos.innerHTML = "";
  
    db.collection("usuarios")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
           const contactoDiv = document.createElement("div");
           contactoDiv.classList.add('contacto-card');//Permite dar estilo específico a cada tarjeta de contacto//
           contactoDiv.innerHTML = `
               <p>Nombre: ${doc.data().nombre}</p>
               <p>Email: ${doc.data().email}</p>
               <p>Mensaje: ${doc.data().mensaje}</p>
               <p>URL: ${doc.data().url}</p>
               <p>ID: ${doc.id}</p>
               <button class="delete-btn" data-id="${doc.id}">Borrar</button> 
            
                `;  
       const deleteBtn = contactoDiv.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
           borrarDocumento(doc.id);
               })      
        listaContactos.appendChild(contactoDiv);
      });
     })
     .catch(error => console.error("Error al obtener documentos: ", error));
  };
  
  // Función para agregar nuevo contacto//
  const agregarContacto = (contacto) => {
    return db.collection("usuarios")
        .add(contacto)
        .then((docRef) => {
            console.log("Documento agregado con ID: ", docRef.id);
            printData();
            return docRef;
     })
        .catch((error) => {
            console.error("Error al agregar documento: ", error);
            throw error;
     });
  };
  
  // Función para borrar un documento específico//
  const borrarDocumento = (id) => {
    db.collection('usuarios').doc(id).delete()
        .then(() => {
            console.log(`Usuario ${id} ha sido borrado`);
            printData();
        })
        .catch((error) => {
            console.error('Error borrando documento:', error);
            alert('Error al borrar el documento');
        });
  };
  
  // Event Listener para el formulario//
  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    const nuevoContacto = {
        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        mensaje: document.getElementById("mensaje").value,
        url: document.getElementById("url").value,
    };
  
    agregarContacto(nuevoContacto)
        .then(() => {
            // Limpiar el formulario después de agregar//
            event.target.reset();
        })
        .catch(() => alert('Error al agregar el contacto'));
  });
  
  // Event Listener para borrar todos los contactos//
  document.getElementById("borrarTodo").addEventListener("click", function () {
        db.collection("usuarios")
            .get()
            .then((querySnapshot) => {
                const promesas = [];
                querySnapshot.forEach((doc) => {
                    promesas.push(doc.ref.delete());
                });
                return Promise.all(promesas);
            })
            .then(() => {
                alert("Todos los contactos han sido eliminados");
                printData();
            })
            .catch((error) => {
                console.error('Error al borrar documentos:', error);
                alert('Error al borrar los contactos');
            });
          }
  );
  // Event Listener para borrar contacto seleccionado//
  document.getElementById("borrarSeleccionado").addEventListener("click", function () {
    const id = prompt('Introduce el ID del contacto a borrar');
    if (id) {
        borrarDocumento(id);
    }
  });
  
  // Cargar datos iniciales//
  document.addEventListener('DOMContentLoaded', () => {
    printData();
  });