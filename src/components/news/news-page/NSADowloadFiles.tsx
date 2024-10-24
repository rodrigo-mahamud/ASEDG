'use client'
import React from 'react'
import { Button } from '../../ui/button'
import { IconDownload } from '@tabler/icons-react'
import { IconDisplay } from '../../IconDisplay'
import { DownloadAttachmentsProps, FileAttachment } from '@/types/types'
import downloadFiles from '@/utils/downloadFiles'

const getFileIcon = (mimeType: string): string => {
  switch (true) {
    case mimeType.startsWith('image/'):
      return 'IconPhoto'
    case mimeType.startsWith('video/'):
      return 'IconVideo'
    case mimeType.includes('pdf'):
      return 'IconFileTypePdf'
    case mimeType.includes('word'):
      return 'IconFileTypeDocx'
    case mimeType.includes('excel') || mimeType.includes('spreadsheet'):
      return 'IconFileTypeXls'
    case mimeType.includes('powerpoint') || mimeType.includes('presentation'):
      return 'IconFileTypePpt'
    default:
      return 'IconFile'
  }
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function NSADownloadFiles({ attachments }: DownloadAttachmentsProps) {
  if (!attachments || attachments.length === 0) {
    return null
  }

  return (
    <div className="bg-secondary rounded-lg overflow-hidden border border-border">
      <h2 className="text-lg font-semibold pl-5 py-5">Archivos adjuntos</h2>
      {attachments.map((attachment) => (
        <Button
          key={attachment.id}
          variant={'outline'}
          onClick={() => downloadFiles(attachment.file.url, attachment.file.filename)}
          className="justify-between flex items-center w-full bg-transparent border-x-0 border-b-0 p-5 h-fit hover:bg-border"
        >
          <div className="flex items-center w-4/5 overflow-hidden">
            <div className="bg-foreground rounded-full mr-2 aspect-square flex items-center justify-center">
              <IconDisplay
                iconName={getFileIcon(attachment.file.mimeType)}
                size={35}
                className="p-2 text-white"
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <h3 className="text-sm line-clamp-1 uppercase pr-2 pb-0.5 w-full">
                {attachment.file.filename}
              </h3>
              <span className="text-xs opacity-70">
                ({formatFileSize(attachment.file.filesize)})
              </span>
            </div>
          </div>

          <IconDownload size={20} stroke={1.5} className="" />
        </Button>
      ))}
    </div>
  )
}

export default NSADownloadFiles
