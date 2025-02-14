import Banner from "./Banner";
import FeatureProduct from "./FeatureProduct";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      <ScrollToTopOnMount />
      <Banner />
      <div className="d-flex flex-column bg-white py-4">
        <p className="text-center px-5">
        🌸 Chào mừng đến với Florist – Nơi Gửi Gắm Yêu Thương Qua Từng Đóa Hoa! 🌿

Hoa không chỉ là một món quà, mà còn là thông điệp yêu thương, sự quan tâm và những cảm xúc chân thành. Tại FlowerCorner, chúng tôi mang đến những bó hoa tươi thắm, rực rỡ nhất để giúp bạn gửi gắm lời yêu thương đến những người thân yêu.

Dù là sinh nhật, kỷ niệm, chúc mừng hay chỉ đơn giản là muốn tạo niềm vui, chúng tôi có những thiết kế hoa tinh tế, phù hợp cho mọi dịp. Với dịch vụ giao hoa tận nơi nhanh chóng, chất lượng đảm bảo, chúng tôi cam kết mang đến cho bạn trải nghiệm tuyệt vời nhất.

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
          {Array.from({ length: 6 }, (_, i) => {
            return <FeatureProduct key={i} />;
          })}
        </div>
      </div>
      <div className="d-flex flex-column bg-white py-4">
        <h5 className="text-center mb-3">Follow us on</h5>
        <div className="d-flex justify-content-center">
          <a href="!#" className="me-3">
            <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
          </a>
          <a href="!#">
            <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
          </a>
          <a href="!#" className="ms-3">
            <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Landing;
