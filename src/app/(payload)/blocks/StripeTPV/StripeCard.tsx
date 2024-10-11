import React from 'react'
import Link from 'next/link'
import DynamicIcon from '@/components/DynamicIcon'
import StripeCardButton from './StripeCardButton'
import BlurFade from '@/components/lib/blurFade'
import { IconInfoCircle, IconLock, IconLockAccessOff } from '@tabler/icons-react'
import { Button } from '@/components/lib/button'
import downloadFiles from '@/utils/downloadFiles'
import StripeTerms from './StripeTerms'

export default function StripeCard({
  cardIncluded,
  cardDescription,
  cardTitle,
  buttonText,
  icon,
  isExpired,
  price,
  expiratedMsg,
  termsFile,
}: any) {
  return (
    <BlurFade delay={0.1} inView>
      <div className="w-full ">
        <div className="overflow-hidden rounded-lg shadow-lg flex">
          <div className="w-4/6 px-6 py-8 bg-white lg:p-12">
            <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">{cardTitle}</h3>
            <p className="mt-6 text-base text-gray-500">{cardDescription}</p>
            <div className="mt-8">
              <div className="flex items-center">
                <h4 className="flex-shrink-0 pr-4 text-sm font-semibold tracking-wider text-indigo-600 uppercase bg-white">
                  Incluido en el pago
                </h4>
                <div className="flex-1 border-t-2 border-gray-200"></div>
              </div>
              <ul className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
                {cardIncluded.map((item: any, index: number) => (
                  <li key={index} className="flex items-center gap-3 lg:col-span-1">
                    <div className="rounded-full bg-green-400 text-white w-6 h-6 flex items-center justify-center">
                      <DynamicIcon iconName={item.icon} className="w-4 h-4" stroke={2} />
                    </div>
                    <span className="text-sm leading-[0]">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="px-6 relative w-2/6 py-8 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
            {isExpired ? (
              <div className="flex flex-col gap-6 justify-center items-center">
                <div className="bg-indigo-100 p-4 w-fit rounded-full">
                  <IconLock className="w-10 h-10 text-primary"></IconLock>
                </div>
                <div className="flex items-center justify-center mt-4 text-2xl font-semibold text-gray-900">
                  <span className="line-clamp-2">{expiratedMsg}</span>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center mt-4 text-5xl font-extrabold text-gray-900">
                  <span>{price}€</span>
                </div>
                <div className="mt-6">
                  <div className="rounded-md shadow">
                    <StripeCardButton
                      buttonText={buttonText}
                      icon={icon}
                      isExpired={isExpired}
                    ></StripeCardButton>
                  </div>
                </div>
                {termsFile && (
                  <div className="mt-4 text-sm">
                    <StripeTerms termsFile={termsFile}></StripeTerms>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </BlurFade>
  )
}
