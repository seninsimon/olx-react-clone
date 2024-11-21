
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config.jsx';
import Navbar from './components/Navbar';
import Categories from './components/Categories';
import Ad from './components/Ad';
import './App.css';
import ProductBody from './components/mainbody';
import Sell from './components/sell';
import ProductDetails from './components/product';
import Footer from './components/footer.jsx';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className='container-body'>
      {/* Navbar should always be visible */}
      <Navbar  username = {user?.displayName} />

      {/* Define Routes */}
      <Routes>
        {/* Home Page Route */}
        <Route
          path='/'
          element={
            <>
              <Categories />
              <Ad />
              <ProductBody />
            </>
          }
        />

        {/* Product Details Page */}
        <Route path='/product/:id' element={<ProductDetails />} />

        {/* Sell Page (Protected Route) */}
        <Route
          path='/sell'
          element={user ? <Sell /> : <Navigate to='/' />}
        />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
