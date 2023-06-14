import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import axios from "axios";

function ShoppingCart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:5267/api/cart");
      setCart(res.data);
      console.log("books", res.data);
    };
    fetch();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5267/api/cart/${id}`).then(()=>{
      setCart(cart.filter((c) => c.id !== id));
    });
    
  };

  return (
    <section className="h-100 h-custom">
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol>
            <MDBTable responsive>
              <MDBTableHead>
                <tr>
                  <th scope="col" className="h5">
                    Shopping Bag
                  </th>
                  <th scope="col">Rating</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {cart.map((c) => (
                  <tr>
                    <th scope="row">
                      <div className="d-flex align-items-center">
                        <img
                          src={c.image}
                          fluid
                          className="rounded-3"
                          style={{ width: "120px" }}
                          alt="Book"
                        />
                        <div className="flex-column ms-4">
                          <p className="mb-2">{c.title}</p>
                          <p className="mb-0">{c.author}</p>
                        </div>
                      </div>
                    </th>
                    <td className="align-middle">
                      <p className="mb-0" style={{ fontWeight: "500" }}>
                        {c.rating} / 5
                      </p>
                    </td>
                    <td className="align-middle">
                      <div className="d-flex flex-row align-items-center">
                        <MDBBtn className="px-2" color="link">
                          <MDBIcon fas icon="minus" />
                        </MDBBtn>

                        <MDBInput
                          min={0}
                          type="number"
                          size="sm"
                          style={{ width: "50px" }}
                          defaultValue={2}
                        />

                        <MDBBtn className="px-2" color="link">
                          <MDBIcon fas icon="plus" />
                        </MDBBtn>
                      </div>
                    </td>
                    <td className="align-middle">
                      <p className="mb-0" style={{ fontWeight: "500" }}>
                        ${c.price}
                      </p>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(c.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default ShoppingCart;
