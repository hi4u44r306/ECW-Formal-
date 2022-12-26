import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/productSlice';
import { fetchCategories } from '../../store/categorySlice';
import "./HomePage.scss";
import AllProducts from '../../components/AllProducts/AllProducts';
import Slider from '../../components/Slider/Slider';
import { UserContext } from '../../UserContext';

const HomePage = () => {
  const dispatch = useDispatch();
  const msg = useContext(UserContext)

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    // dispatch(fetchProductsByCategory(1, 'all'));
    // dispatch(fetchProductsByCategory(2, 'all'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home-page">
      {msg}
      <Slider />
      <AllProducts />
      {/* <section>
        { productsByCategory[0] && <SingleCategory products = {productsByCategory[0]} status = {catProductAllStatus} /> }
      </section> */}
      {/* <section>
        { productsByCategory[1] && <SingleCategory products = {productsByCategory[1]} status = {catProductAllStatus} /> }
      </section> */}
    </div>
  )
}

export default HomePage;