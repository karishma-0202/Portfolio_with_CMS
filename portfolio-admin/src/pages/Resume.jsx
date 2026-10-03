import { useEffect, useState } from 'react'
import api from '../services/api'

function Resume() {
  const [resumes, setResumes] = useState([])
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [downloadingId, setDownloadingId] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchResumes = async () => {
    try {
      const response = await api.get('/api/resumes')
      setResumes(response.data)
    } catch (error) {
      console.error(error)
      setError('Failed to load resumes')
    }
  }

  useEffect(() => {
    fetchResumes()
  }, [])

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]

    setError('')
    setSuccess('')

    if (!selectedFile) {
      setFile(null)
      return
    }

    if (selectedFile.type !== 'application/pdf') {
      setFile(null)
      setError('Only PDF files are allowed')
      event.target.value = ''
      return
    }

    setFile(selectedFile)
  }

  const handleUpload = async (event) => {
    event.preventDefault()

    if (!file) {
      setError('Please select a PDF file')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      await api.post('/api/resumes', formData)

      setFile(null)
      event.target.reset()

      await fetchResumes()

      setSuccess('Resume uploaded successfully and set as active.')
    } catch (error) {
      console.error(error)

      setError(
        error.response?.data?.message ||
        'Failed to upload resume'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleToggleActive = async (resume) => {
    setUpdatingId(resume.id)
    setError('')
    setSuccess('')

    try {
      await api.put(`/api/resumes/${resume.id}`, {
        id: resume.id,
        fileName: resume.fileName,
        fileUrl: resume.fileUrl,
        active: !resume.active,
      })

      await fetchResumes()

      if (resume.active) {
        setSuccess(`${resume.fileName} is now inactive.`)
      } else {
        setSuccess(
          `${resume.fileName} is now active. Other resumes were deactivated.`
        )
      }
    } catch (error) {
      console.error(error)

      setError(
        error.response?.data?.message ||
        'Failed to update resume status'
      )
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDownload = async (resume) => {
    setDownloadingId(resume.id)
    setError('')
    setSuccess('')

    try {
      const response = await api.get(resume.fileUrl, {
        responseType: 'blob',
      })

      const blob = new Blob(
        [response.data],
        { type: 'application/pdf' }
      )

      const downloadUrl = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = resume.fileName || 'resume.pdf'

      document.body.appendChild(link)
      link.click()
      link.remove()

      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error(error)
      setError('Failed to download resume')
    } finally {
      setDownloadingId(null)
    }
  }

  const handleDelete = async (resume) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${resume.fileName}"?`
    )

    if (!confirmed) {
      return
    }

    setError('')
    setSuccess('')

    try {
      await api.delete(`/api/resumes/${resume.id}`)
      await fetchResumes()

      setSuccess('Resume deleted successfully.')
    } catch (error) {
      console.error(error)
      setError('Failed to delete resume')
    }
  }

  const getFileUrl = (fileUrl) => {
    if (!fileUrl) {
      return ''
    }

    if (fileUrl.startsWith('http')) {
      return fileUrl
    }

    return `http://localhost:8080${fileUrl}`
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">
        Resume
      </h1>

      <p className="text-gray-600 mb-6">
        Upload and manage your resume PDF.
      </p>

      {error && (
        <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6">
          {success}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">
          Upload New Resume
        </h2>

        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={handleFileChange}
            className="block w-full border rounded-md p-2 mb-4"
          />

          {file && (
            <p className="text-sm text-gray-600 mb-4">
              Selected: {file.name}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-5 py-2 rounded-md"
          >
            {loading ? 'Uploading...' : 'Upload Resume'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">
            Uploaded Resumes
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Only one resume should be active at a time. The active resume
            is the one used by the public portfolio.
          </p>
        </div>

        {resumes.length === 0 ? (
          <p className="p-6 text-gray-500">
            No resumes uploaded yet.
          </p>
        ) : (
          <div className="divide-y">
            {resumes.map((resume) => {
              const fileUrl = getFileUrl(resume.fileUrl)
              const isUpdating = updatingId === resume.id

              return (
                <div
                  key={resume.id}
                  className="p-6 flex flex-col gap-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-medium break-all">
                          {resume.fileName}
                        </h3>

                        {resume.active ? (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                            Inactive
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-500 mt-2">
                        {resume.active
                          ? 'This resume is currently used by the public portfolio.'
                          : 'This resume is stored but not currently used publicly.'}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md"
                      >
                        View
                      </a>

                      <button
                        type="button"
                        onClick={() => handleDownload(resume)}
                        disabled={downloadingId === resume.id}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white px-4 py-2 rounded-md"
                      >
                        {downloadingId === resume.id
                          ? 'Downloading...'
                          : 'Download'}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleActive(resume)}
                        disabled={isUpdating}
                        className={
                          resume.active
                            ? 'bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white px-4 py-2 rounded-md'
                            : 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 py-2 rounded-md'
                        }
                      >
                        {isUpdating
                          ? 'Updating...'
                          : resume.active
                            ? 'Deactivate'
                            : 'Activate'}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(resume)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {resume.active && (
                    <div className="rounded-md bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                      ✓ This is the resume currently presented by the public portfolio.
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Resume