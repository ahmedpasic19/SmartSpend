'use client'
import { BiChevronLeft } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { auth } from '@/config/firebase-config'
import { signOut } from 'firebase/auth'

type TProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean
  wasOpen: Boolean
  links: { href: string; label: string }[]
}

const DropdownMenu = ({ setIsOpen, isOpen, wasOpen, links }: TProps) => {
  const router = useRouter()

  const logOut = () => {
    signOut(auth)
    router.push('/')
  }

  return (
    <>
      <div
        className={`fixed top-0 right-0 z-50 h-screen w-3/4 bg-primary drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)] ${
          isOpen ? 'animate-slide-in' : wasOpen ? 'animate-slide-out' : 'hidden'
        }`}
      >
        <div className="text-neutral relative flex  w-full items-center justify-center py-3 text-center text-2xl font-bold">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute left-0 p-5 text-start text-lg font-bold text-neutral"
          >
            <BiChevronLeft className="h-8 w-8 text-neutral" />
          </button>
          <h1 className="w-full text-center">Paycheck</h1>
        </div>

        <ul className="h-screen overflow-y-auto">
          {links
            .filter((link) => link.href !== '/')
            .map((link) => (
              <li
                key={Math.random()}
                onClick={() => setIsOpen(false)}
                className="w-full p-5 text-lg font-semibold text-neutral"
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}

          <button
            onClick={logOut}
            className="w-full p-5 text-lg font-semibold text-primary bg-accent drop-shadow-[0px_0px_3px_rgba(0,0,0,0.25)]"
          >
            Log out
          </button>
        </ul>

        {/* Close and logout btns */}
        <div className="w-full"></div>
      </div>
    </>
  )
}

export default DropdownMenu
