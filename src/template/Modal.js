import { useState, useMemo, useEffect, useContext } from "react";
import floralsServices from "../services/floralsServices";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import categoryServices from "../services/categoryServices";
import { RefreshContext } from "../components/RefreshOutLet";

const AddFlowerModal = () => {
    const { refreshOutlet } = useContext(RefreshContext);
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [categoryInput, setCategoryInput] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        categoryServices.getCategories().then((response) => {
            setAllCategories(response);
        });
    }, []);

    const filteredCategories = useMemo(
        () => allCategories.filter((category) => category.name.toLowerCase().includes(categoryInput.toLowerCase())),
        [categoryInput, allCategories]
    );

    const handleAddCategory = (category) => {
        if (!categories.some((c) => c._id === category._id)) {
            setCategories([...categories, category]);
            setCategoryInput("");
            setShowDropdown(false);
        }
    };

    const handleAddImage = () => {
        setImages([...images, { src: "" }]);
    };

    const handleImageChange = (index, value) => {
        const updatedImages = [...images];
        updatedImages[index].src = value.trim() === "" ? null : value;
        setImages(updatedImages);
    };

    const handleAddFlowerSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const flowerData = Object.fromEntries(formData.entries());
        flowerData.categories = categories.map((category) => category.name);
        flowerData.images = images.map((image) => image.src);
        floralsServices.createFloral(flowerData).then((response) => {
            refreshOutlet();
        });
    };

    return (
        <div className="modal fade" id="addFlower" tabIndex="-1">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Thêm mới</h5>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                            <FontAwesomeIcon icon="fa-solid fa-times" />
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleAddFlowerSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label text-primary">Tên</label>
                                    <input type="text" className="form-control" name="name" required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label text-primary">Giá cả</label>
                                    <input type="number" className="form-control" name="price" required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label text-primary">Trạng thái</label>
                                    <input type="text" className="form-control" name="status" required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label text-primary">Màu sắc</label>
                                    <input type="text" className="form-control" name="color" required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label text-primary">Hình ảnh chính</label>
                                    <input type="text" className="form-control" name="cover" placeholder="Nhập URL hình ảnh" required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label text-primary">Số lượng</label>
                                    <input type="number" className="form-control" name="quantity" required />
                                </div>
                                <div className="col-12 mb-3">
                                    <div className="d-flex align-items-center mb-2 mt-1">
                                        <label className="text-primary">Phân loại</label>
                                        <div className="col-4 ms-3 me-3">
                                            <input
                                                placeholder="Chọn phân loại..."
                                                type="text"
                                                className="form-control mt-1"
                                                value={categoryInput}
                                                onChange={(e) => {
                                                    setCategoryInput(e.target.value);
                                                    setShowDropdown(true);
                                                }}
                                                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                                            />
                                            {showDropdown && filteredCategories.length > 0 && (
                                                <ul className="dropdown-menu show mt-1">
                                                    {filteredCategories.map((category, index) => (
                                                        <li
                                                            key={category._id}
                                                            className="dropdown-item"
                                                            onMouseDown={() => handleAddCategory(category)}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            {category.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                    {categories.length > 0 && categories.map((category, index) => <b key={index}>{category.name}, </b>)}
                                </div>
                                <div className="col-12 mb-3">
                                    <label className="form-label text-primary">Mô tả</label>
                                    <textarea className="form-control" name="description" rows="2"></textarea>
                                </div>
                                <div className="col-12 mb-3">
                                    <div className="d-flex align-items-center">
                                        <label className="form-label text-primary">Hình ảnh phụ</label>
                                        <FontAwesomeIcon
                                            icon="fa-solid fa-plus-circle"
                                            className="fs-5 ms-2 text-success cursor-pointer"
                                            onClick={handleAddImage}
                                        />
                                    </div>
                                    <div className="row">
                                        {images.length > 0 &&
                                            images.map((image, index) => (
                                                <div className="col-md-3" key={index}>
                                                    <input
                                                        type="text"
                                                        className="form-control mb-2"
                                                        value={image.src}
                                                        onChange={(e) => handleImageChange(index, e.target.value)}
                                                    />
                                                    <img
                                                        alt=""
                                                        src={image.src}
                                                        style={{
                                                            width: "100%",
                                                            height: "auto",
                                                            borderRadius: "8px",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                    </div>
                                </div>
                                <div className="col-12 text-end">
                                    <button type="submit" className="btn btn-success">
                                        <FontAwesomeIcon icon="fa-solid fa-save" />
                                        <b className="ms-1">Lưu</b>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UpdateFlowerModal = () => {
    const { refreshOutlet } = useContext(RefreshContext);
    const [filteredFlowers, setFilteredFlowers] = useState([]);
    const [selectedFlower, setSelectedFlower] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [flowerData, setFlowerData] = useState(selectedFlower || {});

    useEffect(() => {
        setFlowerData(selectedFlower || {});
    }, [selectedFlower]);

    const handleChange = (e) => {
        setFlowerData({
            ...flowerData,
            [e.target.name]: e.target.value,
        });
    };

    const fetchFlowers = async (value) => {
        setInputValue(value);
        if (value.trim() === "") {
            setShowDropdown(false);
            return;
        }
        floralsServices.getFlorals(1, 10, value).then((data) => {
            setFilteredFlowers(data.data);
            setShowDropdown(true);
        });
    };

    const loadData = useMemo(() => debounce(fetchFlowers, 800), []);

    const handleInputChange = (value) => {
        setInputValue(value);
        loadData(value);
    };

    const handleSelectFlower = (flower) => {
        setSelectedFlower(flower);
        setShowDropdown(false);
        setInputValue(flower.name);
    };

    const handleUpdate = () => {
        const form = document.getElementById("editForm");
        const formData = new FormData(form);
        let updatedFlower = Object.fromEntries(formData.entries());
        let imagesArray = [];
        for (let key in updatedFlower) {
            if (updatedFlower.hasOwnProperty(key) && key.startsWith("images_")) {
                imagesArray.push(...updatedFlower[key].split(",").map((item) => item.trim()));
                delete updatedFlower[key];
            }
        }
        updatedFlower = { ...updatedFlower, images: imagesArray };
        floralsServices.updateFloral(selectedFlower._id, updatedFlower).then((response) => {
            refreshOutlet();
        });
    };

    const handleDelete = () => {
        floralsServices.deleteFloral(selectedFlower._id).then((response) => {
            refreshOutlet();
        });
    };

    return (
        <div className="modal fade" id="editFlower" tabIndex="-1">
            <div className="modal-dialog" style={{ maxWidth: "70%" }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update / Xóa sản phẩm</h5>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                            X
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3 position-relative">
                            <label className="form-label fw-bold text-primary fs-5">Tìm kiếm hoa</label>
                            <input
                                type="text"
                                value={inputValue}
                                className="form-control"
                                onChange={(e) => handleInputChange(e.target.value)}
                                placeholder="Nhập tên hoa..."
                                onFocus={() => setShowDropdown(true)}
                                onBlur={() => setShowDropdown(false)}
                            />
                            {showDropdown && filteredFlowers.length > 0 && (
                                <ul className="dropdown-menu show" style={{ width: "100%" }}>
                                    {filteredFlowers.map((flower) => (
                                        <li
                                            key={flower.id}
                                            className="dropdown-item d-flex align-items-center"
                                            onMouseDown={() => handleSelectFlower(flower)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <img
                                                alt={flower.name}
                                                src={flower.cover}
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    marginRight: 10,
                                                    borderRadius: "50%",
                                                }}
                                            />
                                            <b>{flower.name}</b>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <label className="form-label fw-bold text-primary fs-5">Thông tin chung</label>
                        {/* Flower Update Form */}
                        {selectedFlower && (
                            <form id="editForm">
                                <div className="row">
                                    <div className="col-md-12 mb-1">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <input type="text" className="form-control" name="cover" value={selectedFlower.cover} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <img
                                            alt={selectedFlower.name}
                                            src={selectedFlower.cover}
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                                borderRadius: "8px",
                                                objectFit: "cover",
                                            }}
                                        ></img>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label text-primary">Tên</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="name"
                                                    value={flowerData.name || ""}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label text-primary">Giá cả</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="price"
                                                    value={flowerData.price || ""}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label text-primary">Phân loại</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="category"
                                                    value={flowerData.category || ""}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label text-primary">Màu sắc</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="color"
                                                    value={flowerData.color || ""}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label text-primary">Số lượng</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="quantity"
                                                    value={flowerData.quantity || ""}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label className="form-label text-primary">Trạng thái</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="status"
                                                    value={flowerData.status || ""}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-12 mb-3">
                                                <label className="form-label text-primary">Mô tả</label>
                                                <textarea
                                                    className="form-control"
                                                    rows="4"
                                                    name="description"
                                                    value={flowerData.description || ""}
                                                    onChange={handleChange}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="col-md-12 text-center p-1 expand-div mt-2"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flowerDetails"
                                    >
                                        Xem chi tiết ảnh <FontAwesomeIcon icon="fa-solid fa-caret-down" />
                                    </div>
                                    <div className="collapse mt-2" id="flowerDetails">
                                        <div className="card card-body">
                                            <div className="row">
                                                {selectedFlower &&
                                                    selectedFlower.images.map((src, index) => (
                                                        <div className="col-md-3" key={index}>
                                                            <img
                                                                alt=""
                                                                src={src}
                                                                style={{
                                                                    width: "100%",
                                                                    height: "auto",
                                                                    borderRadius: "8px",
                                                                    objectFit: "cover",
                                                                }}
                                                            />
                                                            <input name={`images_${index}`} type="text" value={src} className="form-control mt-1" />
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleUpdate} className="btn btn-success">
                            <FontAwesomeIcon icon="fa-solid fa-save" />
                            <b className="ms-1">Cập nhật</b>
                        </button>
                        <button type="button" className="btn btn-danger ms-2" onClick={handleDelete}>
                            <FontAwesomeIcon icon="fa-solid fa-trash" />
                            <b className="ms-1">Xóa</b>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Modal = () => (
    <>
        <AddFlowerModal />
        <UpdateFlowerModal />
    </>
);
