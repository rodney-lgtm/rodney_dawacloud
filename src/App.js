import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GetProductsComponent from './components/GetProductsComponent'
import AddProductsComponent from './components/AddProductsComponent'
import SignInComponent from './components/SignInComponent'
import SignUpComponent from './components/SignUpComponent'
import MakePaymentComponent from './components/MakePaymentComponent'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js"
import NavbarComponent from './components/NavbarComponent';

function App() {
  return (
    <BrowserRouter>
    <div className='App'>
      <NavbarComponent/>
      <header className='App-header'>
        <h1>DawaCloud</h1>

      </header>
    </div>
    <Routes>
      <Route path='/' element={<GetProductsComponent />} />
      <Route path='/addproducts' element={<AddProductsComponent />} />
      <Route path='/Signin' element={<SignInComponent />} />
      <Route path='Signup' element={<SignUpComponent />}/>
      <Route path='makepayment' element={<MakePaymentComponent />} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
