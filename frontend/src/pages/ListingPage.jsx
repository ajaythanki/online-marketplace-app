import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import ItemCard from "../components/ItemCard";
import { setItems } from "../redux/features/item/itemSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetItems } from "../redux/features/item/hooks/useGetItems";
import Layout from "../components/Layout";

const ListingPage = () => {
  const [filter, setFilter] = useState("ALL");
  const [filteredItems, setFilteredItems] = useState([]);
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

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const { list: items, totalPages } = useSelector((state) => state.item);

  const { data, isSuccess, isFetching, isError, isLoading } = useGetItems();
  useEffect(() => {
    if (!items.length && isSuccess) {
      dispatch(setItems(data));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (filter !== "ALL" && items.length > 0) {
      const filtered = [
        ...items.filter((item) => {
          return item.category.toLowerCase() === filter.toLowerCase();
        }),
      ];
      setFilteredItems(filtered);
      setCurrentPage(1);
    }
    if (filter === "ALL") {
      setFilteredItems([...items]);
    }
  }, [filter, items, currentPage]);

  const handleFilterChange = (e) => {
    if (e.target.name === "category") {
      setFilter(e.target.value);
    }
    if (e.target.value === "high-to-low") {
      setFilteredItems([...filteredItems]?.sort((a, b) => b.price - a.price));
    }
    if (e.target.value === "low-to-high") {
      setFilteredItems([...filteredItems]?.sort((a, b) => a.price - b.price));
    }
  };
  if (isError) return <div>Something went wrong please try again later.</div>;
  if (isLoading || isFetching) return <Loader />;
  return (
    <Layout>
      <div className="ml-auto mr-auto max-w-2xl lg:pl-8 lg:pr-8 lg:max-w-7xl">
        <div className="flex-col flex-wrap lg:flex lg:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-center text-gray-800">
            Item Listings
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
          {filteredItems.length === 0 && (
            <p style={{ textAlign: "center" }}>No items found.</p>
          )}
          {filteredItems.length > 0 &&
            filteredItems
              .slice((currentPage - 1) * 8, currentPage * 8)
              .map((item) => <ItemCard key={item.id} {...item} />)}
        </div>
        {filteredItems.length > 8 && (
          <Pagination
            totalPages={Math.round(totalPages / 8)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </Layout>
  );
};

export default ListingPage;
