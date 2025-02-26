import { Link } from "react-router-dom";
import Product from "./Product";
import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import floralsServices from "../services/floralsServices";
import categoryServices from "../services/categoryServices";
import Pagination from "../components/Pagination";
import toastMessage from "../components/Toast";

function FilterMenuLeft({ filterSubmit }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        categoryServices.getCategories().then((response) => {
            setCategories(response);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const filters = {
            categories: formData.getAll("categories"),
            color: formData.get("color") || "",
            status: formData.get("status") || "",
            minPrice: formData.get("minPrice"),
            maxPrice: formData.get("maxPrice"),
        };
        filterSubmit(filters);
    };

    return (
        <form onSubmit={handleSubmit}>
            <ul className="list-group list-group-flush rounded">
                {/* Phân loại */}
                <li className="list-group-item d-none d-lg-block">
                    <h5 className="mt-1 mb-2">Phân loại</h5>
                    {categories &&
                        categories.map((v) => (
                            <div key={v._id} className="mb-2 d-flex align-items-center">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={v._id}
                                    name="categories"
                                    value={v.name}
                                    style={{ height: "15px", width: "15px" }}
                                />
                                <label htmlFor={v._id} className="ms-2">
                                    {v.name}
                                </label>
                            </div>
                        ))}
                </li>

                {/* Màu sắc */}
                <li className="list-group-item">
                    <h5 className="mt-1 mb-1">Màu sắc</h5>
                    <div className="d-flex flex-column">
                        <input className="form-control" name="color" />
                    </div>
                </li>

                {/* Nơi Sản Xuất */}
                <li className="list-group-item">
                    <h5 className="mt-1 mb-1">Trạng thái</h5>
                    <div className="d-flex flex-column">
                        <input className="form-control" name="status" />
                    </div>
                </li>

                {/* Chọn Giá */}
                <li className="list-group-item">
                    <h5 className="mt-1 mb-2">Chọn Giá</h5>
                    <div className="d-grid d-block mb-3">
                        <div className="form-floating mb-2">
                            <input type="text" className="form-control" placeholder="Min" name="minPrice" defaultValue="0" />
                            <label>Min Price</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input type="text" className="form-control" placeholder="Max" name="maxPrice" defaultValue="500000" />
                            <label>Max Price</label>
                        </div>
                        <button type="submit" className="btn btn-dark">
                            Apply
                        </button>
                    </div>
                </li>
            </ul>
        </form>
    );
}

function ProductList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [florals, setFlorals] = useState([]);
    const [filters, setFilters] = useState({});
    const [searchData, setsearchData] = useState("");
    const [stockStatus, setStockStatus] = useState("");

    const loadData = useCallback(async () => {
        floralsServices
            .getFlorals(currentPage, 10, searchData, stockStatus, filters)
            .then((data) => {
                setFlorals(data.data);
                setTotalPages(data.metaData?.totalPages || 1);
            })
            .catch((error) => {
                toastMessage.error(error?.message || "❌ Lỗi khi tải danh sách hoa!");
            });
    }, [currentPage, filters, searchData, stockStatus]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage);
    };

    const handleFilterSubmit = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchQuery = formData.get("search");
        setCurrentPage(1);
        setsearchData(searchQuery);
    };

    const handleSelectStock = (event) => {
        const value = event.target.value;
        setStockStatus(value);
        setCurrentPage(1);
    };

    return (
        <div className="container mt-5 py-4 px-xl-5">
            <ScrollToTopOnMount />
            <nav aria-label="breadcrumb" className="bg-custom-light rounded">
                <ol className="breadcrumb p-3 mb-0">
                    <li className="breadcrumb-item">
                        <Link className="text-decoration-none link-secondary" to="/products" replace>
                            Tất cả sản phẩm
                        </Link>
                    </li>
                </ol>
            </nav>

            <div className="row mb-4 mt-lg-3">
                <div className="d-none d-lg-block col-lg-3">
                    <div className="border rounded shadow-sm">
                        <FilterMenuLeft filterSubmit={handleFilterSubmit} />
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="d-flex flex-column h-100">
                        <div className="row mb-3">
                            <div className="col-lg-3 d-none d-lg-block">
                                <select className="form-select" value={stockStatus} onChange={handleSelectStock}>
                                    <option value="">Tất cả</option>
                                    <option value="available">Còn hàng</option>
                                    <option value="outofstock">Hết hàng</option>
                                </select>
                            </div>
                            <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row">
                                <div className="input-group">
                                    <form onSubmit={handleSearchSubmit} className="d-flex w-100">
                                        <input className="form-control" type="text" placeholder="Tìm tên / mô tả..." name="search" />
                                        <button className="btn btn-outline-dark" type="submit">
                                            <FontAwesomeIcon icon={["fas", "search"]} />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className={"row g-3 mb-4 flex-grow-1 row-cols-xl-3"}>
                            {florals && florals.map((floral, i) => <Product key={floral._id} floral={floral} percentOff={i < 2 ? 15 : null} />)}
                        </div>
                        <div className="mt-auto">
                            <Pagination onPageChange={handlePageChange} totalPages={totalPages} currentPage={currentPage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductList;
