import React from "react";
interface titleTypes {
   title: string;
   subtitle?: string;
}
export default function Title({ title, subtitle }: titleTypes) {
   return (
      <div className='flex flex-col w-9/12 mb-12'>
         <h2 className='text-4xl font-cal mb-4'>{title}</h2>
         {subtitle && <h3 className='text-balance'>{subtitle}</h3>}
      </div>
   );
}
