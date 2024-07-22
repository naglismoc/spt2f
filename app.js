const apiUrl = 'http://localhost:8080/api/authors';

// Function to fetch all authors
async function fetchAuthors() {
    try {
        const response = await axios.get(apiUrl);
        const authors = response.data;
        const authorsList = document.getElementById('authors-list');
        authorsList.innerHTML = '';

        authors.forEach(author => {
            const authorRow = `
                <tr>
                    <td>${author.id}</td>
                    <td>${author.name}</td>
                    <td>${author.surname}</td>
                    <td>
                        <a href="./edit.html?id=${author.id}" >Edit</a>
                    
                        <button class="delete" value=${author.id}>Delete</button>
                    </td>
                </tr>
            `;
            authorsList.insertAdjacentHTML('beforeend', authorRow);
        });
        editDeleteButtons();
    } catch (error) {
        console.error('Error fetching authors:', error);
    }
}

// Function to create or update an author
async function saveAuthor(event) {
    console.log("saugom");
    event.preventDefault();

    const id = document.getElementById('author-id').value;
    const name = document.getElementById('author-name').value;
    const surname = document.getElementById('author-surname').value;
    console.log(id);
    try {
        if (id) {
            // Update existing author
            await axios.put(`${apiUrl}/${id}`, { name, surname });
        } else {
            // Create new author
            await axios.post(apiUrl, { name, surname });
        }
        
        window.location.href = "http://127.0.0.1:5500/views/";
    } catch (error) {
        console.error('Error saving author:', error);
    }
}

// Function to populate the form for editing an author
async function editAuthor() {
    console.log("redaguojam");
    let id = document.URL.split("=").pop()
    console.log(id);
    try {
        const response = await axios.get(`${apiUrl}/${id}`);
        const author = response.data;

        document.getElementById('author-id').value = author.id;
        document.getElementById('author-name').value = author.name;
        document.getElementById('author-surname').value = author.surname;
    } catch (error) {
        console.error('Error fetching author:', error);
    }
}

// Function to delete an author
async function deleteAuthor(id) {
    try {
        await axios.delete(`${apiUrl}/${id}`);
        fetchAuthors();
    } catch (error) {
        console.error('Error deleting author:', error);
    }
}

function editDeleteButtons() {
    let buttonsEdit = document.querySelectorAll(".edit");
    console.log(buttonsEdit);
    for (let i = 0; i < buttonsEdit.length; i++) {

        buttonsEdit[i].addEventListener("click",editAuthor);
    }

    let buttonsDelete= document.querySelectorAll(".delete");
    console.log(buttonsDelete);
    for (let i = 0; i < buttonsDelete.length; i++) {

        buttonsEdit[i].addEventListener("click",deleteAuthor);
    }
}

// Fetch authors when the page loads
// document.addEventListener('DOMContentLoaded', fetchAuthors);
// setTimeout(function(){
//   editDeleteButtons();
// }, 1000); 
try{
    document.querySelector("#author-form").addEventListener("submit",saveAuthor);
}catch(Exeption){}