import { useEffect, useState } from "react";

const Seccion = ({ products, types, HandleOpenImage }) => {
    
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    console.log( products );

    return(
        <>
            <div className='p-grid'>
                {
                    types.map(type => (
                        products.filter(prod => prod.type === type.type).length > 0 &&
                        <div key={type.type} className='mb-5'>
                            <div className="text-base"> { type.type } </div> 
                            <hr/>
                            {
                                products.map(product => (
                                    type.type === product.type
                                    &&
                                    <div 
                                        className='flex justify-content-between custom-target-icon mb-2' 
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
                                                <div style={{ lineHeight: '0px' }}>
                                                    <h3 style={{ color: '#ee925a' }}> { product.name } </h3>
                                                    <span className="text-sm" style={{ display: "inline-block", width: isMobile ? '250px' : 'auto', whiteSpace: 'normal', lineHeight: '1rem', minHeight: '3rem' }}> ({ product.description }) </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p style={{ width: '5rem' }}> $ { product.price } </p>
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

export default Seccion;