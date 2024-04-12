async function getProducts() {
    const products = await window.products.get()
    console.log(products[0])
    return products
}
