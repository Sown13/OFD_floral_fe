// import Image from "../nillkin-case.webp";
import { Link } from "react-router-dom";

function FeatureProduct() {
  return (
    <div className="col">
      <div className="card shadow-sm">
        <img
          className="card-img-top bg-dark"
          style={{ objectFit: "cover" }}
          height="240"
          alt="Hoa Mừng Sinh Nhật"
          src="/images/hoasinhnhat/hoasinhnhat1.jpg"
        />
        <div className="card-body">
          <h5 className="card-title text-center">Hoa Mừng Sinh Nhật</h5>
          <p className="card-text text-center text-muted">
            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(360000)}
          </p>
          <div className="d-grid gap-2">
            <Link to="/products/1" className="btn btn-outline-dark" replace>
              Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureProduct;

