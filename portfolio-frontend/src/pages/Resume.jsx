import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

function Resume() {
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)
  const [opening, setOpening] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get('/api/resumes')
      .then((response) => {
        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.content || []

        // Prefer an active local uploaded PDF.
        const localResume = data.find(
          (item) =>
            item.active === true &&
            typeof item.fileUrl === 'string' &&
            item.fileUrl.startsWith('/uploads/')
        )

        // Fallback to any local uploaded PDF.
        const fallbackLocalResume = data.find(
          (item) =>
            typeof item.fileUrl === 'string' &&
            item.fileUrl.startsWith('/uploads/')
        )

        // Final fallback to the first active resume.
        const activeResume = data.find(
          (item) => item.active === true
        )

        setResume(
          localResume ||
            fallbackLocalResume ||
            activeResume ||
            null
        )
      })
      .catch((error) => {
        console.error('Failed to load resume:', error)
        setError('Unable to load the resume right now.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const resumeUrl = resume?.fileUrl
    ? resume.fileUrl.startsWith('http')
      ? resume.fileUrl
      : `http://localhost:8080${resume.fileUrl}`
    : null

  const openResume = async () => {
    if (!resumeUrl) return

    setOpening(true)
    setError('')

    try {
      const response = await api.get(resumeUrl, {
        responseType: 'blob',
      })

      const blob = new Blob([response.data], {
        type: 'application/pdf',
      })

      const blobUrl = window.URL.createObjectURL(blob)

      window.open(blobUrl, '_blank', 'noopener,noreferrer')

      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl)
      }, 60000)
    } catch (error) {
      console.error('Failed to open resume:', error)
      setError(
        'Unable to open the resume. Please try downloading it instead.'
      )
    } finally {
      setOpening(false)
    }
  }

  const downloadResume = async () => {
    if (!resumeUrl) return

    setDownloading(true)
    setError('')

    try {
      const response = await api.get(resumeUrl, {
        responseType: 'blob',
      })

      const blob = new Blob([response.data], {
        type: 'application/pdf',
      })

      const blobUrl = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = blobUrl
      link.download =
        resume.fileName || 'Karishma-Shaik-Resume.pdf'

      document.body.appendChild(link)
      link.click()
      link.remove()

      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl)
      }, 1000)
    } catch (error) {
      console.error('Failed to download resume:', error)
      setError('Unable to download the resume right now.')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-semibold uppercase tracking-[0.2em] text-violet-600">
          My qualifications
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          Resume
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Explore my education, technical skills, internships,
          projects, certifications, and professional experience.
        </p>
      </div>

      {loading ? (
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-slate-500">
            Loading resume...
          </p>
        </div>
      ) : resumeUrl ? (
        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 p-8 text-white sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
              Available document
            </p>

            <h2 className="mt-3 text-2xl font-black sm:text-3xl">
              {resume.fileName || 'Karishma Shaik Resume'}
            </h2>

            <p className="mt-3 max-w-xl leading-7 text-slate-300">
              View my latest resume or download a PDF copy.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={openResume}
                disabled={opening || downloading}
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {opening ? 'Opening...' : 'View Resume ↗'}
              </button>

              <button
                type="button"
                onClick={downloadResume}
                disabled={opening || downloading}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-violet-400 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {downloading ? 'Downloading...' : 'Download PDF ↓'}
              </button>
            </div>

            {error && (
              <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-700">
                {error}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-slate-500">
            Resume will be available soon.
          </p>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          to="/contact"
          className="inline-flex font-semibold text-violet-600 transition hover:text-violet-800"
        >
          Contact Me →
        </Link>
      </div>
    </section>
  )
}

export default Resume