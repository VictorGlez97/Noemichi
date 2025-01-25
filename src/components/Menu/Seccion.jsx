import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MenuCupon = ({ products, types, HandleOpenImage }) => {
    
    const navigate = useNavigate();
    
    useEffect(() => {
        navigate('/menu', { state: { message: 'Hola soy un cupon!', cupon: true } })
    })

    return(
        <>
            <div className='p-grid'>
                {
                    types.map(type => (
                        products.filter(prod => prod.type === type.type).length > 0 &&
                        <div key={type.type} className='mb-5'>
                            <div className='cursiva'> { type.type } </div> 
                            <hr/>
                            {
                                products.map(product => (
                                    type.type === product.type
                                    &&
                                    <div 
                                        className='flex justify-content-between custom-target-icon mb-3' 
                                        key={ product.idproduct }
                                        data-pr-tooltip={ product.description }
                                        data-pr-position='top'
                                    >
                                        <div className='flex'>
                                            <div 
                                                className='mt-4 mr-3'
                                                onClick={() => HandleOpenImage(product.image)}
                                            >
                                                { product.image !== null && <i className='pi pi-image' style={{ cursor: 'pointer', fontSize: '1.2rem', color: '#f0aed1' }}></i>}
                                            </div>
                                            <div>
                                                <div style={{ lineHeight: '0px' }} >
                                                    <span style={{ color: '#f0aed1' }}> { product.name } </span>
                                                    <h4 style={{ marginTop: '-1rem' }}> ({ product.description }) </h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p> $ { product.price } </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default MenuCupon;