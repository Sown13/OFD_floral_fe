import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Product({ floral, percentOff }) {
    const isDiscounted = percentOff !== null;
    const discountedPrice = isDiscounted ? floral.price * (1 - percentOff / 100) : floral.price;

    return (
        <div className="col">
            <div className="card shadow-sm">
                <Link to={`/products/${floral._id}`} replace>
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
                            <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
