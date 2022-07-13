import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'

const Test = () => {
    const [modal, setModal] = useState(true)
    const [large, setLarge] = useState(false)
    const [small, setSmall] = useState(false)
    const [primary, setPrimary] = useState(false)
    const [success, setSuccess] = useState(false)
    const [warning, setWarning] = useState(false)
    const [danger, setDanger] = useState(false)
    const [info, setInfo] = useState(false)
  
    var Background=process.env.PUBLIC_URL+"/backgoundiamg.png";

  return (
   <>
       <div className="container wow fadeIn" style={{  background: `url(${Background})`,backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top center',
    backgroundSize: 'cover'}}  >

            {/* <!-- Heading --> */}
            <h2 className="my-5 h2 text-center">Travel</h2>

            {/*<!--Grid row-->*/}
            <div className="row">

            {/*<!--Grid column-->*/}
            <div className="col-md-8 mb-4">

                {/* <!--Card--> */}
                <div className="card">

                {/* <!--Card content--> */}
                <form className="card-body">

                    {/*<!--Grid row-->*/}
                    <div className="row">

                    {/*<!--Grid column-->*/}
                    <div className="col-lg-4 col-md-12 mb-4">

                        <label for="guests">Number Of Guests</label>
                        <select className="custom-select d-block w-100" id="guests" required>
                            <option value="">Choose...</option>
                            <option>Guests 1</option>
                            <option>Guests 1</option>
                        </select>
                        <div className="invalid-feedback">
                            Please select a valid Guests.
                        </div>

                    </div>
                    {/*<!--Grid column-->*/}

                    {/*<!--Grid column-->*/}
                    <div className="col-lg-4 col-md-12 mb-4">
                        <label for="country">Start Date</label>
                        <input type="text" id="datepicker" className="form-control" placeholder="Enter Start Date"></input>

                    </div>
                    {/*<!--Grid column-->*/}

                        {/*<!--Grid column-->*/}
                        <div className="col-lg-4 col-md-12 mb-4">

                        <label for="country">Start Date</label>
                        <input type="text" id="datepicker2" className="form-control" placeholder="Enter Start Date"></input>
                        </div>
                    {/*<!--Grid column-->*/} 

                    </div>
                    {/*<!--Grid row-->*/}

                    {/* <!--Username--> */}
                    <div className="md-form input-group pl-0 mb-5">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">@</span>
                    </div>
                    <input type="text" className="form-control py-0" placeholder="Username" aria-describedby="basic-addon1"></input>
                    </div>

                    {/* <!--email--> */}
                    <div className="md-form mb-5">
                    <input type="text" id="email" className="form-control" placeholder="youremail@example.com"></input>
                    <label for="email" className="">Email (optional)</label>
                    </div>

                    {/* <!--address--> */}
                    <div className="md-form mb-5">
                    <input type="text" id="address" className="form-control" placeholder="1234 Main St"></input>
                    <label for="address" className="">Address</label>
                    </div>

                    {/* <!--address-2--> */}
                    <div className="md-form mb-5">
                    <input type="text" id="address-2" className="form-control" placeholder="Apartment or suite"></input>
                    <label for="address-2" className="">Address 2 (optional)</label>
                    </div>

                    {/*<!--Grid row-->*/}
                    <div className="row">

                    {/*<!--Grid column-->*/}
                    <div className="col-lg-4 col-md-12 mb-4">

                        <label for="country">Country</label>
                        <select className="custom-select d-block w-100" id="country" required>
                        <option value="">Choose...</option>
                        <option>United States</option>
                        </select>
                        <div className="invalid-feedback">
                        Please select a valid country.
                        </div>

                    </div>
                    {/*<!--Grid column-->*/}

                    {/*<!--Grid column-->*/}
                    <div className="col-lg-4 col-md-6 mb-4">

                        <label for="state">State</label>
                        <select className="custom-select d-block w-100" id="state" required>
                        <option value="">Choose...</option>
                        <option>California</option>
                        </select>
                        <div className="invalid-feedback">
                        Please provide a valid state.
                        </div>

                    </div>
                    {/*<!--Grid column-->*/}

                    {/*<!--Grid column-->*/}
                    <div className="col-lg-4 col-md-6 mb-4">

                        <label for="zip">Zip</label>
                        <input type="text" className="form-control" id="zip" placeholder="" required></input>
                        <div className="invalid-feedback">
                        Zip code required.
                        </div>

                    </div>
                    {/*<!--Grid column-->*/}

                    </div>
                    {/*<!--Grid row-->*/}

                    

                    <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="same-address"></input>
                    <label className="custom-control-label" for="same-address">Shipping address is the same as my billing address</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="save-info"></input>
                    <label className="custom-control-label" for="save-info">Save this information for next time</label>
                    </div>

                
                    <div className="d-block my-3">
                    <div className="custom-control custom-radio">
                        <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" checked required></input>
                        <label className="custom-control-label" for="credit">Credit card</label>
                    </div>
                    <div className="custom-control custom-radio">
                        <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required></input>
                        <label className="custom-control-label" for="debit">Debit card</label>
                    </div>
                    <div className="custom-control custom-radio">
                        <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required></input>
                        <label className="custom-control-label" for="paypal">Paypal</label>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6 mb-3">
                        <label for="cc-name">Name on card</label>
                        <input type="text" className="form-control" id="cc-name" placeholder="" required></input>
                        <small className="text-muted">Full name as displayed on card</small>
                        <div className="invalid-feedback">
                        Name on card is required
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label for="cc-number">Credit card number</label>
                        <input type="text" className="form-control" id="cc-number" placeholder="" required></input>
                        <div className="invalid-feedback">
                        Credit card number is required
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-3 mb-3">
                        <label for="cc-expiration">Expiration</label>
                        <input type="text" className="form-control" id="cc-expiration" placeholder="" required></input>
                        <div className="invalid-feedback">
                        Expiration date required
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <label for="cc-expiration">CVV</label>
                        <input type="text" className="form-control" id="cc-cvv" placeholder="" required></input>
                        <div className="invalid-feedback">
                        Security code required
                        </div>
                    </div>
                    </div>
                    <button className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>

                </form>

                </div>
                {/*<!--/.Card-->*/}

            </div>
            {/*<!--Grid column-->*/}

            {/*<!--Grid column-->*/}
            <div className="col-md-4 mb-4">
                <div className="card">
                    <div className="card-body">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your cart</span>
                <span className="badge badge-secondary badge-pill">3</span>
                </h4>

                {/* <!-- Cart --> */}
                <ul className="list-group mb-3 z-depth-1">
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                    <h6 className="my-0">Product name</h6>
                    <small className="text-muted">Brief description</small>
                    </div>
                    <span className="text-muted">$12</span>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                    <h6 className="my-0">Second product</h6>
                    <small className="text-muted">Brief description</small>
                    </div>
                    <span className="text-muted">$8</span>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                    <h6 className="my-0">Third item</h6>
                    <small className="text-muted">Brief description</small>
                    </div>
                    <span className="text-muted">$5</span>
                </li>
                <li className="list-group-item d-flex justify-content-between bg-light">
                    <div className="text-success">
                    <h6 className="my-0">Promo code</h6>
                    <small>EXAMPLECODE</small>
                    </div>
                    <span className="text-success">-$5</span>
                </li>
                <li className="list-group-item d-flex justify-content-between"> 
                    <span>Total (USD)</span>
                    <strong>$20</strong>
                </li>
                </ul>
                    </div>
                </div>
                {/* <!-- Heading --> */}
              
                
            </div>
            {/* <!--Grid row--> */}
            </div>
        </div>
    
      </>
  )
}

export default Test
