import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

const getProjectInitials = (name = '') => {
  if (name.trim().toLowerCase() === 'jobbuddy') {
    return 'JB'
  }

  const words = name.trim().split(/\s+/).filter(Boolean)

  if (words.length > 1) {
    return words
      .slice(0, 2)
      .map((word) => word[0])
      .join('')
      .toUpperCase()
  }

  return name.slice(0, 2).toUpperCase()
}

function Home() {
  const [about, setAbout] = useState(null)
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [aboutResponse, projectsResponse, skillsResponse] =
          await Promise.all([
            api.get('/api/about'),
            api.get('/api/projects'),
            api.get('/api/skills'),
          ])

        const aboutData = Array.isArray(aboutResponse.data)
          ? aboutResponse.data[0]
          : aboutResponse.data

        const projectData = Array.isArray(projectsResponse.data)
          ? projectsResponse.data
          : []

        const skillData = Array.isArray(skillsResponse.data)
          ? skillsResponse.data
          : []

        setAbout(aboutData || null)

        setProjects(
          [...projectData]
            .sort(
              (a, b) =>
                (a.displayOrder ?? 999) - (b.displayOrder ?? 999)
            )
            .slice(0, 3)
        )

        setSkills(
          [...skillData]
            .sort(
              (a, b) =>
                (a.displayOrder ?? 999) - (b.displayOrder ?? 999)
            )
            .slice(0, 8)
        )
      } catch (error) {
        console.error('Failed to load home data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadHomeData()
  }, [])

  const name = 'Karishma Shaik'
  const careerFocus =
    about?.careerFocus ||
    'Java Developer • Backend Developer • Software Engineer'
  const location = about?.location || 'India'

  const profileImageUrl = about?.profileImage
    ? about.profileImage.startsWith('http')
      ? about.profileImage
      : `http://localhost:8080${about.profileImage}`
    : null

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-10 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-violet-200 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Open to software engineering opportunities
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
              Hello, I’m
            </p>

            <h1 className="max-w-4xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              {name}

              <span className="mt-2 block bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {careerFocus.split('•')[0]?.trim() || 'Java Developer'}
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              {about?.bio ||
                'Building reliable backend systems, secure REST APIs and practical software solutions with Java and Spring Boot.'}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3.5 font-semibold transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/20"
              >
                Explore My Work
              </Link>

              <Link
                to="/contact"
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Let’s Connect
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400">
              <span>📍 {location}</span>
              <span>⚡ Java & Spring Boot</span>
              <span>☁️ AWS</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-r from-violet-600/30 to-blue-500/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 backdrop-blur-xl">
              <div className="rounded-[1.5rem] bg-gradient-to-br from-slate-900 to-slate-800 p-8">
                {profileImageUrl ? (
                  <img
                    src={profileImageUrl}
                    alt="Karishma Shaik"
                    className="mx-auto h-64 w-64 rounded-3xl object-cover shadow-2xl ring-1 ring-white/10"
                  />
                ) : (
                  <div className="mx-auto flex h-64 w-64 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500 text-7xl font-black shadow-2xl">
                    KS
                  </div>
                )}

                <div className="mt-7 text-center">
                  <p className="text-2xl font-bold">{name}</p>

                  <p className="mt-2 text-sm text-slate-400">
                    Backend-focused software engineer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-100 via-white to-violet-50 px-5 py-20 sm:px-8 lg:px-10">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-violet-100 bg-white/80 p-7 shadow-sm backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-wider text-violet-600">
                Focus
              </p>

              <h2 className="mt-3 text-2xl font-bold text-slate-900">
                Backend Engineering
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                Java, Spring Boot, REST APIs, authentication and
                database-driven applications.
              </p>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-white/80 p-7 shadow-sm backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Stack
              </p>

              <h2 className="mt-3 text-2xl font-bold text-slate-900">
                Modern Development
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                Combining backend technologies with React, MySQL,
                AWS and security fundamentals.
              </p>
            </div>

            <div className="rounded-3xl border border-cyan-100 bg-white/80 p-7 shadow-sm backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-600">
                Approach
              </p>

              <h2 className="mt-3 text-2xl font-bold text-slate-900">
                Learn • Build • Improve
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                Focused on solving practical problems and continuously
                improving engineering skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="bg-slate-950 px-5 py-20 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">
                Selected Work
              </p>

              <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                Projects built with purpose
              </h2>
            </div>

            <Link
              to="/projects"
              className="font-semibold text-violet-300 transition hover:text-white"
            >
              View all projects →
            </Link>
          </div>

          {loading ? (
            <div className="mt-10 h-48 animate-pulse rounded-3xl bg-white/10" />
          ) : projects.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-dashed border-white/20 bg-white/5 p-10 text-center text-slate-400">
              Projects will appear here as they are added through the CMS.
            </div>
          ) : (
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] transition duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/[0.09] hover:shadow-2xl hover:shadow-violet-950/30"
                >
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-gradient-to-br from-violet-700 via-blue-700 to-cyan-600">
                      <span className="text-6xl font-black text-white">
                        {getProjectInitials(project.name)}
                      </span>
                    </div>
                  )}

                  <div className="p-7">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
                      Featured Project
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                      {project.name}
                    </h3>

                    <p className="mt-3 leading-7 text-slate-300">
                      {project.shortDescription || project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {(project.technologies || '')
                        .split(',')
                        .map((tech) => tech.trim())
                        .filter(Boolean)
                        .slice(0, 5)
                        .map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SKILLS */}
      <section className="bg-gradient-to-br from-violet-50 via-white to-blue-50 px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                Core Skills
              </p>

              <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
                Technologies I work with
              </h2>
            </div>

            <Link
              to="/skills"
              className="font-semibold text-violet-700 hover:text-violet-900"
            >
              See full skill set →
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <span
                  key={skill.id}
                  className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300 hover:text-violet-700"
                >
                  {skill.name}
                </span>
              ))
            ) : (
              <p className="text-slate-500">
                Skills will appear here as they are added through the CMS.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home