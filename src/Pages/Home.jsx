import HomeBG from '../img/HomeBG.jpg'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div
      style={{ backgroundImage: `url(${HomeBG})` }}
      className='h-screen bg-fixed'>
      <div className='flex justify-center py-60 gap-5'>
        <Link to='/national'>
          <button className='text-2xl  bg-green-600 hover:bg-green-800  md:hover:scale-110 transition text-white py-5 px-12 rounded-full'>
            National
          </button>
        </Link>
        <Link to='/team'>
          <button className='text-2xl bg-green-600 hover:bg-green-800  md:hover:scale-110 transition text-white py-5 px-12 rounded-full'>
            Equipe
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
