import { IconBrandInstagram, IconBrandLinkedin, IconMapPin, IconPhone } from "@tabler/icons-react";
import Image from "next/image";
import Silouette from "@/components/Silouette";

export default function Footer() {
   return (
      <footer className='relative h-[600px] bg-[#030122] overflow-hidden' style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
         <div className='fixed bottom-0 h-[600px] w-full'>
            <div className='container'>
               <div className='flex flex-col gap-10 py-12 md:grid md:grid-cols-6 md:grid-rows-1 md:py-24'>
                  <div className='col-span-2'>
                     <Image
                        src='/logo.png'
                        className='object-cover invert saturate-0'
                        width={150}
                        height={75}
                        quality={1}
                        sizes='(max-width: 768px) 25vw, 50vw'
                        alt='dhc project'
                     />
                     <p className='pt-10 text-xl font-bold text-white md:pt-5'>sssss</p>
                     <div className='mt-2 flex w-1/2'>
                        <div className='mr-3 flex h-9 w-9 items-center justify-center bg-dark-400 duration-300 ease-out hover:cursor-pointer dark:bg-dark-300 dark:hover:bg-brand'>
                           <IconBrandInstagram className='w-1/2 text-white' />
                        </div>
                        <div className='mr-3 flex h-9 w-9 items-center justify-center bg-dark-400 duration-300 ease-out hover:cursor-pointer dark:bg-dark-300 dark:hover:bg-brand'>
                           <IconBrandInstagram className='w-1/2 text-white' />
                        </div>
                        <div className='mr-3 flex h-9 w-9 items-center justify-center bg-dark-400 duration-300 ease-out hover:cursor-pointer dark:bg-dark-300 dark:hover:bg-brand'>
                           <IconBrandLinkedin className='w-1/2 text-white' />
                        </div>
                     </div>
                  </div>
                  <div className='col-span-2 col-start-3 w-3/4'>
                     <div className='mb-2'>
                        <h2 className='mb-4 text-2xl font-bold text-white md:mb-10'>Ubicación</h2>
                        <h3 className='mb-4 flex text-base text-light-500'>
                           <IconMapPin className='mr-2 text-white' />
                           <a className='text-white hover:text-white' href='https://maps.app.goo.gl/ypJkijwKMpZ2sZhw5'>
                              C/ Daniel Balaciart, 2 46020, Valencia, Spain
                           </a>
                        </h3>
                        <h3 className='flex text-base text-light-500'>
                           <IconPhone className='mr-2 text-white' />
                           <a className='text-white hover:text-white' href='tel:666666666'>
                              Tel: +36 664 66 66 66
                           </a>
                        </h3>
                     </div>
                  </div>
                  <div className='col-start-5'>
                     <h2 className='mb-4 text-2xl font-bold text-white md:mb-10'>Location</h2>
                     <p className='text-base text-light-500 text-white'>C/ Daniel Balaciart, 2 46020, Valencia, Spain</p>
                  </div>
                  <div className='col-start-6'>
                     <h2 className='mb-4 text-2xl font-bold text-white md:mb-10'>Location</h2>
                     <p className='text-base text-light-500 text-white'>C/ Daniel Balaciart, 2 46020, Valencia, Spain</p>
                  </div>
               </div>
            </div>
            <Silouette></Silouette>
         </div>
      </footer>
   );
}
