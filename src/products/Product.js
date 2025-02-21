import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import floralsServices from "../services/floralsServices";

function Product({ percentOff = 15 }) {
  const [florals, setFlorals] = useState([]);

  useEffect(() => {
    floralsServices
      .getFlorals()
      .then((data) => {
        if (Array.isArray(data.data)) {
          setFlorals(data.data);
        } else {
          console.error("Dữ liệu không phải là mảng!", data);
          setFlorals([]);
        }
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
  }, []);

  return (
    <>
      {florals.map((floral, index) => {
        const isDiscounted = index < 0; // Giảm giá 15% cho 2 sản phẩm đầu tiên
        const discountedPrice = isDiscounted
          ? floral.price * (1 - percentOff / 100)
          : floral.price;

        return (
          <div className="col" key={floral._id}>
            <div className="card shadow-sm">
              {/* Điều hướng đến chi tiết sản phẩm */}
              <Link to={`/products/${floral._id}`}>
                {isDiscounted && (
                  <div
                    className="badge bg-danger py-2 text-white position-absolute"
                    style={{ top: "0.5rem", right: "0.5rem" }}
                  >
                    {percentOff}% OFF
                  </div>
                )}
                <img
                  className="card-img-top bg-dark"
                  style={{ objectFit: "cover" }}
                  height="240"
                  alt={floral.name}
                  src={floral.images}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title text-center text-dark text-truncate">
                  {floral.name}
                </h5>
                <p className="card-text text-center text-muted mb-0">
                  {isDiscounted ? (
                    <>
                      <del>{floral.price.toLocaleString()} VND</del>{" "}
                      <span className="text-danger fw-bold">
                        {discountedPrice.toLocaleString()} VND
                      </span>
                    </>
                  ) : (
                    `${floral.price.toLocaleString()} VND`
                  )}
                </p>
                <div className="d-grid d-block">
                  <button className="btn btn-outline-dark mt-3">
                    <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Product;
