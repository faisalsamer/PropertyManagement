'use client'

import React from 'react'

const Page = () => {
  return (
    <div className="flex items-center justify-center h-full w-full bg-(--background-secondary)">
      <div className="text-center p-8 rounded-lg shadow-md bg-(--background-primary)">
        <h1 className="texts-heading-h1 mb-4 text-(--text-primary)">
          Welcome!
        </h1>
        <p className="texts-body-medium text-(--text-secondary)">
          Please choose an option from the sidebar to get started.
        </p>
      </div>
    </div>
  )
}

export default Page
