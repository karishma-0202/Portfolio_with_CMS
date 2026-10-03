import { useEffect, useMemo, useState } from 'react'
import api from '../services/api'

function Skills() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const response = await api.get('/api/skills')
        const data = Array.isArray(response.data) ? response.data : []

        setSkills(
          [...data].sort(
            (a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999)
          )
        )
      } catch (error) {
        console.error('Failed to load skills:', error)
      } finally {
        setLoading(false)
      }
    }

    loadSkills()
  }, [])

  const groupedSkills = useMemo(() => {
    return skills.reduce((groups, skill) => {
      const category = skill.category || 'Other'

      if (!groups[category]) {
        groups[category] = []
      }

      groups[category].push(skill)

      return groups
    }, {})
  }, [skills])

  return (
    <main className="bg-slate-950 text-white">
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-300">
            Technical Skills
          </p>

          <h1 className="mt-4 text-4xl font-black sm:text-5xl lg:text-6xl">
            Tools and technologies.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            A structured view of the technologies I use to build,
            secure and improve software applications.
          </p>
        </div>
      </section>

      {/* Middle section changed to white/light only */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-violet-50 px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-48 animate-pulse rounded-3xl bg-slate-200"
                />
              ))}
            </div>
          ) : skills.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <h2 className="text-2xl font-bold text-slate-900">
                Skills are being updated
              </h2>

              <p className="mt-3 text-slate-500">
                Add skills from the admin CMS and they will appear here
                automatically.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {Object.entries(groupedSkills).map(
                ([category, categorySkills], index) => (
                  <article
                    key={category}
                    className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 font-black text-white">
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Skill Group
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900">
                          {category}
                        </h2>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      {categorySkills.map((skill) => (
                        <span
                          key={skill.id}
                          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </article>
                )
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default Skills