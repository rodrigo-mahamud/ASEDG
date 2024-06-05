'use client'
import type { ChangeEvent } from 'react'
import React, { useEffect, useState } from 'react'
import { useField, FieldType } from '@payloadcms/ui/forms/useField'
import * as TablerIcons from '@tabler/icons-react'

import './style.css'

const baseClass = 'icon'

export type IconInputProps = {
  afterInput?: React.ComponentType<any>[]
  beforeInput?: React.ComponentType<any>[]
  className?: string
  errorMessage?: string
  inputRef?: React.MutableRefObject<HTMLInputElement>
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  path: string
  placeholder?: string
  readOnly?: boolean
  required?: boolean
  showError?: boolean
  style?: React.CSSProperties
  value?: string
  width?: string
}

const IconInput: React.FC<IconInputProps> = ({
  afterInput,
  beforeInput,
  path,
  style,
  value,
  width,
}) => {
  const { value: fieldValue, setValue, initialValue }: FieldType<string> = useField({ path })
  const [search, setSearch] = useState('')
  const [filteredIcons, setFilteredIcons] = useState(Object.keys(TablerIcons))
  const [hoveredIcon, setHoveredIcon] = useState<null | string>(null)
  const [fieldIsFocused, setFieldIsFocused] = useState(false)

  useEffect(() => {
    if (search === '') {
      setFilteredIcons(Object.keys(TablerIcons))
    } else {
      const foundIcons = Object.keys(TablerIcons).filter((icon) =>
        icon.toLowerCase().includes(search.toLowerCase()),
      )
      setFilteredIcons(foundIcons)
    }
  }, [search])

  const formatIconName = (icon: string): string => {
    // Remover el prefijo 'Icon' y agregar 'Icono: '
    if (icon.startsWith('Icon')) {
      return `Icono: ${icon.slice(4)}`
    }
    return icon
  }

  return (
    <div
      className="flex flex-col justify-between"
      style={{
        ...style,
        width,
      }}
    >
      <label>Icono de la pestaña</label>
      <div
        className={`${baseClass}__input-container bg-[#222] `}
        onFocus={() => setFieldIsFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setTimeout(() => setFieldIsFocused(false), 200)
          }
        }}
      >
        {Array.isArray(beforeInput) && beforeInput.map((Component, i) => <Component key={i} />)}
        <div
          className="w-[50px] h-[50px]  flex items-center justify-center"
          onClick={() => setFieldIsFocused(true)}
        >
          {fieldValue && React.createElement((TablerIcons as any)[fieldValue])}
        </div>
        <input
          type="search"
          className="p-4 w-full bg-transparent border border-solid border-[#3c3c3c]"
          onChange={(e) => setSearch(e.target.value)}
          value={value}
          placeholder={hoveredIcon || 'Search icons...'}
        />
        {fieldIsFocused && (
          <div className={`${baseClass}__icon-picker-modal`}>
            <div className={`${baseClass}__icon-picker-modal__icon-search`}></div>
            <div className={`${baseClass}__icon-picker-modal__icon-container`}>
              {filteredIcons.slice(0, 140).map((icon, index) => {
                const IconComponent = (TablerIcons as any)[icon]
                return (
                  <div
                    onClick={() => {
                      setValue(icon) // Update the field value here
                      setFieldIsFocused(false)
                      setFilteredIcons(Object.keys(TablerIcons))
                    }}
                    title={icon}
                    onMouseOver={() => setHoveredIcon(formatIconName(icon))}
                    className={`${baseClass}__icon-picker-modal__icon-option ${
                      fieldValue === icon
                        ? `${baseClass}__icon-picker-modal__icon-option-active`
                        : ''
                    }`}
                    key={index}
                  >
                    <IconComponent />
                  </div>
                )
              })}
              {filteredIcons.length === 0 && <span>No icons found</span>}
            </div>
          </div>
        )}
        {Array.isArray(afterInput) && afterInput.map((Component, i) => <Component key={i} />)}
      </div>
    </div>
  )
}

export default IconInput
