import React, { useState, useEffect } from 'react';
import "./Navbar.scss";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../store/categorySlice';
import { getCartTotal } from '../../store/cartSlice';
import Slider from '../Slider/Slider';

const Navbar = () => {
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.category);
  const { totalItems } = useSelector((state => state.cart));

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getCartTotal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className="navbar">
      <div className='navbar-content'>
        <div className="container">
          <div className="navbar-top flex flex-between">
            <Link to="/" className="navbar-brand">
              <span className="text-regal-blue">S</span><span className='text-gold fs-20'> & </span><span className="text-regal-blue">V</span>
            </Link>

            <form className="navbar-search flex">
              <input type="text" placeholder='Search here ...' />
              <button type="submit" className="navbar-search-btn">
                <i className="fas fa-search"></i>
              </button>
            </form>

            <div className="navbar-btns">
              <Link to="/cart" className="add-to-cart-btn flex">
                <div className='btn-txt fw-5'>
                  <span className="btn-ico">
                    <i className="fa fa-shopping-bag"></i>
                  </span>
                  <span className='cart-count-value'>{totalItems}</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className='navbar-bottom'>
          <div className='container flex'>
            <ul className={`nav-links flex ${isSidebarOpen ? 'show-nav-links' : ""}`}>
              <button type="button" className='navbar-hide-btn text-white' onClick={() => setIsSidebarOpen(false)}>
                <i className='fas fa-times'></i>
              </button>
              {
                categories.map(category => (
                  <li key={category.id}><Link to={`/category/${category.id}`} className="nav-link" onClick={() => setIsSidebarOpen(false)}>{category.name}</Link></li>
                ))
              }
            </ul>

            <button type="button" className='navbar-show-btn text-gold' onClick={() => setIsSidebarOpen(true)}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
        <Slider />

      </div>
    </nav>
  )
}

export default Navbar;