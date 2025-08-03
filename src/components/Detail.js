import React, { use, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { BaseUrl } from './Api';
import arrow from '../assets/arrow.png';
import gif from '../assets/loader.gif'


function Detail() {
    const { id } = useParams();
    const [Currentindex, setCurrentIndex] = useState(0);
    const [products, setProducts] = useState(null);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? products.images.length - 1 : prevIndex - 1
        );
    };
    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === products.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        axios
            .get(`${BaseUrl}/products/${id}`)
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [id]);
    if (!products) {
        return (
            <div className='d-flex align-items-center justify-content-center loaderdiv'>
                <img src={gif} className='loader' />
            </div>
        )
    }

    return (
        <div className='detailPage'>

            <div className='d-flex align-items-center justify-content-start bar'>
                <h1 className='mx-4'>Detail</h1>
                <Link to="/"><a>Home</a></Link>
            </div>
            {products.images && products.images.length > 0 && (
                <>
                    <h1 className='text-center mt-3 cat'>{products.category.name}</h1>

                    <div className='d-flex align-items-center justify-content-center maindiv'>
                        <div className='leftSide d-flex align-items-center justify-content-center'>
                            <img src={products.images[Currentindex]} alt='loading' className='carousel ' />
                            <button className='arrow ' onClick={nextSlide}><img src={arrow} /></button>
                            <button className=' prev' onClick={prevSlide}><img src={arrow} /></button>
                        </div>

                        <div className='rightSide'>
                            <h1 className='title'>{products.title}</h1>
                            <h1 className='price mb-4'>${products.price}</h1>
                            <div className='line'></div>
                            <p className='mt-4 '>{products.description}</p>
                        </div>
                    </div>

                </>
            )}
        </div>
    )
}

export default Detail