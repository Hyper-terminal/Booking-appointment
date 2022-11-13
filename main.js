const urlKey = "add ur key here"

let axiosInstance = axios.create({
    baseURL: "https://crudcrud.com/api/" + urlKey
})

// on loading the page show all users
window.addEventListener("DOMContentLoaded", () => {
    getUsers();
})

// create and display a single user from screen using user object
function displayUser(user) {

    let parentNode = document.getElementById("users");

    let childHtml = `<li id=${user._id} class="user-list-item" >Name: ${user.username} & Email: ${user.email} 
    
    <button class="user-list-editbutton" onclick=editUser('${JSON.stringify(user)}')>✏️</button>

    <button class="user-list-delbutton" onclick=deleteUser('${user._id}')>❌</button>
    

    </li>`


    parentNode.innerHTML += childHtml;

}


// delete a single user from screen based on id provided
function removeUserFromScreen(id) {
    const parentNode = document.getElementById("users");

    const nodeToBeDeleted = document.getElementById(id);

    parentNode.removeChild(nodeToBeDeleted);

}




// *************** Routes Methods ***************

// save form data using post request by default
async function postForm(e) {

    e.preventDefault();

    try {

        let { username: { value: username }, email: { value: email } } = e.target;

        const user = {
            username,
            email
        }

        let res = await axiosInstance.post('/users', user);

        displayUser(res.data);


        // reset input fields
        e.target.username.value = '';
        e.target.email.value = '';

    }
    catch (error) {

        console.error(error);

    }
}

// delete user from backend and screen
async function deleteUser(id) {
    try {

        let res = await axiosInstance.delete('/users/' + id);
        removeUserFromScreen(id);

    } catch (error) {
        console.error(error);
    }
}

// request users from backend and displays them on screen
async function getUsers() {
    try {

        const res = await axiosInstance('/users');

        let usersArray = res.data;

        usersArray.forEach((user) => {
            displayUser(user);
        })


    }
    catch (error) {

        console.error(error)

    }
}


function editUser(user) {

    let newUser = JSON.parse(user);

    document.getElementById("username").value = newUser.username;
    document.getElementById("email").value = newUser.email;

    deleteUser(newUser._id);

}
