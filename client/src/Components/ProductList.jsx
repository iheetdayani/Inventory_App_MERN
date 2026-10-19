
import { useState, useEffect } from 'react'
import { GetAllproducts, DeleteProduct } from '../Services/ProductService';

function ProductList() {
  const [Products, setproducts] = useState([]);
  const [search, setsearch] = useState("");
  const loadproducts = async () => {
    try {
      const response = await GetAllproducts();
      setproducts(response.data);
      console.log("ProductList Fetched SuccessFully");
    } catch (error) {
      console.log(error);
      console.log(error.message);
      ;
    }
  }
  const totalstock = Products.reduce((total, Product) => {
    return total + Number(Product.stock)
  }, 0);
  const DeleteInventory = async (id) => {
    try {
      await DeleteProduct(id);
      alert("product delete SuccessFully");
      loadproducts();
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    loadproducts();
  }, []);
  const FilteredProducts = Products.filter((Product) => {
    return Product.productName.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#"> Inventory Management</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>

                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => { setsearch(e.target.value) }} />
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
      <div className="card border-0 shadow-sm rounded-4 mt-4">
        <div className="card-body p-4 d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-secondary mb-1">Total Stock</h6>
            <h3 className="fw-bold text-primary mb-0">
              {totalstock.toLocaleString("en-IN")} Units
            </h3>
          </div>

          <div className="bg-primary-subtle rounded-circle p-3">
            <i className="bi bi-box-seam fs-3 text-primary"></i>
          </div>
        </div>
      </div>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-1">
              Inventory Management
            </h2>
            <p className="text-secondary mb-0">
              Manage and monitor your products
            </p>
          </div>

          <span className="badge text-bg-primary fs-6">
            {Products.length} Products
          </span>
        </div>

        <div className="row g-4">
          {Products.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info text-center">
                No products found.
              </div>
            </div>
          ) : (
            FilteredProducts.map((product) => {
              const availableStock =
                Number(product.stock || 0) -
                Number(product.soldQuntity || 0);

              const lowStock =
                availableStock <= Number(product.reorderLevel || 0);

              return (
                <div className="col-12 col-md-6 col-lg-4" key={product._id}>
                  <div className="card border-0 shadow-sm rounded-4 h-100 product-card">
                    <div className="card-header bg-white border-0 pt-4 px-4">
                      <div className="d-flex justify-content-between align-items-start gap-2">
                        <div>
                          <span className="badge rounded-pill text-bg-light border mb-2">
                            {product.category}
                          </span>

                          <h5 className="fw-bold text-dark mb-1">
                            {product.productName}
                          </h5>

                          <small className="text-secondary">
                            Supplier: {product.supplier}
                          </small>
                        </div>

                        <span
                          className={`badge rounded-pill ${lowStock ? "text-bg-danger" : "text-bg-success"
                            }`}
                        >
                          {lowStock ? "Low Stock" : "In Stock"}
                        </span>
                      </div>
                    </div>

                    <div className="card-body px-4">
                      <div className="bg-light rounded-3 p-3 mb-4">
                        <small className="text-secondary d-block">
                          Unit Price
                        </small>
                        <h3 className="fw-bold text-primary mb-0">
                          ₹{Number(product.price).toLocaleString("en-IN")}
                        </h3>
                      </div>

                      <div className="row g-3">
                        <div className="col-6">
                          <div className="border rounded-3 p-3 h-100">
                            <small className="text-secondary d-block">
                              Total Stock
                            </small>
                            <h5 className="fw-bold mb-0">
                              {product.stock}
                            </h5>
                          </div>
                        </div>

                        <div className="col-6">
                          <div className="border rounded-3 p-3 h-100">
                            <small className="text-secondary d-block">
                              Sold Quantity
                            </small>
                            <h5 className="fw-bold mb-0">
                              {product.soldQuntity}
                            </h5>
                          </div>
                        </div>

                        <div className="col-6">
                          <small className="text-secondary">
                            Available Stock
                          </small>
                          <h6 className={`fw-bold mb-0 ${lowStock ? "text-danger" : "text-success"
                            }`}>
                            {availableStock} units
                          </h6>
                        </div>

                        <div className="col-6">
                          <small className="text-secondary">
                            Reorder Level
                          </small>
                          <h6 className="fw-semibold mb-0">
                            {product.reorderLevel} units
                          </h6>
                        </div>
                      </div>
                    </div>

                    <div className="card-footer bg-white border-0 px-4 pb-4">
                      <div className="border-top pt-3 d-flex align-items-center">
                        <span className="text-secondary me-2">
                          <i className="bi bi-geo-alt"></i>
                        </span>
                        <span className="small text-secondary">
                          Warehouse: <strong className="text-dark">
                            {product.warehouse}
                          </strong>
                        </span>
                        <div className="col-md-12">
                          <button className="btn btn-danger" onClick={() => { DeleteInventory(product._id) }}>Delete Product</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>

  );
}

export default ProductList
