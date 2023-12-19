const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', async () => {
  try {
    const response = await fetch('/logout', {
      method: 'GET'
    });
    if (response.ok) {
      console.log('Sesión cerrada. Redirigiendo a la ruta raíz...');
    } else {
      console.error('Error al cerrar sesión:', response.statusText);
    }
  } catch (error) {
    console.error('Error inesperado:', error.message);
  }
});