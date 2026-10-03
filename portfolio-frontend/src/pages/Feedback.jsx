import { useEffect, useState } from 'react'
import api from '../services/api'

function Feedback() {
  const [feedback, setFeedback] = useState([])
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5,
  })

  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const loadFeedback = async () => {
    try {
      const response = await api.get('/api/feedback/public')

      // This endpoint already returns only approved feedback.
      setFeedback(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      console.error('Failed to load feedback:', err)
      setFeedback([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFeedback()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setSubmitting(true)
    setSuccess('')
    setError('')

    try {
      await api.post('/api/feedback', {
        name: form.name,
        email: form.email,
        message: form.message,
        rating: Number(form.rating),
      })

      setSuccess(
        'Thank you for your feedback! It will appear here after approval.'
      )

      setForm({
        name: '',
        email: '',
        message: '',
        rating: 5,
      })
    } catch (err) {
      console.error('Failed to submit feedback:', err)

      setError(
        err.response?.data?.message ||
          'Unable to submit your feedback. Please try again.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 px-5 pb-20 pt-16 sm:pt-20">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-2 text-sm font-semibold text-violet-200">
              Feedback
            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              What people say
              <span className="block bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                about my work.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              I value thoughtful feedback from people who interact with my
              projects, technical work, and portfolio.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-violet-50 px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Published feedback */}
            <div>
              <div className="mb-8">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
                  Published feedback
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                  Kind words from visitors
                </h2>

                <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                  Feedback shared by visitors and approved for public display.
                </p>
              </div>

              {loading ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                  <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-violet-600" />
                  <p className="mt-4 text-sm text-slate-500">
                    Loading feedback...
                  </p>
                </div>
              ) : feedback.length === 0 ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-2xl">
                    💬
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    No feedback yet
                  </h3>

                  <p className="mt-2 text-slate-600">
                    Be the first person to leave feedback.
                  </p>
                </div>
              ) : (
                <div className="grid gap-5">
                  {feedback.map((item) => (
                    <article
                      key={item.id}
                      className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl sm:p-7"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 text-lg font-black text-white shadow-md">
                            {item.name?.charAt(0)?.toUpperCase() || '?'}
                          </div>

                          <div>
                            <h3 className="font-bold text-slate-900">
                              {item.name}
                            </h3>

                            <p className="text-sm text-slate-500">
                              Portfolio visitor
                            </p>
                          </div>
                        </div>

                        <div className="rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-600">
                          {'★'.repeat(Number(item.rating || 0))}
                        </div>
                      </div>

                      <p className="mt-6 text-base leading-8 text-slate-600">
                        “{item.message}”
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Feedback form */}
            <div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
                    Leave feedback
                  </p>

                  <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                    Share your thoughts
                  </h2>

                  <p className="mt-3 leading-7 text-slate-600">
                    Your feedback helps me improve my projects and portfolio.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div>
                    <label
                      htmlFor="feedback-name"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Name
                    </label>

                    <input
                      id="feedback-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="feedback-email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email
                      <span className="ml-1 font-normal text-slate-400">
                        (optional)
                      </span>
                    </label>

                    <input
                      id="feedback-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="feedback-rating"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Rating
                    </label>

                    <select
                      id="feedback-rating"
                      name="rating"
                      value={form.rating}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                    >
                      <option value="5">★★★★★ — 5 / 5</option>
                      <option value="4">★★★★☆ — 4 / 5</option>
                      <option value="3">★★★☆☆ — 3 / 5</option>
                      <option value="2">★★☆☆☆ — 2 / 5</option>
                      <option value="1">★☆☆☆☆ — 1 / 5</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="feedback-message"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Message
                    </label>

                    <textarea
                      id="feedback-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Tell me what you think about the portfolio..."
                      className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                    />
                  </div>

                  {success && (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium leading-6 text-emerald-700">
                      {success}
                    </div>
                  )}

                  {error && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-700">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-violet-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? 'Submitting...' : 'Submit Feedback'}
                  </button>

                  <p className="text-center text-xs leading-5 text-slate-400">
                    Submitted feedback may be reviewed before appearing
                    publicly.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Feedback