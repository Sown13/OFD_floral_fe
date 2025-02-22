import { Link } from "react-router-dom";
import Product from "./Product";
import ProductH from "./ProductH";
import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import floralsServices from "../services/floralsServices";
import Paginate from "../components/Pagination";
import { jwtDecode } from "jwt-decode";
import toastMessage from "../components/Toast";

const categories = [
    "Hoa Mừng Sinh Nhật",
    "Hoa Hồng Đỏ",
    "Hoa Ngày 8/3",
    "Hoa Khai Chương",
    "Hoa Cưới",
    "Hoa Đẹp",
];

const brands = ["Hoa Dân Tổ", "Hoa Gucci", "Hoa Dior", "Hoa YSL"];

const manufacturers = [
    "Afriflora Sher (Ethiopia)",
    "Dümmen Orange (Hà Lan)",
    "Selecta One (Đức)",
    "Ball Horticultural (Mỹ)",
];

function FilterMenuLeft() {
    const [products, setproducts] = useState([]);
    const [categories, setCategories] = useState([]);

    return (
        <ul className="list-group list-group-flush rounded">
            <li className="list-group-item d-none d-lg-block">
                <h5 className="mt-1 mb-2">Tìm kiếm nhiều nhất</h5>
                <div className="d-flex flex-wrap my-2">
                    {categories.map((v, i) => {
                        return (
                            <Link
                                key={i}
                                to="/products"
                                className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                                replace
                            >
                                {v}
                            </Link>
                        );
                    })}
                </div>
            </li>
            <li className="list-group-item">
                <h5 className="mt-1 mb-1">Nhãn Hàng</h5>
                <div className="d-flex flex-column">
                    {brands.map((v, i) => {
                        return (
                            <div key={i} className="form-check">
                                <input className="form-check-input" type="checkbox" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    {v}
                                </label>
                            </div>
                        );
                    })}
                </div>
            </li>
            <li className="list-group-item">
                <h5 className="mt-1 mb-1">Nơi Sản Xuất</h5>
                <div className="d-flex flex-column">
                    {manufacturers.map((v, i) => {
                        return (
                            <div key={i} className="form-check">
                                <input className="form-check-input" type="checkbox" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    {v}
                                </label>
                            </div>
                        );
                    })}
                </div>
            </li>
            <li className="list-group-item">
                <h5 className="mt-1 mb-2">Chọn Giá</h5>
                <div className="d-grid d-block mb-3">
                    <div className="form-floating mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Min"
                            defaultValue="100000"
                        />
                        <label htmlFor="floatingInput">Min Price</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Max"
                            defaultValue="500000"
                        />
                        <label htmlFor="floatingInput">Max Price</label>
                    </div>
                    <button className="btn btn-dark">Apply</button>
                </div>
            </li>
        </ul>
    );
}

