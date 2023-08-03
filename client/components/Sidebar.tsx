"use client"

import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { HiHome } from "react-icons/hi"
import { BiSearch } from "react-icons/bi"
import Box from "./Box"
import SidebarItem from "./SidebarItem"

interface SidebarProps {
    children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
    children
}) => {
    const pathname = usePathname();

    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Dashboard',
            active: pathname !== '/dashboard',
            href: '/dashboard'
        }, {
            icon: BiSearch,
            label: 'Search',
            active: pathname === '/search',
            href: '/search'
        }
    ], [])

    return (
        <div className="flex h-full bg-black">
            <div 
                className="
                    hidden 
                    md:flex 
                    flex-col 
                    gap-y-2 
                    h-full
                    w-[200px]
                    p-5
                "
            >
                <Box className="mt-1">
                    <div className="
                            flex
                            flex-col
                            gap-y-4
                            px-5
                            py-4
                        "
                    >

                        {routes.map((item) => (
                            <SidebarItem 
                                key={item.label}
                                {...item}
                            />
                        ))}

                    </div>
                </Box>

            </div>

            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    )
}

export default Sidebar