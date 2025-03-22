let users = []; 
function displayUsers(usersToDisplay) {
  const userList = document.getElementById("userList");
  userList.innerHTML = ""; 

  usersToDisplay.forEach(user => {
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");
    userCard.innerHTML = `
      <p><strong>${user.name}</strong></p>
      <p>Age: ${user.age}</p>
    `;
    userList.appendChild(userCard);
  });
}

async function fetchUsers() {
  const loader = document.getElementById("loader");
  loader.style.display = "block"; 


  try {
  
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();

  
    users = data.map(user => ({
      name: user.name,
      age: Math.floor(Math.random() * (50 - 18 + 1)) + 18 
    }));

    displayUsers(users); 
  } catch (error) {
    console.error("Error loading data", error);
  } finally {
    loader.style.display = "none"; 
  }
}


function sortUsers(criteria) {
  const loader = document.getElementById("loader");
  loader.style.display = "block"; 

  setTimeout(() => {
    if (criteria === 'name') {
      users.sort((a, b) => a.name.localeCompare(b.name)); 
    } else if (criteria === 'age') {
      users.sort((a, b) => a.age - b.age); 
    }
    displayUsers(users);
    loader.style.display = "none"; 
  }, 500); 
}

function filterUsers() {
  const filterInput = document.getElementById("filterInput").value.toLowerCase();
  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(filterInput));
  displayUsers(filteredUsers); 
}
