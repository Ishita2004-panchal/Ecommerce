import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from './Api';
import { Link } from 'react-router-dom';
import bg from '../assets/bg1.jpg'
import bg2 from '../assets/bg2.jpg'
import bg3 from '../assets/bg3.jpg'
function ProductList() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelecetedCategory] = useState("");

    const navigate = useNavigate();

    const handlenavigate = (id) => {
        navigate(`/detail/${id}`);
    }
    useEffect(() => {
        axios
            .get(`${BaseUrl}/categories`)
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.error(err);
            })
    }, []);
    useEffect(() => {
        if (selectedCategory) {
            axios
                .get(`${BaseUrl}/categories/${selectedCategory}/products`)
                .then((res) => {
                    setProducts(res.data);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }, [selectedCategory]);

    return (
        <div className='ProductPage'>

            <div className='d-flex align-items-center justify-content-start bar'>
                <h1 className='mx-4'>Product</h1>
                <Link to="/"><a>Home</a></Link>

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelecetedCategory(e.target.value)}>
                    <option value="">Shop</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>
            {selectedCategory === "" ? (
                <>

                    <div className='banner d-flex align-items-center justify-content-center'>
                        <img src={bg} />
                        <img src={bg2} />
                        <img src={bg3} />
                    </div>

                </>
            ) : (
                <div>
                    <div className='d-grid products'>
                        {products.map((p) => (
                            <div key={p.id} className='box' onClick={() => handlenavigate(p.id)}>
                                <div >
                                    <img src={p.images[0]} alt="loading" width="100%" height="150px" />
                                </div>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <h5 className='mt-3 mx-3'>{p.title}</h5>
                                    <h5 className='m-2'>${p.price}</h5>
                                </div>

                            </div>
                        ))}

                    </div>
                </div>
            )
            }
        </div >

    )
}

export default ProductList;