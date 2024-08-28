'use client'
import React from 'react'
import { Separator } from '@/components/lib/separator'
import { VisitorData } from '@/utils/dashboard/types'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { SkeletonLogInfo } from './SkeletonLogInfo'

interface LogsDetailsInfoProps {
  currentLog: any
  visitorInfo: VisitorData | null
  isLoadingVisitor: boolean
}

export function LogsDetailsInfo({
  currentLog,
  visitorInfo,
  isLoadingVisitor,
}: LogsDetailsInfoProps) {
  console.log(visitorInfo)
  const formatDate = (timestamp: number) => {
    return format(new Date(timestamp), "dd 'de' MMMM 'de' yyyy", { locale: es })
  }

  return (
    <div>
      {isLoadingVisitor ? (
        <SkeletonLogInfo />
      ) : visitorInfo ? (
        <>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="useTw text-base font-normal text-white/70">Día:</h3>
              <h4 className="useTw text-base font-normal capitalize">{currentLog.daystamp}</h4>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="useTw text-base font-normal text-white/70">Hora:</h3>
              <h4 className="useTw text-base font-normal">{currentLog.hourstamp}</h4>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="useTw text-base font-normal text-white/70">Acción:</h3>
              <h4 className="useTw text-base font-normal">{currentLog.action}</h4>
            </div>
            {currentLog.unlockMethod && (
              <div className="flex justify-between items-center">
                <h3 className="useTw text-base font-normal text-white/70">Método de desbloqueo:</h3>
                <h4 className="useTw text-base font-normal">{currentLog.unlockMethod}</h4>
              </div>
            )}
          </div>

          <div className="space-y-3 mt-10">
            <h3 className="useTw text-xl font-medium">Información del Visitante</h3>
            <div className="flex justify-between items-center">
              <h3 className="useTw text-base font-normal text-white/70">Nombre:</h3>
              <h4 className="useTw text-base font-normal">{visitorInfo.first_name}</h4>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="useTw text-base font-normal text-white/70">Apellidos:</h3>
              <h4 className="useTw text-base font-normal">{visitorInfo.last_name}</h4>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="useTw text-base font-normal text-white/70">DNI:</h3>
              <h4 className="useTw text-base font-normal">{visitorInfo.dni}</h4>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="useTw text-base font-normal text-white/70">Edad:</h3>
              <h4 className="useTw text-base font-normal">{visitorInfo.age}</h4>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="useTw text-base font-normal text-white/70">Email:</h3>
              <h4 className="useTw text-base font-normal">{visitorInfo.email}</h4>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="useTw text-base font-normal text-white/70">Nº Teléfono:</h3>
              <h4 className="useTw text-base font-normal">{visitorInfo.mobile_phone}</h4>
            </div>
            {visitorInfo.start_time && (
              <div className="flex justify-between items-center">
                <h3 className="useTw text-base font-normal text-white/70">Valido desde:</h3>
                <h4 className="useTw text-base font-normal">
                  {formatDate(visitorInfo.start_time)}
                </h4>
              </div>
            )}
            {visitorInfo.end_time && (
              <div className="flex justify-between items-center">
                <h3 className="useTw text-base font-normal text-white/70">Valido hasta:</h3>
                <h4 className="useTw text-base font-normal">{formatDate(visitorInfo.end_time)}</h4>
              </div>
            )}
          </div>
        </>
      ) : (
        <p>No se pudo cargar la información del visitante</p>
      )}
    </div>
  )
}
