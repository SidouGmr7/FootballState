import React from "react"

function Footer() {
    return (
        <div className='py-10  overflow-hidden bg-white'>
            <div className='flex gap-2 justify-center mt-4 md:gap-8 capitalize'>
                <p>hello state footbal</p>
            </div>
            <div className='flex align-center justify-center mt-4 md:text-xl'>
                <p className='text-black mb-4'>
                    Made by
                    <a className='text-rose-600' href='mailto:goumirisidali@hotmail.com'>
                        {" "}
                        Goumiri Ali
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Footer
