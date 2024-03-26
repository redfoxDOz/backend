const fs = require ('fs');

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  saveProducts() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2));
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const id = this.generateId();
    const existingProduct = this.products.find(product => product.code === code);
    if (existingProduct) {
      throw new Error('El código del producto ya está en uso.');
    }

    const newProduct = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };
    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw new Error('Producto no encontrado.');
    }
    return product;
  }

  updateProduct(id, updatedFields) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw new Error('Producto no encontrado.');
    }
    this.products[index] = { ...this.products[index], ...updatedFields };
    this.saveProducts();
    return this.products[index];
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw new Error('Producto no encontrado.');
    }
    this.products.splice(index, 1);
    this.saveProducts();
  }

  generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}

const filePath = 'productManager.json';
const productManager = new ProductManager(filePath);

console.log(productManager.getProducts());

// Agregar un nuevo producto
console.log ("Ingresando producto");
const newProduct = productManager.addProduct("Nuevo Producto", "Este es un producto de prueba", 200, "Sin Imagen ", "1", 25);
console.log(newProduct,);

// Actualizar un producto existente
console.log ("Producto actualizado el precio, codigo y stock  ");
const updatedProduct = productManager.updateProduct(newProduct.id, { price: 500, code: "2", stock:11212122  });
console.log(updatedProduct, );

// Eliminar un producto
console.log(" Producto eliminado de la BD");
productManager.deleteProduct(newProduct.id);
console.log(productManager.getProducts(),);
