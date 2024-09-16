'use client'
import React, { useState, useEffect, useRef } from 'react'
import { extractH2Headings } from '@/utils/serializeLexicalRichText'
import { NSAIndexProps, HeadingInfo } from '@/types/typesNP'

function toSentenceCase(str: string): string {
  return str.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())
}

const NSAIndex: React.FC<NSAIndexProps> = ({ indexContent }) => {
  const [activeId, setActiveId] = useState<string>('')
  const [progressHeight, setProgressHeight] = useState<number>(0)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const headings = extractH2Headings(indexContent.root.children)

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: '-10% 0px -70% 0px',
      threshold: 0.1,
    })

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observerRef.current?.observe(element)
      }
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [headings])

  useEffect(() => {
    if (listRef.current && activeId) {
      const activeElement = listRef.current.querySelector(`a[href="#${activeId}"]`)
      if (activeElement) {
        const parentRect = listRef.current.getBoundingClientRect()
        const activeRect = activeElement.getBoundingClientRect()
        const newProgressHeight =
          ((activeRect.top + activeRect.height / 2 - parentRect.top) / parentRect.height) * 100
        setProgressHeight(newProgressHeight)
      }
    }
  }, [activeId])

  if (headings.length === 0) {
    return null
  }

  return (
    <div className="bg-[#f3f4f6] rounded-lg overflow-hidden border border-border">
      <h2 className="text-lg font-semibold p-5">Indice de contenidos</h2>
      <div className="border-t border-border py-5 flex">
        <div className="w-1 bg-foreground/15 mx-5 rounded-full overflow-hidden relative">
          <div
            className="bg-foreground w-full absolute top-0 left-0 transition-all duration-300 ease-in-out"
            style={{ height: `${progressHeight}%` }}
          ></div>
        </div>
        <ul ref={listRef} className="relative flex-1">
          {headings.map((heading: HeadingInfo, index: number) => (
            <li className="mb-3 last:mb-0" key={index}>
              <a
                className={`line-clamp-1 transition-all ${
                  activeId === heading.id
                    ? 'font-semibold text-foreground ml-1.5'
                    : 'text-foreground/70'
                }`}
                href={`#${heading.id}`}
              >
                {toSentenceCase(heading.text)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default NSAIndex
