import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import floralsServices from "../../services/floralsServices";
import RelatedProduct from "./RelatedProduct";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount";

function ProductDetail() {
  const { id } = useParams(); 
  const [floral, setFloral] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    floralsServices
      .getFloralById(id) 
      .then((data) => {
        setFloral(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="container mt-5">Đang tải dữ liệu...</div>;
  }

  if (!floral) {
    return <div className="container mt-5">Không tìm thấy sản phẩm.</div>;
  }

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
        <ol className="breadcrumb p-3">
          <li className="breadcrumb-item">
            <Link className="text-decoration-none link-secondary" to="/products">
              Tất cả sản phẩm
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {floral.name}
          </li>
        </ol>
      </nav>

      <div className="row mb-4">
        <div className="col-lg-6">
          <img
            className="border rounded ratio ratio-1x1"
            alt={floral.name}
            src={floral.cover}
          />
          <div className="d-flex flex-nowrap mt-3" style={{ overflowX: "scroll" }}>
            {floral.images.map((img, index) => (
              <img
                key={index}
                className="cover rounded me-2"
                width="70"
                height="70"
                src={img}
                alt={floral.name}
              />
            ))}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="col-lg-5">
          <h2 className="mb-1">{floral.name}</h2>
          <h4 className="text-muted mb-4">{floral.price.toLocaleString()} VND</h4>

          <div className="row g-3 mb-4">
            <div className="col">
              <button className="btn btn-outline-dark py-2 w-100">Thêm vào giỏ</button>
            </div>
            <div className="col">
              <button className="btn btn-dark py-2 w-100">Mua ngay</button>
            </div>
          </div>

          <h4 className="mb-0">Chi tiết sản phẩm</h4>
          <hr />
          <dl className="row">
            <dt className="col-sm-4">Loại Hoa</dt>
            <dd className="col-sm-8 mb-3">{floral.category.join(", ")}</dd>

            <dt className="col-sm-4">Màu sắc</dt>
            <dd className="col-sm-8 mb-3">{floral.color || "Chưa cập nhật"}</dd>

            <dt className="col-sm-4">Trạng thái</dt>
            <dd className="col-sm-8 mb-3">{floral.status}</dd>

            <dt className="col-sm-4">Số lượng</dt>
            <dd className="col-sm-8 mb-3">{floral.quantity}</dd>
          </dl>

          <h4 className="mb-0">🌸 Mô tả</h4>
          <hr />
          <p className="lead">{floral.description }</p>
        </div>
      </div>

      {/* Sản phẩm liên quan */}
      {/* <div className="row">
        <div className="col-md-12 mb-4">
          <hr />
          <h4 className="text-muted my-4">Sản phẩm liên quan</h4>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
            {[...Array(4)].map((_, i) => (
              <RelatedProduct key={i} percentOff={i % 2 === 0 ? 15 : null} />
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default ProductDetail;
