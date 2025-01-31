import React from 'react'

const SideBar = ({hasCategory}) => {
  return (
    <div className="md:sticky max-h-fit top-0 md:max-h-screen h-screen overflow-y-auto w-full md:w-1/4 bg-gradient-to-r from-cyan-400 to-blue-400 border-0 p-8 text-blue-950 font-semibold">
    <h2 className="text-xl font-semibold mb-4">Filters</h2>
    {hasCategory && (
      <div className="mb-6 ">
        <h3 className="font-medium text-lg mb-2">Categories</h3>
        <ul>
          <li>
            <input type="checkbox" id="electronics" className="mr-2 " />
            <label htmlFor="electronics">Electronics</label>
          </li>
          <li>
            <input type="checkbox" id="clothing" className="mr-2" />
            <label htmlFor="clothing">Clothing</label>
          </li>
          <li>
            <input type="checkbox" id="books" className="mr-2" />
            <label htmlFor="books">Books</label>
          </li>
        </ul>
      </div>
    )}
    <div className="mb-6">
      <h3 className="font-medium text-lg mb-2">Price Range</h3>
      <input type="range" min="0" max="1000" className="w-full" />
      <div className="flex justify-between text-sm mt-2">
        <span>Rs 0</span>
        <span>Rs 1000</span>
      </div>
    </div>
    <div>
      <h3 className="font-medium text-lg mb-2">Used</h3>
      <ul>
        <li className="my-2">
          <input
            type="radio"
            name="usage"
            id="less-than-6-months"
            className="mr-2"
          />
          <label htmlFor="less-than-6-months">Less than 6 Months</label>
        </li>
        <li className="my-2">
          <input
            type="radio"
            name="usage"
            id="6-months-1-year"
            className="mr-2"
          />
          <label htmlFor="6-months-1-year">6 Months - 1 Year</label>
        </li>
        <li className="my-2">
          <input
            type="radio"
            name="usage"
            id="1-year-2-years"
            className="mr-2"
          />
          <label htmlFor="1-year-2-years">1 Year - 2 Years</label>
        </li>
        <li className="my-2">
          <input
            type="radio"
            name="usage"
            id="2-years-4-years"
            className="mr-2"
          />
          <label htmlFor="2-years-4-years">2 Years - 4 Years</label>
        </li>
        <li className="my-2">
          <input
            type="radio"
            name="usage"
            id="more-than-4-years"
            className="mr-2"
          />
          <label htmlFor="more-than-4-years">More than 4 Years</label>
        </li>
      </ul>
    </div>
  </div>
  )
}

export default SideBar
