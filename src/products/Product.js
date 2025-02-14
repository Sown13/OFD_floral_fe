import Image from "../nillkin-case-1.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Product(props) {
  const price = 10000;
  let percentOff;
  let offPrice = `${price}VND`;

  if (props.percentOff && props.percentOff > 0) {
    percentOff = (
      <div
        className="badge bg-dim py-2 text-white position-absolute"
        style={{ top: "0.5rem", right: "0.5rem" }}
      >
        {props.percentOff}% OFF
      </div>
    );

    offPrice = (
      <>
        <del>{price}VND</del> {price - (props.percentOff * price) / 100}VND
      </>
    );
  }

  return (
    <div className="col">
      <div className="card shadow-sm">
        <Link to="/products/1" href="!#" replace>
          {percentOff}
          <img
          className="card-img-top bg-dark"
          style={{ objectFit: "cover" }}
          height="240"
          alt="Hoa Mừng Sinh Nhật"
          src="/images/hoasinhnhat/hoasinhnhat1.jpg"
        />
        </Link>
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">
          Hoa Mừng Sinh Nhật
          </h5>
          <p className="card-text text-center text-muted mb-0">{offPrice}</p>
          <div className="d-grid d-block">
            <button className="btn btn-outline-dark mt-3">
              <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
