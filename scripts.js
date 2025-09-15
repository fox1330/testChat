
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
  import { getFirestore, collection, addDoc,doc,getDoc,getDocs, deleteDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGLYrmUWpvkk3pMaLktFnOlm4fYlPFhWY",
  authDomain: "chatdatabase-96eb6.firebaseapp.com",
  projectId: "chatdatabase-96eb6",
  storageBucket: "chatdatabase-96eb6.firebasestorage.app",
  messagingSenderId: "536096851320",
  appId: "1:536096851320:web:161db74ebfb864765d748d",
  measurementId: "G-JHDZYFLXCY"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
const input = document.getElementById("message-input")
const input3 = document.getElementById("name-input")
const botao = document.getElementById("send-button")
const botao3 = document.getElementById("name-button")
const botaodel = document.getElementById("delete-button")
const paragrafo = document.getElementById("message-display")
const body = document.getElementById("chat-container")

function messageDisplay(doc){
  const data = doc.data();
  const messageContainer = document.createElement("div")
  const name = document.createElement("div")
  const text = document.createElement("div")
  const sId = (data.name === usernameS?"container":"other")
  const ident = (data.name === usernameS?"Você": data.name)
  messageContainer.className = sId
  name.className = "name-" + sId
  text.className = "text"
  text.textContent = data.text
  name.textContent = ident
  messageContainer.appendChild(name)
  messageContainer.appendChild(text)
  paragrafo.appendChild(messageContainer)
  
  
//  paragrafo.innerHTML += `<span id=${sId}>${data.name}${data.text}</span>`
  paragrafo.scrollTop = paragrafo.scrollHeight
}
const q = query(
      collection(db, "chats"),
      orderBy("ts")
    );
    onSnapshot(q, (snapshot) => {
      paragrafo.innerHTML = "";
      snapshot.forEach(messageDisplay);
    });

// verifica se há alguma informacao guardada como "username", caso nao houver o valor sera vazio
let usernameS = localStorage.getItem("username") || "";
//se houver uma informação sobre usernameS, o texto na caixa de input sera o mesmo valor existente
if (usernameS) input3.value = usernameS
botaodel.addEventListener("click", async ()=>{
  const snap = await getDocs(collection(db, "chats"))
  snap.forEach(async (oc) => {
    await deleteDoc(doc(db, "chats", oc.id ))})
})
botao3.addEventListener("click", ()=>{
  const change = false
  if(!usernameS || change == true){
  const name = input3.value.trim();
  if (!name) return alert("digite um nome")
  usernameS = name
  localStorage.setItem("username", usernameS)
  }
  botao3.remove()
})
botao.addEventListener("click", async (e)=> {
  e.preventDefault;
  const valor = input.value.trim();
  if (!valor) return;
  if (!usernameS) return alert("você precisa definir um nome para enviar mensagem.")
  input.value = ""
  await addDoc(collection(db, "chats"), {
        name: usernameS,
        text: valor,
        ts: serverTimestamp()
  })
  paragrafo.scrollTop = paragrafo.scrollHeight
})
