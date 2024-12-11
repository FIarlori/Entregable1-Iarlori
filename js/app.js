const categorias = {
    smartphones: [
        { id: 1, nombre: "iPhone 14", precio: 1200 },
        { id: 2, nombre: "Samsung Galaxy S22", precio: 1000 },
    ],
    laptops: [
        { id: 1, nombre: "MacBook Air M1", precio: 1500 },
        { id: 2, nombre: "Dell XPS 13", precio: 1400 },
    ],
    accesorios: [
        { id: 1, nombre: "Auriculares Bose", precio: 300 },
        { id: 2, nombre: "Cargador Rápido", precio: 50 },
    ],
    tablets: [
        { id: 1, nombre: "iPad Pro", precio: 1100 },
        { id: 2, nombre: "Samsung Galaxy Tab", precio: 900 },
    ]
};

let carrito = [];

function mostrarProductosPrompt(categoria, productos) {
    let mensaje = `Ingrese el número del producto que desea comprar\nProductos en la categoría ${categoria} (precios sin impuestos):\n\n`;
    productos.forEach(producto => {
        mensaje += `${producto.id}. ${producto.nombre} - $${producto.precio}\n`;
    });
    mensaje += "\nIngrese RET para volver al menú anterior o ESC para salir";
    return mensaje;
}

function solicitarCantidad(producto) {
    while (true) {
        let cantidad = prompt(`¿Cuántas unidades de "${producto.nombre}" desea comprar?\n\nIngrese RET para volver al menú anterior o ESC para salir.`);
        if (cantidad === null || cantidad.toUpperCase() === "ESC") {
            return "ESC";
        } else if (cantidad.toUpperCase() === "RET") {
            return "RET";
        } else if (!isNaN(cantidad) && parseInt(cantidad) > 0) {
            return parseInt(cantidad);
        } else {
            alert("Por favor, ingrese una cantidad válida.");
        }
    }
}

function calcularTotal(precio, cantidad, impuesto = 0.21) {
    return precio * cantidad * (1 + impuesto);
}

function verCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
    } else {
        let mensaje = "Carrito de compras (precios con impuestos incluidos):\n\n";
        let totalGeneral = 0;
        carrito.forEach(item => {
            const totalProducto = calcularTotal(item.producto.precio, item.cantidad);
            mensaje += `${item.cantidad} x ${item.producto.nombre} - Total: $${totalProducto.toFixed(2)}\n`;
            totalGeneral += totalProducto;
        });
        mensaje += `\nTotal general: $${totalGeneral.toFixed(2)}`;
        alert(mensaje);
    }
}

function iniciarCompra() {
    let continuar = true;

    while (continuar) {
        const opcionPrincipal = prompt("Bienvenido a TecStore\nSeleccione una opción:\n\n0. Comprar\n1. Ver carrito de compras\n\nIngrese ESC para salir.");
        if (opcionPrincipal === null || opcionPrincipal.toUpperCase() === "ESC") {
            break;
        }

        switch (opcionPrincipal) {
            case "0":
                while (true) {
                    const categoria = prompt("Seleccione una categoría:\n\n1. Smartphones\n2. Laptops\n3. Accesorios\n4. Tablets\n\nIngrese RET para volver o ESC para salir.");
                    if (categoria === null || categoria.toUpperCase() === "ESC") {
                        continuar = false;
                        break;
                    }

                    if (categoria.toUpperCase() === "RET") {
                        break; 
                    }

                    let nombreCategoria = "";
                    let productos = [];
                    
                    switch (categoria) {
                        case "1":
                            productos = categorias.smartphones;
                            nombreCategoria = "Smartphones";
                            break;
                        case "2":
                            productos = categorias.laptops;
                            nombreCategoria = "Laptops";
                            break;
                        case "3":
                            productos = categorias.accesorios;
                            nombreCategoria = "Accesorios";
                            break;
                        case "4":
                            productos = categorias.tablets;
                            nombreCategoria = "Tablets";
                            break;
                        case "RET":
                        case "ret":
                            break;
                        default:
                            alert("Categoría no válida.");
                            continue;
                    }

                    let volver = false;
                    while (!volver) {
                        const mensaje = mostrarProductosPrompt(nombreCategoria, productos);
                        const idProductoSeleccionado = prompt(mensaje);

                        if (idProductoSeleccionado === null || idProductoSeleccionado.toUpperCase() === "ESC") {
                            continuar = false;
                            volver = true;
                            break;
                        } else if (idProductoSeleccionado.toUpperCase() === "RET") {
                            volver = true;
                            break;
                        }

                        const productoSeleccionado = productos.find(p => p.id === parseInt(idProductoSeleccionado));
                        if (!productoSeleccionado) {
                            alert("Producto no encontrado. Por favor, ingrese un número de producto válido.");
                            continue;
                        }

                        const cantidad = solicitarCantidad(productoSeleccionado);

                        if (cantidad === "RET") {
                            continue;
                        } else if (cantidad === "ESC") {
                            continuar = false;
                            volver = true;
                            break;
                        }

                        carrito.push({ producto: productoSeleccionado, cantidad });
                        alert(`Se agregó ${cantidad} unidad(es) de "${productoSeleccionado.nombre}" al carrito.`);
                    }
                    if (!continuar) break;
                }
                break;

            case "1":
                verCarrito();
                break;

            default:
                alert("Opción no válida. Intente nuevamente.");
        }
    }
    alert("Gracias por usar nuestro sistema de compras.");
}

iniciarCompra();
