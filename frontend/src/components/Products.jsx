import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import fetchProducts from "../services/products";
import Pagination from "./Pagination";
import Loader from "./Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const categories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting",
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetchProducts()
      .then((productsData) => {
        setProducts(productsData.products);
        setFilteredProducts(productsData.products);
        setTotalPages(Math.round(productsData.total / 8));
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  const handleFilterChange = (e) => {
    if (e.target.name === "category") {
      setFilter(e.target.value);
    }
    if (e.target.value === "high-to-low") {
      setFilteredProducts(
        [...filteredProducts]?.sort((a, b) => b.price - a.price)
      );
    }
    if (e.target.value === "low-to-high") {
      setFilteredProducts(
        [...filteredProducts]?.sort((a, b) => a.price - b.price)
      );
    }
  };

  useEffect(() => {
    if (filter !== "ALL" && products.length > 0) {
      const filtered = [
        ...products.filter((product) => {
          return product.category.toLowerCase() === filter.toLowerCase();
        }),
      ];
      setFilteredProducts(filtered);
      setTotalPages(Math.round(filtered.length / 8));
      setCurrentPage(1);
    }
    if (filter === "ALL") {
      setFilteredProducts([...products]);
      setTotalPages(Math.round(products.length / 8));
    }
  }, [filter, products, currentPage]);

  if (isError) return <div>Something went wrong please try again later.</div>;
  if (isLoading) return <Loader />;
  return (
    <div className="ml-auto mr-auto max-w-2xl">
      <div className="flex-col flex-wrap lg:flex lg:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-center text-gray-800">
          Products
        </h2>
        <div className="mt-5 flex-col flex-wrap gap-2 items-center md:flex lg:flex-row lg:justify-center xl:mt-0 xl:gap-5">
          <div className="flex flex-col gap-2.5 w-full md:justify-around lg:flex-row lg:flex-1 lg:items-center">
            <div className="flex flex-col">
              <label htmlFor="category">Category</label>
              <select
                className="p-3 border text-xl"
                id="category"
                name="category"
                value={filter}
                onChange={handleFilterChange}
              >
                <option value="ALL">All</option>
                {categories.map((cat, index) => (
                  <option
                    style={{ textTransform: "capitalize" }}
                    key={index}
                    value={cat}
                  >
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="price">Sort by Price</label>
              <select
                className="p-3 border text-xl"
                id="price"
                name="price"
                onChange={handleFilterChange}
              >
                <option value="">Select</option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {filteredProducts.length === 0 && (
          <p style={{ textAlign: "center" }}>No products found.</p>
        )}
        {filteredProducts.length > 0 &&
          filteredProducts
            .slice((currentPage - 1) * 8, currentPage * 8)
            .map((product) => <ProductCard key={product.id} {...product} />)}
      </div>
      {filteredProducts.length > 8 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Products;