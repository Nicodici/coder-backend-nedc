const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', async () => {
  try {
    const response = await fetch('/api/sessions/logout', {
      method: 'GET'
    });
    if (response) {
      console.log('Sesión cerrada. Redirigiendo a la ruta raíz...');
    } else {
      console.error('Error al cerrar sesión');
    }
  } catch (error) {
    console.error('Error inesperado:', error.message);
  }
});