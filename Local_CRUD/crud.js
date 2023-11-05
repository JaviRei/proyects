const form = document.getElementById('formRegister')
const nameInt = document.getElementById('nameInput')
const mailInt = document.getElementById('emailInput')
const tableB = document.getElementById('table_body')

// se creal el jason donde se almacenara la info o se crea un array de objetos
let data = JSON.parse(localStorage.getItem('formData')) || [];
console.log(data)


//Evento del botón con una funcion al listener 
form.addEventListener('submit', (event)=> {
    //evita problems al evaluar el evento
    event.preventDefault();

    //asignamos el valor de los inputs y los guardamos en una variable
    const name = nameInt.value;
    const mail = mailInt.value;

    //si name y mail tienen un valor accede a la condicion
    if(name && mail){
        //crea un nuevo objeto con la proiedad y valor que traen las variables asignadas ya
        const newData = {name,mail}
        //Al contenedor data se le ingresa un nuevo objeto mediante un pop con los nuevos valores
        data.push(newData)

        saveDateLocal();
        renderTable();
        //.reset() Esta función reinicia los inputs y el form
        form.reset()
    }
    else {
        alert('Texto invalido, ingresa la información correcta')
        console.warn('Enviando inputs sin texto')
    }
})


//Funcion para almacenar en el localstorage
//investigar sobre :
//localstorage
//JSON
const saveDateLocal = () => {
    localStorage.setItem('formData',JSON.stringify(data))
}



const renderTable = () => {
    tableB.innerHTML = ``

    data.forEach((item,index) => {
        // Creamos variables donde almacenamos los credores de html
        //.createElement(etiqueta html) Crea etiquetas que se insertan en el html
        const row = document.createElement('tr')
        const nameCell = document.createElement('td');
        const mailCell = document.createElement('td');
        const actionCell = document.createElement('td');
        const editButton = document.createElement('button')
        const deleteButton = document.createElement('button')

        //textContent asignar el valor de las propiedades como texto
        nameCell.textContent = item.name;
        mailCell.textContent = item.mail;
        //creas el boton y asignas el texto elegido
        editButton.textContent = 'Editar'
        deleteButton.textContent = 'Borrar'

        //Asignas con .classList.add('clase 1 clase 2 clase N') a las etiquetas que se vayan creando
        editButton.classList.add('button','button--edit')
        deleteButton.classList.add('button','button--delete')

        editButton.addEventListener('click',()=>{
            console.log(index)
            editData(index)
        })

        deleteButton.addEventListener('click',()=>{
            
            deleteData(index)
        })

        actionCell.appendChild(editButton)
        actionCell.appendChild(deleteButton)

        row.appendChild(nameCell)
        row.appendChild(mailCell)
        row.appendChild(actionCell)
        
        tableB.appendChild(row)

    })
}



const editData = (index) => {
    const item = data[index]
    console.log(item)
    nameInt.value = item.name
    mailInt.value = item.mail
    data.splice(index,1)
    saveDateLocal()
    renderTable()
}


const deleteData = (index) => {
    data.splice(index,1)
    saveDateLocal()
    renderTable()
}

renderTable();