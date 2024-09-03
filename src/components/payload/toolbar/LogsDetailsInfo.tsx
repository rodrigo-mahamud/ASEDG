'use client'
import React from 'react'
import { VisitorData } from '@/utils/dashboard/types'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { SkeletonLogInfo } from './SkeletonLogInfo'

interface LogsDetailsInfoProps {
  currentLog: any
  userInfo: VisitorData | null
  isLoadingVisitor: boolean
}

export function LogsDetailsInfo({ currentLog, userInfo, isLoadingVisitor }: LogsDetailsInfoProps) {
  const formatDate = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "dd 'de' MMMM 'de' yyyy", { locale: es })
  }

  return (
    <div>
      {currentLog && (
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
            <h3 className="useTw text-base font-normal text-white/70">Usuario:</h3>
            <h4 className="useTw text-base font-normal">{currentLog.userName}</h4>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="useTw text-base font-normal text-white/70">Acción:</h3>
            <h4 className="useTw text-base font-normal">{currentLog.action.text}</h4>
          </div>
          {currentLog.unlockMethod && (
            <div className="flex justify-between items-center">
              <h3 className="useTw text-base font-normal text-white/70">Método de desbloqueo:</h3>
              <h4 className="useTw text-base font-normal">{currentLog.unlockMethod}</h4>
            </div>
          )}
        </div>
      )}

      {isLoadingVisitor ? (
        <SkeletonLogInfo />
      ) : userInfo ? (
        <div className="space-y-3 mt-10">
          <h3 className="useTw text-xl font-medium">Información del Usuario</h3>
          <div className="flex justify-between items-center">
            <h3 className="useTw text-base font-normal text-white/70">Nombre:</h3>
            <h4 className="useTw text-base font-normal">{userInfo.first_name}</h4>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="useTw text-base font-normal text-white/70">Apellidos:</h3>
            <h4 className="useTw text-base font-normal">{userInfo.last_name}</h4>
          </div>
          {currentLog.userType === 'visitor' && (
            <>
              <div className="flex justify-between items-center">
                <h3 className="useTw text-base font-normal text-white/70">DNI:</h3>
                <h4 className="useTw text-base font-normal">{userInfo.dni}</h4>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="useTw text-base font-normal text-white/70">Edad:</h3>
                <h4 className="useTw text-base font-normal">{userInfo.age}</h4>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="useTw text-base font-normal text-white/70">Email:</h3>
                <h4 className="useTw text-base font-normal">{userInfo.email}</h4>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="useTw text-base font-normal text-white/70">Nº Teléfono:</h3>
                <h4 className="useTw text-base font-normal">{userInfo.mobile_phone}</h4>
              </div>
              {userInfo.start_time && (
                <div className="flex justify-between items-center">
                  <h3 className="useTw text-base font-normal text-white/70">Valido desde:</h3>
                  <h4 className="useTw text-base font-normal">{formatDate(userInfo.start_time)}</h4>
                </div>
              )}
              {userInfo.end_time && (
                <div className="flex justify-between items-center">
                  <h3 className="useTw text-base font-normal text-white/70">Valido hasta:</h3>
                  <h4 className="useTw text-base font-normal">{formatDate(userInfo.end_time)}</h4>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="mt-10 text-white/70">
          No se muestra información adicional ya que el evento ha sido realizado por un usuario
          desconocido sin registrar en el sistema.
        </div>
      )}
    </div>
  )
}
