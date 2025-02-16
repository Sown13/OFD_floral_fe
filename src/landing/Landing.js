import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Banner from "./Banner";
import floralsServices from "../services/floralsServices";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";

function Landing() {
  const [florals, setFlorals] = useState([]);

  useEffect(() => {
    floralsServices
      .getFlorals()
      .then((data) => {
        console.log("Dữ liệu sản phẩm nổi bật:", data);
        setFlorals(data.slice(0, 6)); // Lấy 6 sản phẩm đầu tiên
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
  }, []);

  return (
    <>
      <ScrollToTopOnMount />
      <Banner />
      <div className="d-flex flex-column bg-white py-4">
        <p className="text-center px-5">
          🌸 Chào mừng đến với Florist – Nơi Gửi Gắm Yêu Thương Qua Từng Đóa Hoa! 🌿
          <br />
          Hoa không chỉ là một món quà, mà còn là thông điệp yêu thương, sự quan tâm và những cảm xúc chân thành.
          Tại FlowerCorner, chúng tôi mang đến những bó hoa tươi thắm, rực rỡ nhất để giúp bạn gửi gắm lời yêu thương đến những người thân yêu.
          <br />
          Dù là sinh nhật, kỷ niệm, chúc mừng hay chỉ đơn giản là muốn tạo niềm vui, chúng tôi có những thiết kế hoa tinh tế, phù hợp cho mọi dịp.
          Với dịch vụ giao hoa tận nơi nhanh chóng, chất lượng đảm bảo, chúng tôi cam kết mang đến cho bạn trải nghiệm tuyệt vời nhất.
          <br />
          Hãy để những cánh hoa thay lời bạn muốn nói! 💐✨
        </p>
        <div className="d-flex justify-content-center">
          <Link to="/products" className="btn btn-primary" replace>
            Đi tới Sản Phẩm
          </Link>
        </div>
      </div>
      <h2 className="text-muted text-center mt-4 mb-3">Sản phẩm nổi bật</h2>
      <div className="container pb-5 px-lg-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5">
          {florals.map((floral) => (
            <div className="col" key={floral._id}>
              <div className="card shadow-sm">
                <Link to={`/products/${floral._id}`} replace>
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
                    {floral.price.toLocaleString()} VND
                  </p>
                  <div className="d-grid d-block">
                    <button className="btn btn-outline-dark mt-3">
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex flex-column bg-white py-4">
        <h5 className="text-center mb-3">Follow us on</h5>
        <div className="d-flex justify-content-center">
          <a href="!#" className="me-3" style={{ color: "#1877F2" }}>
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="!#" style={{ color: "#E4405F" }}>
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a href="!#" className="ms-3" style={{ color: "#1DA1F2" }}>
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Landing;
