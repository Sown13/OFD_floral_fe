import Image from "../../nillkin-case-1.jpg";
import RelatedProduct from "./RelatedProduct";
import { Link } from "react-router-dom";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount";

function ProductDetail() {
  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
        <ol className="breadcrumb p-3">
          <li className="breadcrumb-item">
            <Link
              className="text-decoration-none link-secondary"
              to="/products"
            >
              All Prodcuts
            </Link>
          </li>
          <li className="breadcrumb-item">
            <a className="text-decoration-none link-secondary" href="!#">
              Cases &amp; Covers
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Detail Product
          </li>
        </ol>
      </nav>
      <div className="row mb-4">
        <div className="d-none d-lg-block col-lg-1">
          <div className="image-vertical-scroller">
            <div className="d-flex flex-column">
              {Array.from({ length: 10 }, (_, i) => {
                let selected = i !== 1 ? "opacity-6" : "";
                return (
                  <a key={i} href="!#">
                    <img
                      className={"rounded mb-2 ratio " + selected}
                      alt="Hoa Mừng Sinh Nhật"
                      src="/images/hoasinhnhat/hoasinhnhat1.jpg"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-12 mb-4">
              <img
                className="border rounded ratio ratio-1x1"
                alt="Hoa Mừng Sinh Nhật"
                src="/images/hoasinhnhat/hoasinhnhat1.jpg"
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-12">
              <div
                className="d-flex flex-nowrap"
                style={{ overflowX: "scroll" }}
              >
                {Array.from({ length: 8 }, (_, i) => {
                  return (
                    <a key={i} href="!#">
                      <img
                        className="cover rounded mb-2 me-2"
                        width="70"
                        height="70"
                        alt="Hoa Mừng Sinh Nhật"
                        src="/images/hoasinhnhat/hoasinhnhat1.jpg"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="d-flex flex-column h-100">
            <h2 className="mb-1"> Hoa Mừng Sinh Nhật</h2>
            <h4 className="text-muted mb-4">10000 VND</h4>

            <div className="row g-3 mb-4">
              <div className="col">
                <button className="btn btn-outline-dark py-2 w-100">
                  Add to cart
                </button>
              </div>
              <div className="col">
                <button className="btn btn-dark py-2 w-100">Buy now</button>
              </div>
            </div>

            <h4 className="mb-0">Details</h4>
            <hr />
            <dl className="row">
              {/* <dt className="col-sm-4">Code</dt>
              <dd className="col-sm-8 mb-3">C0001</dd> */}

              <dt className="col-sm-4">Loại Hoa</dt>
              <dd className="col-sm-8 mb-3">Cases & Covers</dd>

              <dt className="col-sm-4">Nhãn Hàng</dt>
              <dd className="col-sm-8 mb-3">Hoa Gucci</dd>

              <dt className="col-sm-4">Nơi sản xuất</dt>
              <dd className="col-sm-8 mb-3">Dümmen Orange (Hà Lan)</dd>

              <dt className="col-sm-4">Màu sắc</dt>
              <dd className="col-sm-8 mb-3">Red, Pink</dd>

              <dt className="col-sm-4">Trạng Thái</dt>
              <dd className="col-sm-8 mb-3">Còn Hàng</dd>
            </dl>

            <h4 className="mb-0">🌸 Lời chúc</h4>
            <hr />
            <p className="lead flex-shrink-0">
              <small>
Chúc mừng sinh nhật! Mong rằng mỗi cánh hoa trong bó hoa này sẽ mang đến cho bạn niềm vui, hạnh phúc và những điều tốt đẹp nhất.
 Chúc bạn một tuổi mới tràn đầy yêu thương và thành công!
              </small>
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 mb-4">
          <hr />
          <h4 className="text-muted my-4">Related products</h4>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
            {Array.from({ length: 4 }, (_, i) => {
              return (
                <RelatedProduct key={i} percentOff={i % 2 === 0 ? 15 : null} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
