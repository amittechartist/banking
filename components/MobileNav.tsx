'use client'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image"
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = ({ user }: MobileNavProps) => {
    const pathname = usePathname();
    return (
        <section className="w-full max-w-[264px]">
            <Sheet>
                <SheetTrigger>
                    <Image
                        src={'/icons/hamburger.svg'}
                        width={30}
                        height={30}
                        alt="menu"
                    />
                </SheetTrigger>
                <SheetContent side={'left'} className="border-none bg-white">
                    <div>
                        <nav className='flex flex-col gap-4'>
                            <Link href={'/'} className='cursor-pointer flex items-center gap-1 px-4'>
                                <Image src="/icons/logo.svg" width={34} height={34} alt="Horizon logo"></Image>
                                <h1 className='font-ibm-plex-serif font-bold text-26 text-black-1'>Horizon</h1>
                            </Link>
                            <div className="mobilenav-sheet">
                                <SheetClose asChild>
                                    <nav className="flex h-full flex-col pt-16 gap-6 text-white">
                                        {sidebarLinks?.map((link) => {
                                            const isActive = pathname === link?.route || pathname.startsWith(`${link?.route}/`);
                                            return (
                                                <SheetClose asChild key={link?.label}>
                                                    <Link
                                                        href={link?.route} key={link?.label}
                                                        className={cn('mobilenav-sheet_close w-100', { 'bg-bank-gradient': isActive })}
                                                    >
                                                        <div className='relative'>
                                                            <Image
                                                                src={link?.imgURL}
                                                                alt={link?.label}
                                                                width={20}
                                                                height={20}                                                                
                                                                className={cn({ 'brightness-[3] invert-0': isActive })}
                                                            />
                                                        </div>
                                                        <p className={cn('text-16 font-semibold text-black-2', { 'text-white': isActive })}>
                                                            {link?.label}
                                                        </p>
                                                    </Link>
                                                </SheetClose>
                                            )
                                        })}
                                    </nav>
                                </SheetClose>
                            </div>
                        </nav>
                    </div>
                </SheetContent>
            </Sheet>
        </section >
    )
}

export default MobileNav
