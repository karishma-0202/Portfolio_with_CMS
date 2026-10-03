import { useEffect, useState } from 'react'
import api from '../services/api'

function About() {
  const [about, setAbout] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAbout = async () => {
      try {
        const response = await api.get('/api/about')

        const data = Array.isArray(response.data)
          ? response.data[0]
          : response.data

        setAbout(data || null)
      } catch (error) {
        console.error('Failed to load about data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadAbout()
  }, [])

  const profileImageUrl = about?.profileImage
    ? about.profileImage.startsWith('http')
      ? about.profileImage
     // : `http://localhost:8080${about.profileImage}`
      : `https://portfoliowithcms-production.up.railway.app${about.profileImage}`
    : null

  if (loading) {
    return (
      <main className="min-h-[70vh] bg-slate-100 px-5 py-20">
        <div className="mx-auto max-w-6xl animate-pulse">
          <div className="h-12 w-64 rounded bg-slate-200" />
          <div className="mt-6 h-32 rounded-3xl bg-slate-200" />
        </div>
      </main>
    )
  }

  return (
    <main className="bg-slate-100">
      <section className="relative overflow-hidden bg-slate-950 px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-24">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-300">
            About Me
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-black sm:text-5xl lg:text-6xl">
            Building software with a backend-first mindset.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            A closer look at my background, education and career direction.
          </p>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="rounded-[2rem] bg-gradient-to-br from-violet-700 via-blue-700 to-slate-950 p-8 text-white shadow-xl shadow-violet-200">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="Karishma Shaik"
                className="mx-auto h-64 w-64 rounded-3xl object-cover ring-1 ring-white/20"
              />
            ) : (
              <div className="mx-auto flex h-64 w-64 items-center justify-center rounded-3xl border border-white/10 bg-white/10 text-7xl font-black">
                KS
              </div>
            )}

            <div className="mt-8">
              <p className="text-2xl font-bold">Karishma Shaik</p>

              <p className="mt-2 text-violet-100">
                {about?.careerFocus || 'Software Engineering'}
              </p>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-sm uppercase tracking-wider text-violet-200">
                Location
              </p>

              <p className="mt-2 font-semibold">
                {about?.location || 'India'}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-wider text-violet-600">
                Bio
              </p>

              <p className="mt-4 text-lg leading-8 text-slate-600">
                {about?.bio ||
                  'My professional profile is being updated. More details about my background and engineering journey will appear here soon.'}
              </p>
            </article>

            <div className="grid gap-6 sm:grid-cols-2">
              <article className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-7">
                <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                  Education
                </p>

                <p className="mt-4 leading-7 text-slate-700">
                  {about?.education ||
                    'Education details will be updated soon.'}
                </p>
              </article>

              <article className="rounded-[2rem] border border-cyan-100 bg-gradient-to-br from-cyan-50 to-white p-7">
                <p className="text-sm font-bold uppercase tracking-wider text-cyan-600">
                  Career Direction
                </p>

                <p className="mt-4 leading-7 text-slate-700">
                  {about?.careerFocus ||
                    'Java development, backend engineering and software development.'}
                </p>
              </article>
            </div>

            <article className="rounded-[2rem] bg-slate-950 p-8 text-white">
              <p className="text-sm font-bold uppercase tracking-wider text-violet-300">
                Engineering Mindset
              </p>

              <p className="mt-4 text-xl font-semibold leading-8 text-slate-200">
                Building practical solutions with clean architecture,
                secure APIs, databases and continuous learning.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About