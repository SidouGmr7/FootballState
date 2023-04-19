import SidouProfile2 from "../../img/SidouProfile2.jpg"
import { Link } from "react-router-dom"
import { TbBallFootball } from "react-icons/tb"
import { SiFirebase } from "react-icons/si"
import { VscJson } from "react-icons/vsc"
import { Chip } from "@material-ui/core"

function Navbar() {
    return (
        <header className='bg-slate-900 z-50 p-4 w-screen bg-primary'>
            <div className='md:flex w-full h-full items-center justify-between'>
                <div className='flex items-center justify-center'>
                    <div className='flex items-center gap-2'>
                        <p className='md:text-xl text-slate-200'>
                            <span className='text-primary font-bold'>F</span>OOT
                            <span className='text-primary font-bold'>S</span>TAT
                        </p>
                        <TbBallFootball className='text-primary text-2xl' />
                    </div>
                </div>
                <div className='md:flex hidden items-center gap-8 mr-14'>
                    <ul
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 200 }}
                        className='flex items-center gap-10'>
                        <Link to='/'>
                            <li className='navbarItem'>Home</li>
                        </Link>
                        <Link to='/app/national'>
                            <li className='navbarItem'>National</li>
                        </Link>
                        <Link to='/app/team'>
                            <li className='navbarItem'>Equipe</li>
                        </Link>
                        <Link to='/app/ucl'>
                            <li className='navbarItem'>UCL</li>
                        </Link>
                        <Link to='/add'>
                            <li className='navbarItem'>Add</li>
                        </Link>
                    </ul>
                    <div className='relative'>
                        <img
                            src={SidouProfile2}
                            className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
                            alt='userprofile'
                        />
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Navbar
