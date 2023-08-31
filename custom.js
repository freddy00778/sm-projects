document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('.wpcf7-form'); // Adjust selector to match your form

    form.addEventListener('wpcf7submit', function (event) {
        var button = document.createElement('button');
        button.textContent = 'New Button';
        button.setAttribute('type', 'button');

        // Append the button after the form fields
        form.insertBefore(button, form.querySelector('input[type="submit"]').nextSibling);
    });
});
