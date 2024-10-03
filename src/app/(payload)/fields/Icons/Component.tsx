'use client'
import React, { useState, useEffect } from 'react'
import { useField } from '@payloadcms/ui'
import * as TablerIcons from '@tabler/icons-react'
import { Icon as TablerIcon, IconProps } from '@tabler/icons-react'
import './style.css'

const PAGE_SIZE = 40

const IconField: React.FC<{ field: { _path: string } }> = ({ field }) => {
  const { value, setValue } = useField<string>({ path: field._path })
  const [search, setSearch] = useState('')
  const [icons, setIcons] = useState(Object.keys(TablerIcons).slice(0, PAGE_SIZE))
  const [page, setPage] = useState(1)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const filteredIcons = Object.keys(TablerIcons).filter((iconName) =>
      iconName.toLowerCase().includes(search.toLowerCase()),
    )
    setIcons(filteredIcons.slice(0, PAGE_SIZE * page))
  }, [search, page])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    const scrollTop = target.scrollTop
    const scrollHeight = target.scrollHeight
    const clientHeight = target.clientHeight
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight

    if (scrollPercentage > 0.99) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const toggleDropdown = (event: React.MouseEvent) => {
    event.preventDefault()
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleIconSelect = (iconName: string) => {
    setValue(iconName)
    setIsDropdownOpen(false)
  }

  const renderIcon = (iconName: string) => {
    const IconComponent = TablerIcons[
      iconName as keyof typeof TablerIcons
    ] as React.ComponentType<IconProps>
    return IconComponent ? <IconComponent size={22} stroke={1.5} /> : null
  }

  const Default = () => {
    return (
      <>
        <TablerIcons.IconMoodSearch size={22} stroke={1.5}></TablerIcons.IconMoodSearch>
      </>
    )
  }

  return (
    <div className="icon-field">
      <span className="text-[13px] leading-[20px] pb-[5px]"> Icono</span>
      <button onClick={toggleDropdown} className="icon-button">
        {value ? renderIcon(value) : <Default />}
      </button>
      {isDropdownOpen && (
        <div className="icon-dropdown">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Buscar iconos (EN)"
            className="icon-search"
          />
          <div className="icon-grid" onScroll={handleScroll}>
            {icons.map((iconName) => (
              <div
                key={iconName}
                className={`icon-item ${value === iconName ? 'selected' : ''}`}
                onClick={() => handleIconSelect(iconName)}
              >
                {renderIcon(iconName)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default IconField
