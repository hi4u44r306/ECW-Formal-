import React from 'react';
import { Link } from 'react-router-dom';
import { sanityClient } from '../utils/sanity/client';

const CategoryPagetest = ({ products }) => {
    return (
        <div>
            {
                products.map(product => (
                    <Link to={`/category/${product.slug}`}>

                    </Link>
                ))
            }
        </div>
    )
}

export default CategoryPagetest


export const getServerSideProps = async () => {
    const products = await sanityClient.fetch('*[_type=="product" && defined(slug.current) && !(_id in path("drafts.**"))]{..., "slug":slug.current}');
    return {
        props: { products }
    }
}