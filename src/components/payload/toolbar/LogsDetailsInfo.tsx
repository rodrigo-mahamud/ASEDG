import React from 'react'
import { Separator } from '@/components/lib/separator'
import { VisitorData } from '@/utils/dashboard/types'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
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
    <>
      <div className="space-y-3">
        <h2 className="useTw text-xl font-bold">Detalles del egistro</h2>
        <div className="flex justify-between items-center">
          <h3 className="useTw text-lg font-normal ">Día:</h3>
          <h4 className="useTw text-lg font-normal capitalize">{currentLog.daystamp}</h4>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="useTw text-lg font-normal ">Hora:</h3>
          <h4 className="useTw text-lg font-normal ">{currentLog.hourstamp}</h4>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="useTw text-lg font-normal ">Acción:</h3>
          <h4 className="useTw text-lg font-normal ">{currentLog.action}</h4>
        </div>
        {currentLog.unlockMethod && (
          <div className="flex justify-between items-center">
            <h3 className="useTw text-lg font-normal ">Método de desbloqueo:</h3>
            <h4 className="useTw text-lg font-normal ">{currentLog.unlockMethod}</h4>
          </div>
        )}
      </div>
      <Separator />
      <div className="space-y-3">
        {isLoadingVisitor ? (
          <p>Cargando información del visitante...</p>
        ) : visitorInfo ? (
          <>
            <h3 className="useTw text-xl font-bold">Información del Visitante</h3>
            <div className="flex justify-between items-center">
              <h3 className="useTw text-lg font-normal ">Nombre:</h3>
              <h4 className="useTw text-lg font-normal ">{visitorInfo.first_name}</h4>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="useTw text-lg font-normal ">Apellidos:</h3>
              <h4 className="useTw text-lg font-normal ">{visitorInfo.last_name}</h4>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="useTw text-lg font-normal ">DNI:</h3>
              <h4 className="useTw text-lg font-normal ">{visitorInfo.dni}</h4>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="useTw text-lg font-normal ">Edad:</h3>
              <h4 className="useTw text-lg font-normal ">{visitorInfo.age}</h4>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="useTw text-lg font-normal ">Email:</h3>
              <h4 className="useTw text-lg font-normal ">{visitorInfo.email}</h4>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="useTw text-lg font-normal ">Nº Teléfono:</h3>
              <h4 className="useTw text-lg font-normal ">{visitorInfo.mobile_phone}</h4>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="useTw text-lg font-normal ">Valido desde:</h3>
              <h4 className="useTw text-lg font-normal ">{formatDate(visitorInfo.start_time)}</h4>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="useTw text-lg font-normal ">Valido hasta:</h3>
              <h4 className="useTw text-lg font-normal ">{formatDate(visitorInfo.end_time)}</h4>
            </div>
          </>
        ) : (
          <p>No se pudo cargar la información del visitante</p>
        )}
      </div>
    </>
  )
}
