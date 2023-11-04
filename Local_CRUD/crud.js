const form = document.getElementById('formRegister')
const nameInt = document.getElementById('nameInput')
const mailInt = document.getElementById('emailInput')
const tableB = document.getElementById('table_body')


let data = JSON.parse(localStorage.getItem('formData')) || [];
console.log(data)

form.addEventListener('submit', (event)=> {
    event.preventDefault();

    const name = nameInt.value;
    const mail = mailInt.value;

    if(name && mail){
        const newData = {name,mail}
        data.push(newData)
        saveDateLocal();
        renderTable();
        form.reset()
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
        const row = document.createElement('tr')
        const nameCell = document.createElement('td');
        const mailCell = document.createElement('td');
        const actionCell = document.createElement('td');
        const editButton = document.createElement('button')
        const deleteButton = document.createElement('button')

        nameCell.textContent = item.name;
        mailCell.textContent = item.mail;
        editButton.textContent = 'Editar'
        deleteButton.textContent = 'Borrar'

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