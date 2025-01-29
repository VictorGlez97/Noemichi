const Seccion = ({ products, types, HandleOpenImage }) => {
    
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
                                                <div style={{ lineHeight: '2px' }} >
                                                    <h3 style={{ color: '#ee925a' }}> { product.name } </h3>
                                                    <span className="text-sm"> ({ product.description }) </span>
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

export default Seccion;