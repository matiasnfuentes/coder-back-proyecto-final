# Proyecto Final Coder Backend

El proyecto consta hasta en momento de una API la cual tiene 2 endpoins principales:

## /api/productos:

1. GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
2. POST: '/' - Para incorporar productos al listado (disponible para administradores)
3. PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
4. DELETE: '/:id' - Borra un producto por su id (disponible para administradores)

## /api/carrito

1. POST: '/' - Crea un carrito y devuelve su id.
2. DELETE: '/:id' - Vacía un carrito y lo elimina.
3. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
4. POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
5. DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto

Desarrollado en **Javascript** utlizando **Express** como framework principal.

## Arquitectura 

Se busca de forma *básica* desarrollar una arquitectura de capas que permita modificar la forma en que se persisten los datos sin necesidad de modificar otra parte del proyecto, a excepción de la capa de persistencia.
