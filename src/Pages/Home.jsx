import HomeBG from "../img/HomeBG.jpg"
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div style={{ backgroundImage: `url(${HomeBG})` }} className='h-screen bg-fixed'>
            <div className='flex justify-center py-60 gap-5'>
                <Link to='/app/national'>
                    <button className='buttonHome'>National</button>
                </Link>
                <Link to='/app/team'>
                    <button className='buttonHome'>Equipe</button>
                </Link>
                <Link to='/app/ucl'>
                    <button className='buttonHome'>UCL</button>
                </Link>
            </div>
        </div>
    )
}

export default Home
