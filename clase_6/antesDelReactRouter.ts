function navigate(path: string): void {
    window.history.pushState({}, '', path)
    renderCurrentRoute()
}

function renderCurrentRoute(): void {
    const path = window.location.pathname
    const root = document.getElementById('root')

    if (!root) return

    if (path === '/') {
        root.innerHTML = `
      <h1>Inicio</h1>
      <button id="products-button">Ver productos</button>
    `
    } else if (path === '/products') {
        root.innerHTML = `
      <h1>Productos</h1>
      <button id="product-button">Ver producto 25</button>
    `
    } else if (path.startsWith('/products/')) {
        const productId = path.split('/')[2]

        root.innerHTML = `
      <h1>Producto ${productId}</h1>
      <button id="back-button">Volver</button>
    `
    } else {
        root.innerHTML = '<h1>404 - Página no encontrada</h1>'
    }

    document
        .getElementById('products-button')
        ?.addEventListener('click', () => navigate('/products'))

    document
        .getElementById('product-button')
        ?.addEventListener('click', () => navigate('/products/25'))

    document
        .getElementById('back-button')
        ?.addEventListener('click', () => window.history.back())
}

window.addEventListener('popstate', renderCurrentRoute)

renderCurrentRoute()