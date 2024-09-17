document.addEventListener('DOMContentLoaded', () => {
    // Obtener los datos del usuario del localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));

    // Verificar si hay datos y mostrarlos en la página
    if (userData) {
        console.log('Datos del usuario:', userData);

        // Mostrar los datos del usuario en el HTML
        document.getElementById('user-email').textContent = userData.correo;
        document.getElementById('user-id').textContent = `ID de usuario: ${userData.id_usuario}`;

        // Mostrar el div con la información del usuario
        document.getElementById('user-info').style.display = 'block';
    } else {
        console.log('No hay datos de usuario almacenados.');

        // Ocultar el div si no hay datos de usuario
        document.getElementById('user-info').style.display = 'none';
    }
});
