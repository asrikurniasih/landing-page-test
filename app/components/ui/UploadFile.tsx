'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Upload } from 'lucide-react'
import Constants from '@/ultis/Constants'
import { useNotification } from '../layout/notification-provider'
import IconFile from '../icon/icon-file'
import IconGallery from '../icon/icon-gallery'
import IconBarChart from '../icon/icon-bar-chart'
import IconNotes from '../icon/icon-notes'

type UploadResult = {
  filename: string
  filepath: string
  fileuri: string
}

type Props = {
  onUploaded: (result: UploadResult | null) => void
  setImageUrl?: string // default preview
}

export default function UploadFile({ onUploaded, setImageUrl }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<UploadResult | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { notify } = useNotification();

  useEffect(() => {
    console.log('setImageUrl', setImageUrl)
    if (setImageUrl && setImageUrl.trim() !== '') {
      const mapped = {
        filename: '',
        filepath: '',
        fileuri: setImageUrl,
      }
      setPreview(mapped)
    } else {
      setPreview(null)
    }
  }, [setImageUrl])

  const handleSelectFile = () => inputRef.current?.click()

  const getUploadUrl = (fileType: string) => {
    if (fileType.startsWith('image/')) return Constants.imageUploadUrl
    if (fileType === 'application/pdf') return Constants.pdfUploadUrl
    if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
        fileType === 'application/vnd.ms-excel') return Constants.pdfUploadUrl
    if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
        fileType === 'application/msword') return Constants.pdfUploadUrl
    return null
  }

  const isValidFile = (file: File) => {
    const type = file.type
    const size = file.size

    if (type.startsWith('image/') && size <= 5 * 1024 * 1024) return true
    if (type === 'application/pdf' && size <= 10 * 1024 * 1024) return true
    if ((type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
         type === 'application/vnd.ms-excel') && size <= 10 * 1024 * 1024) return true
    if ((type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
         type === 'application/msword') && size <= 10 * 1024 * 1024) return true

    notify('Hanya gambar (max 5MB), PDF (max 10MB), Excel (max 10MB), dan Word (max 10MB) yang diperbolehkan')
    
    return false
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!isValidFile(file)) {
      setError('Hanya gambar (max 5MB), PDF (max 10MB), Excel (max 10MB), dan Word (max 10MB) yang diperbolehkan')
      return
    }

    const uploadUrl = getUploadUrl(file.type)
    if (!uploadUrl) {
      setError('Tipe file tidak didukung')
      return
    }

    setUploading(true)
    setError(null)

    const formData = new FormData()
    const key = file.type.startsWith('image/') ? 'image' : 'file'
    formData.append(key, file)
    formData.append('client_name', 'rusunawa')
    formData.append('key', key)

    try {
      const res = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      })
      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || 'Upload gagal')
      }

      setPreview(result.data)
      onUploaded(result.data)
    } catch (err) {
      setError('Gagal mengunggah file')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    onUploaded(null)
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/') || fileType === 'image') return <IconGallery className="w-12 h-12 text-blue-500" />
    if (fileType === 'application/pdf' || fileType === 'pdf') return <IconFile className="w-12 h-12 text-red-500" />
    if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
        fileType === 'application/vnd.ms-excel' || fileType === 'excel') return <IconBarChart className="w-12 h-12 text-green-500" />
    if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
        fileType === 'application/msword' || fileType === 'doc') return <IconNotes className="w-12 h-12 text-blue-600" />
    return <IconFile className="w-12 h-12 text-gray-500" />
  }

  const getFileTypeName = (fileType: string) => {
    if (fileType.startsWith('image/')) return 'Gambar'
    if (fileType === 'application/pdf') return 'PDF'
    if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
        fileType === 'application/vnd.ms-excel') return 'Excel'
    if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
        fileType === 'application/msword') return 'Word'
    return 'File'
  }

  const getFileTypeFromUrl = (url: string) => {
    if (url.match(/\.(jpg|jpeg|png|gif)$/i)) return 'image'
    if (url.match(/\.pdf$/i)) return 'pdf'
    if (url.match(/\.(xlsx|xls)$/i)) return 'excel'
    if (url.match(/\.(docx|doc)$/i)) return 'doc'
    return 'file'
  }

  return (
    <div className="w-full">
      {preview ? (
        <div className="relative group h-[270px] min-h-[270px] max-h-[270px] w-full">
          <div className="bg-white rounded-xl hover:border-blue-300 transition-all duration-200">
            {preview.fileuri && preview.fileuri.match(/\.(jpg|jpeg|png|gif)$/i) ? (
              <div className="w-full h-[270px]">
                <img
                  src={preview.fileuri}
                  alt="Preview"
                  className="w-full h-full object-contain rounded-lg border"
                />
              </div>
            ) : preview.fileuri && preview.fileuri.match(/\.pdf$/i) ? (
              <div className="flex items-center space-x-4 justify-center h-[270px] bg-red-100 rounded-lg">
                <a href={preview.fileuri} target="_blank" rel="noopener noreferrer">
                  <div className="flex-shrink-0">
                    <IconFile className="w-16 h-16 text-red-500" />
                  </div>
                </a>
              </div>
            ) : (
              <div className={`flex items-center space-x-4 justify-center h-[270px] rounded-lg ${preview.fileuri && preview.fileuri.match(/\.pdf$/i) ? 'bg-red-100' : preview.fileuri && preview.fileuri.match(/\.(xlsx|xls)$/i) ? 'bg-green-100' : preview.fileuri && preview.fileuri.match(/\.(docx|doc)$/i) ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <a href={preview.fileuri} target="_blank" rel="noopener noreferrer">
                  <div className="flex-shrink-0">
                    {getFileIcon(getFileTypeFromUrl(preview.fileuri || ''))}
                  </div>
                </a>
              </div>
            )}
            
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div
          className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer group h-[270px]"
          onClick={handleSelectFile}
        >
          {uploading ? (
            <div className="space-y-4 flex items-center justify-center h-full">
              <div className="flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="text-gray-600 font-medium">Mengunggah file...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 flex flex-col items-center justify-center h-full">
              <div>
                <div className="mx-auto w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-gray-900 mb-2">
                    Pilih file untuk diunggah
                  </p>
                  <p className="text-[11px] text-gray-500 mb-4">
                    Klik untuk memilih gambar, PDF, Excel, atau dokumen Word
                  </p>
                  <div className="flex justify-center space-x-6 text-[11px] text-gray-400">
                    <div className="flex items-center space-x-1">
                      <IconGallery className="w-4 h-4" />
                      <span>Gambar</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <IconFile className="w-4 h-4" />
                      <span>PDF</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <IconBarChart className="w-4 h-4" />
                      <span>Excel</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <IconNotes className="w-4 h-4" />
                      <span>Word</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/*,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}

      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 text-center">
            {error}
          </p>
        </div>
      )}
    </div>
  )
}
