async function getProducts() {
    const products = await window.products.get()
    return products
}
