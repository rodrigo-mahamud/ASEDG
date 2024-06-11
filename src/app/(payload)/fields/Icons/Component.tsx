'use client'
import React, { useState, useEffect } from 'react'
import { useField } from '@payloadcms/ui/forms/useField'
import { Field } from 'payload/types'
import * as TablerIcons from '@tabler/icons-react'
import './style.css'

const PAGE_SIZE = 40

interface IconFieldProps {
  path: string
  value: string

  onChange: (value: string) => void
}

const IconField: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue, showError, errorMessage } = useField<string>({
    path,
  })
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

  return (
    <div className="icon-field">
      <button onClick={toggleDropdown} className="icon-button">
        {value ? React.createElement(TablerIcons[valueany]) : 'Select Icon'}
      </button>
      {isDropdownOpen && (
        <div className="icon-dropdown">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search icons..."
            className="icon-search"
          />
          <div className="icon-grid" onScroll={handleScroll}>
            {icons.map((iconName) => {
              const IconComponent = TablerIcons[iconName]
              return (
                <div
                  key={iconName}
                  className={`icon-item ${value === iconName ? 'selected' : ''}`}
                  onClick={() => {
                    setValue(iconName)
                    setIsDropdownOpen(false)
                  }}
                >
                  <IconComponent />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default IconField
