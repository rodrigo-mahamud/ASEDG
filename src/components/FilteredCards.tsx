'use client'
import React, { ReactNode, useState } from 'react'
import Filter from '@/components/lib/filter'

type FilteredCardsProps = {
  data: any[]
  className: string
  filterEnabled: boolean
  children: (item: any) => ReactNode
}

export default function FilteredCards({
  data,
  children,
  className,
  filterEnabled,
}: FilteredCardsProps) {
  console.log(data)

  const [filteredData, setFilteredData] = useState(data)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleFilterChange = (category: any) => {
    if (selectedCategory === category) {
      setSelectedCategory(null)
      setFilteredData(data)
    } else {
      setSelectedCategory(category)
      setFilteredData(
        data.filter((item) => item.categories.some((cat: any) => cat.title === category)),
      )
    }
  }

  return (
    <>
      {filterEnabled && (
        <Filter
          data={data}
          onFilterChange={handleFilterChange}
          selectedCategory={selectedCategory}
        />
      )}
      <div className={className}>
        {filteredData.map((item, index) => (
          <React.Fragment key={index}>{children(item)}</React.Fragment>
        ))}
      </div>
    </>
  )
}
