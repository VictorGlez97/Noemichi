import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MenuCupon = () => {
    
    const navigate = useNavigate();
    
    useEffect(() => {
        navigate('/menu', { state: { message: 'Hola soy un cupon!', cupon: true } })
    })

    return(
        <h1> MenuCupon </h1>
    )
}

export default MenuCupon;