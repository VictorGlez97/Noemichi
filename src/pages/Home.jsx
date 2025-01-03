import { useAuth } from "../components/Context";

const Home = () => {

    const { user } = useAuth();

    console.log( user );

    return(
        <div className="flex justify-content-center">
            {/* <p> Bienvenido { user.username } </p> */}
        </div>
    )
}

export default Home;