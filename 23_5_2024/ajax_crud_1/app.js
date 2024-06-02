let startIndex = 0;
document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:8001';
    const booksUrl = `${apiUrl}/books`;

    const usersTableBody = document.querySelector('#usersTable tbody');
    const booksTableBody = document.querySelector('#booksTable tbody');

    const createUserForm = document.getElementById('createUserForm');
    const createFirstNameInput = document.getElementById('createFirstName');
    const createLastNameInput = document.getElementById('createLastName');

    const deleteUserForm = document.getElementById('deleteUserForm');
    const deleteUserIdInput = document.getElementById('deleteUserId');

    const updateUserForm = document.getElementById('updateUserForm');
    const updateUserIdInput = document.getElementById('updateUserId');
    const updateFirstNameInput = document.getElementById('updateFirstName');
    const updateLastNameInput = document.getElementById('updateLastName');

    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const pageNumberDisplay = document.getElementById('pageNumber');
    const limit = 500;
    let currentPage = 1;

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${apiUrl}/users`);
            const users = await response.json();
            displayUsers(users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const displayUsers = (users) => {
        usersTableBody.innerHTML = '';
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
            `;
            usersTableBody.appendChild(row);
        });
    };

    const createUser = async (event) => {
        event.preventDefault();
        const newUser = {
            firstName: createFirstNameInput.value,
            lastName: createLastNameInput.value,
        };

        try {
            await fetch(`${apiUrl}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
            createFirstNameInput.value = '';
            createLastNameInput.value = '';
            fetchUsers();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const deleteUser = async (event) => {
        event.preventDefault();
        const userId = deleteUserIdInput.value;

        try {
            await fetch(`${apiUrl}/users/${userId}`, {
                method: 'DELETE',
            });
            deleteUserIdInput.value = '';
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const updateUser = async (event) => {
        event.preventDefault();
        const updatedUser = {
            firstName: updateFirstNameInput.value,
            lastName: updateLastNameInput.value,
        };

        try {
            await fetch(`${apiUrl}/users/${updateUserIdInput.value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });
            updateUserIdInput.value = '';
            updateFirstNameInput.value = '';
            updateLastNameInput.value = '';
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const fetchBooks = async (page) => {
        try {
            console.log(`Fetching books for page ${page}`); // Add this line to log the page number
            const response = await fetch(`${booksUrl}?_page=${page}&_limit=${limit}`);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const books = await response.json();
            console.log('adasds',books);
            console.log(`Fetched books for page ${page}:`, books); // Debugging log
            displayBooks(books);
            updatePaginationButtons(page, books.length);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };
    
    const displayBooks = (books) => {
        booksTableBody.innerHTML = ''; // Clear the table body before adding new books
        console.log(startIndex);
        const endIndex = Math.min(startIndex + 50); // Calculate the end index
    
        // Loop through the books array from startIndex to endIndex
        for (let i = startIndex; i < endIndex; i++) {
            const book = books[i];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.id}</td>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.numPages}</td>
            `;
            booksTableBody.appendChild(row);
        }
        startIndex += 50;
    };
    
    const updatePaginationButtons = (page, fetchedBooksCount) => {
        currentPage = page;
        pageNumberDisplay.textContent = `Page ${page}`;
        prevPageButton.disabled = page === 1;
        nextPageButton.disabled = fetchedBooksCount < limit;
    };

    createUserForm.addEventListener('submit', createUser);
    deleteUserForm.addEventListener('submit', deleteUser);
    updateUserForm.addEventListener('submit', updateUser);

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            fetchBooks(currentPage - 1);
        }
    });
    
    nextPageButton.addEventListener('click', () => {
        console.log('Next button clicked');
        fetchBooks(currentPage + 1);
    });

    // Initial fetch to populate the table
    fetchUsers();
    fetchBooks(currentPage);
});
