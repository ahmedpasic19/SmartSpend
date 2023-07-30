'use client'
import { useState } from 'react'

import DropdownMenu from './DropdownMenu'

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false)
  const [dropdownWasOpen, setDropdownWasOpen] = useState(false)

  const links = [
    { href: '/home', label: 'Home' },
    { href: '/transactions', label: 'Transakcije' },
    { href: '/stashes', label: 'Zalihe' },
    { href: '/categories', label: 'Kategorije' },
  ]

  return (
    <nav className="w-full justify-between items-center flex h-10 bg-primary fixed top-0 left-0 right-0 z-50 drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)]">
      <h3 className="text-lg text-neutral font-bold tracking-wider pl-5">SmartSpend</h3>

      <button
        onClick={() => {
          setOpenDropdown(true)
          setDropdownWasOpen(true)
        }}
        data-collapse-toggle="navbar-sticky"
        type="button"
        className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500"
        aria-controls="navbar-sticky"
        aria-expanded="false"
      >
        <svg
          className="h-6 w-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>

      <DropdownMenu isOpen={openDropdown} links={links} setIsOpen={setOpenDropdown} wasOpen={dropdownWasOpen} />

      {/* Blur element */}
      {openDropdown && (
        <div
          onClick={() => setOpenDropdown(false)}
          className="fixed top-0 left-0 z-40 h-screen w-full bg-black bg-opacity-30 backdrop-blur-sm backdrop-filter"
        />
      )}
    </nav>
  )
}

export default Navbar