function ProductList() {
    const [viewType, setViewType] = useState({ grid: true });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [florals, setFlorals] = useState([]);
    const [decodedToken, setDecodedToken] = useState(null);

    const loadData = useCallback(async () => {
        floralsServices.getFlorals(currentPage, 10).then((data) => {
            setFlorals(data.data);
            setTotalPages(data.metaData?.totalPages || 1);
        });
    }, [currentPage]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setDecodedToken(decoded);
            } catch (error) {
                console.error("Invalid token:", error);
                setDecodedToken(null);
            }
        }
    }, []);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage);
    };

    function changeViewType() {
        setViewType({
            grid: !viewType.grid,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        const request = {
            name: formData.get("name"),
            price: Number(formData.get("price")),
            category:
                formData
                    .get("category")
                    ?.split(",")
                    .map((cat) => cat.trim()) || [],
            cover: formData.get("cover"),
            color: formData.get("color"),
            images:
                formData
                    .get("images")
                    ?.split(",")
                    .map((img) => img.trim()) || [],
            status: formData.get("status"),
            description: formData.get("description"),
            quantity: Number(formData.get("quantity")),
        };

        // Validate fields
        for (const key in request) {
            if (!request[key] || (Array.isArray(request[key]) && request[key].length === 0)) {
                toastMessage.error(`${key} is required`);
                return;
            }
        }

        if (!request.name) {
            toastMessage.error("Flower name is required");
            return;
        }
        if (!request.price) {
            toastMessage.error("Price is required");
            return;
        }
        if (!request.category) {
            toastMessage.error("Category is required");
            return;
        }
        if (!request.cover) {
            toastMessage.error("Cover image URL is required");
            return;
        }
        if (!request.images) {
            toastMessage.error("At least one image URL is required");
            return;
        }

        floralsServices.createFloral(request).then((response) => {
            console.log(response);
            loadData();
        });
    };

    return (
        <div className="container mt-5 py-4 px-xl-5">
            <ScrollToTopOnMount />
            <nav aria-label="breadcrumb" className="bg-custom-light rounded">
                <ol className="breadcrumb p-3 mb-0">
                    <li className="breadcrumb-item">
                        <Link
                            className="text-decoration-none link-secondary"
                            to="/products"
                            replace
                        >
                            Tất cả sản phẩm
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Cases &amp; Covers
                    </li>
                </ol>
            </nav>

            <div className="h-scroller d-block d-lg-none">
                <nav className="nav h-underline">
                    {categories.map((v, i) => {
                        return (
                            <div key={i} className="h-link me-2">
                                <Link
                                    to="/products"
                                    className="btn btn-sm btn-outline-dark rounded-pill"
                                    replace
                                >
                                    {v}
                                </Link>
                            </div>
                        );
                    })}
                </nav>
            </div>

            <div className="row mb-3 d-block d-lg-none">
                <div className="col-12">
                    <div id="accordionFilter" className="accordion shadow-sm">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button
                                    className="accordion-button fw-bold collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseFilter"
                                    aria-expanded="false"
                                    aria-controls="collapseFilter"
                                >
                                    Filter Products
                                </button>
                            </h2>
                        </div>
                        <div
                            id="collapseFilter"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionFilter"
                        >
                            <div className="accordion-body p-0">
                                <FilterMenuLeft />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-4 mt-lg-3">
                <div className="d-none d-lg-block col-lg-3">
                    <div className="border rounded shadow-sm">
                        <FilterMenuLeft />
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="d-flex flex-column h-100">
                        <div className="row mb-3">
                            <div className="col-lg-3 d-none d-lg-block">
                                <select
                                    className="form-select"
                                    defaultValue=""
                                    aria-label="Default select example"
                                >
                                    <option value="">Tất cả</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row">
                                <div className="input-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Search products..."
                                        aria-label="search input"
                                    />
                                    <button className="btn btn-outline-dark">
                                        <FontAwesomeIcon icon={["fas", "search"]} />
                                    </button>
                                </div>
                                <button
                                    className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                                    onClick={changeViewType}
                                >
                                    <FontAwesomeIcon
                                        icon={["fas", viewType.grid ? "th-list" : "th-large"]}
                                    />
                                </button>
                                {/* {decodedToken && decodedToken.role === "admin" && (
                                    <button
                                        className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                                        data-bs-toggle="modal"
                                        data-bs-target="#addFlower"
                                    >
                                        <FontAwesomeIcon
                                            icon={["fas", viewType.grid ? "plus" : "th-large"]}
                                        />
                                    </button>
                                )} */}
                                <button
                                    className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                                    data-bs-toggle="modal"
                                    data-bs-target="#addFlower"
                                >
                                    <FontAwesomeIcon
                                        icon={["fas", viewType.grid ? "plus" : "th-large"]}
                                    />
                                </button>
                            </div>
                        </div>
                        <div
                            className={
                                "row g-3 mb-4 flex-grow-1 " +
                                (viewType.grid ? "row-cols-xl-3" : "row-cols-xl-2")
                            }
                        >
                            {florals &&
                                florals.map((floral, i) => {
                                    if (viewType.grid) {
                                        return (
                                            <Product
                                                key={floral._id}
                                                floral={floral}
                                                percentOff={i < 2 ? 15 : null}
                                            />
                                        );
                                    }
                                    return (
                                        <ProductH
                                            key={floral._id || i}
                                            floral={floral}
                                            percentOff={i % 4 === 0 ? 15 : null}
                                        />
                                    );
                                })}
                        </div>
                        <div className="mt-auto">
                            <Paginate
                                onPageChange={handlePageChange}
                                totalPages={totalPages}
                                currentPage={currentPage}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addFlower" tabIndex="-1">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Thêm mới</h5>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                            >
                                X
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Tên</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Giá cả</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="price"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Phân loại</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="category"
                                            placeholder="VD: Hoa hồng, Hoa lan"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Màu sắc</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="color"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Bìa</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="cover"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Hình ảnh</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="images"
                                            placeholder="Nhập URL hình ảnh, cách nhau bằng dấu phẩy"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Trạng thái</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="status"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Số lượng</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="quantity"
                                            required
                                        />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label className="form-label">Mô tả</label>
                                        <textarea
                                            className="form-control"
                                            name="description"
                                            rows="4"
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="col-12 text-end">
                                        <button type="submit" className="btn btn-primary">
                                            Lưu
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductList;
