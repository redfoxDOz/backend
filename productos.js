class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const id = this.generateId();
    const existingProduct = this.products.find(product => product.code === code);
    if (existingProduct) {
      throw new Error('Error, el código del producto ya está en uso.');
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
    return newProduct;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw new Error('Lo sentimos , producto no encontrado');
    }
    return product;
  }

  generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}

// NEW ProductManager
const productManager = new ProductManager();

// Llamar a getProducts arreglo vacío []
console.log(productManager.getProducts()); // []

// Agregar un nuevo producto
const newProduct = productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
console.log(newProduct);

// validar que producto se haya agregado correctamente
console.log(productManager.getProducts());

// validar ingreso de mismo codigo 
try {
  productManager.addProduct("producto prueba duplicado", "Este es otro producto prueba", 300, "Otra imagen", "abc123", 30);
} catch (error) {
  console.error(error.message); // El código del producto ya está en uso.
}

//  getProductById
try {
  const foundProduct = productManager.getProductById(newProduct.id);
  console.log(foundProduct);
} catch (error) {
  console.error(error.message); // No debería imprimir nada, ya que el producto está en la lista
}

//  getProductById con un ID no existente
try {
  productManager.getProductById("nonexistent_id");
} catch (error) {
  console.error(error.message); // Lo Siento , Producto no encontrado.
}
