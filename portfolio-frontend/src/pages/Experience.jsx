import { useEffect, useState } from 'react'
import api from '../services/api'

function Experience() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadExperience = async () => {
      try {
        const response = await api.get('/api/experiences')
        const data = Array.isArray(response.data) ? response.data : []

        setExperiences(
          [...data].sort(
            (a, b) =>
              (a.displayOrder ?? 999) - (b.displayOrder ?? 999)
          )
        )
      } catch (error) {
        console.error('Failed to load experience:', error)
      } finally {
        setLoading(false)
      }
    }

    loadExperience()
  }, [])

  return (
    <main className="bg-slate-100">
      <section className="relative overflow-hidden bg-slate-950 px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-24">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-300">
            Experience
          </p>

          <h1 className="mt-4 text-4xl font-black sm:text-5xl lg:text-6xl">
            Where I’ve gained practical experience.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Internships and professional experiences represented
            directly from the portfolio CMS.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-100 via-white to-violet-50 px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-5xl">
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-56 animate-pulse rounded-3xl bg-slate-200"
                />
              ))}
            </div>
          ) : experiences.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <h2 className="text-2xl font-bold text-slate-900">
                Experience is being updated
              </h2>

              <p className="mt-3 text-slate-500">
                Experience entries added through the CMS will appear here.
              </p>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute bottom-0 left-5 top-0 hidden w-px bg-gradient-to-b from-violet-500 via-blue-400 to-transparent sm:block" />

              <div className="space-y-8">
                {experiences.map((experience, index) => {
                  const technologies = (experience.technologies || '')
                    .split(',')
                    .map((tech) => tech.trim())
                    .filter(Boolean)

                  const period = [
                    experience.startDate,
                    experience.endDate,
                  ]
                    .filter(Boolean)
                    .join(' - ')

                  return (
                    <article
                      key={experience.id}
                      className="relative sm:pl-14"
                    >
                      <div className="absolute left-0 top-8 hidden h-10 w-10 items-center justify-center rounded-full border-4 border-slate-100 bg-gradient-to-br from-violet-600 to-blue-600 text-xs font-black sm:flex">
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100">
                        <div className="h-1.5 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500" />

                        <div className="p-7 sm:p-9">
                          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                            <div>
                              <p className="text-sm font-bold uppercase tracking-wider text-violet-600">
                                {experience.organization}
                              </p>

                              <h2 className="mt-2 text-2xl font-black text-slate-900">
                                {experience.role}
                              </h2>
                            </div>

                            {period && (
                              <span className="w-fit rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
                                {period}
                              </span>
                            )}
                          </div>

                          {experience.description && (
                            <p className="mt-6 leading-8 text-slate-600">
                              {experience.description}
                            </p>
                          )}

                          {technologies.length > 0 && (
                            <div className="mt-6 flex flex-wrap gap-2">
                              {technologies.map((technology) => (
                                <span
                                  key={technology}
                                  className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700"
                                >
                                  {technology}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default Experience