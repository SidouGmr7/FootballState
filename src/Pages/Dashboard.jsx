import React from "react"
import { Slider } from "../Resource/Layout/Slider"
import { sliderLink } from "../routes"
import { useLocation } from "react-router-dom"

export const Dashboard = () => {
    const path = useLocation().pathname
    return (
        <div className='flex flex-col md:flex-row min-h-screen'>
            <Slider />
            <div className='w-full md:w-3/4'>
                {sliderLink.map(({ components, link }) => {
                    if (path === link) return components
                    else return null
                })}
            </div>
        </div>
    )
}
