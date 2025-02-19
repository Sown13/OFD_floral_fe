function Cart() {
    return (
        <div className="container mt-5 py-4 px-xl-5">
            <h5 className="text-left mb-4 ps-2">Cart List</h5>
            <div className="row">
              <div className="col-9">
                <table className="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th>Product Img</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Sub Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                  </tbody>
                </table>
              </div>
              <div className="col-3 bg-light p-4">
                <h5 className="text-left mb-4 pb-2">Cart Price</h5>
                <div className="d-flex justify-content-between mb-3">
                  <h6 className="fw-normal">Tax :</h6>
                  <span>$</span>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <h6 className="fw-normal">SubTotal Price :</h6>
                  <span>$</span>
                </div>
                <div className="d-flex justify-content-between fw-bold">
                  <h6>Total Price :</h6>
                  <span>$</span>
                </div>
                <butoon variant="dark" size="md" className="mt-4 w-100">
                  pay now
                </butoon>
              </div>
            </div>
          </div>
      );
}
export default Cart