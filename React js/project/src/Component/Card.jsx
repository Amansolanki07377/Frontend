import React from 'react'

function Card() {
  return (
  <div>
    <a href="#" className="block">
      <img alt src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&q=80&w=1160" className="h-64 w-full object-cover sm:h-80 lg:h-96" />
      <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">Lorem, ipsum dolor.</h3>
      <p className="mt-2 max-w-sm text-gray-700">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni reiciendis sequi ipsam
        incidunt.
      </p>
    </a>
  </div>
  )
}

export default Card
