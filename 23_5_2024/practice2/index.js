document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('elemFormCreate');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        const formData = new FormData(form);

        // Log the FormData entries to the console
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        // Alternatively, log the entire FormData object
        console.log(formData);
    });
});
