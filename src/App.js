import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-data-table-component-extensions/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
//change by tushar
// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const RegisterNew = React.lazy(() => import('./views/pages/register/RegisterNew'));
const Booking = React.lazy(() => import('./views/pages/register/Booking'));
const Test = React.lazy(() => import('./views/pages/register/Test'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const Payment = React.lazy(() => import('./views/payment/paymentresult'));
const Disclaimer = React.lazy(() => import('./views/pages/register/Disclaimer'));
const AccreditedResort = React.lazy(() => import('./views/pages/register/AccreditedResort'));
const PaymentProcedure = React.lazy(() => import('./views/pages/register/PaymentProcedure'));
const RefundProcedure = React.lazy(() => import('./views/pages/register/RefundProcedure'));
const PenaltyClause = React.lazy(() => import('./views/pages/register/PenaltyClause'));
const EditBooking = React.lazy(() => import('./views/pages/register/EditBooking'));
const FAQs = React.lazy(() => import('./views/pages/register/FAQs'));
const TourismPolicy = React.lazy(() => import('./views/pages/register/TourismPolicy'));

class App extends Component {

  render() {
    return (
      <>
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              {/* <Route exact path="/book" name="Register Page" render={props => <Book {...props}/>} /> */}
              <Route path="/test" name="Register Page" render={props => <Test {...props}/>} />
              <Route path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route path="/disclaimer" name="Disclaimer" render={props => <Disclaimer {...props}/>} />
              <Route path="/accreditedresort" name="Accredited Resort" render={props => <AccreditedResort {...props}/>} />
              <Route path="/paymentprocedure" name="Payment Procedure" render={props => <PaymentProcedure {...props}/>} />
              <Route path="/refundprocedure" name="Refund Procedure" render={props => <RefundProcedure {...props}/>} />
              <Route path="/penaltyclause" name="Refund Procedure" render={props => <PenaltyClause {...props}/>} />
              <Route path="/editbooking" name="Edit Booking" render={props => <EditBooking {...props}/>} />
              <Route path="/faq" name="FAQs" render={props => <FAQs {...props}/>} />
              <Route path="/tourismpolicy" name="Tourism Policy" render={props => <TourismPolicy {...props}/>} />
              
              <Route path="/booking" name="Booking Page" render={props => <Booking {...props}/>} />
              <Route path="/registernew" name="Register Page" render={props => <RegisterNew {...props}/>} />
              <Route path="/paymentresult" name="Payment" render={props => <Payment {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
              {/* <Route path="/" name="Register Page" render={props => <Register {...props}/>} /> */}
            </Switch>
          </React.Suspense>
      </HashRouter>
      <ToastContainer pauseOnHover={false} hideProgressBar={true} autoClose={1200} />
      </>
    );
  }
}

export default App;
