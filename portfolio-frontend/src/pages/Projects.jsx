// import { useEffect, useState } from 'react'
// import api from '../services/api'

// const getProjectInitials = (name = '') => {
//   if (name.trim().toLowerCase() === 'jobbuddy') {
//     return 'JB'
//   }

//   const words = name.trim().split(/\s+/).filter(Boolean)

//   if (words.length > 1) {
//     return words
//       .slice(0, 2)
//       .map((word) => word[0])
//       .join('')
//       .toUpperCase()
//   }

//   return name.slice(0, 2).toUpperCase()
// }

// function Projects() {
//   const [projects, setProjects] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const loadProjects = async () => {
//       try {
//         const response = await api.get('/api/projects')
//         const data = Array.isArray(response.data) ? response.data : []

//         setProjects(
//           [...data].sort(
//             (a, b) =>
//               (a.displayOrder ?? 999) - (b.displayOrder ?? 999)
//           )
//         )
//       } catch (error) {
//         console.error('Failed to load projects:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadProjects()
//   }, [])

//   return (
//     <main className="bg-slate-950 text-white">
//       <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
//         <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

//         <div className="relative mx-auto max-w-7xl">
//           <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-300">
//             Selected Work
//           </p>

//           <h1 className="mt-4 max-w-5xl text-4xl font-black sm:text-5xl lg:text-6xl">
//             Projects that turn ideas into software.
//           </h1>

//           <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
//             Practical applications built across backend development,
//             web technologies, databases and security.
//           </p>
//         </div>
//       </section>

//       <section className="bg-gradient-to-b from-slate-900 to-slate-950 px-5 py-12 sm:px-8 lg:px-10 lg:py-20">
//         <div className="mx-auto max-w-7xl">
//           {loading ? (
//             <div className="h-96 animate-pulse rounded-[2rem] bg-white/10" />
//           ) : projects.length === 0 ? (
//             <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-12 text-center">
//               <h2 className="text-2xl font-bold">
//                 No projects published yet
//               </h2>

//               <p className="mt-3 text-slate-400">
//                 Projects added through the CMS will appear here.
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-10">
//               {projects.map((project, index) => {
//                 const technologies = (project.technologies || '')
//                   .split(',')
//                   .map((tech) => tech.trim())
//                   .filter(Boolean)

//                 return (
//                   <article
//                     key={project.id}
//                     className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] shadow-2xl shadow-black/20 transition duration-300 hover:border-violet-400/30"
//                   >
//                     <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
//                       <div className="relative min-h-80 overflow-hidden bg-slate-950">
//                         {project.imageUrl ? (
//                           <img
//                             src={project.imageUrl}
//                             alt={project.name}
//                             className="h-full min-h-80 w-full object-cover transition duration-500 group-hover:scale-105"
//                           />
//                         ) : (
//                           <div className="relative flex h-full min-h-80 items-center justify-center overflow-hidden bg-gradient-to-br from-violet-700 via-blue-700 to-cyan-600">
//                             <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

//                             <div className="relative text-center">
//                               <span className="block text-8xl font-black tracking-tight text-white">
//                                 {getProjectInitials(project.name)}
//                               </span>

//                               <span className="mt-2 block text-sm font-bold uppercase tracking-[0.3em] text-white/70">
//                                 {project.name}
//                               </span>
//                             </div>
//                           </div>
//                         )}

//                         <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur">
//                           Project {String(index + 1).padStart(2, '0')}
//                         </div>
//                       </div>

//                       <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
//                         <p className="text-sm font-bold uppercase tracking-wider text-violet-300">
//                           Featured Work
//                         </p>

//                         <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
//                           {project.name}
//                         </h2>

//                         {project.shortDescription && (
//                           <p className="mt-4 text-xl font-semibold leading-8 text-slate-200">
//                             {project.shortDescription}
//                           </p>
//                         )}

//                         {project.description && (
//                           <p className="mt-4 leading-8 text-slate-400">
//                             {project.description}
//                           </p>
//                         )}

//                         {technologies.length > 0 && (
//                           <div className="mt-7">
//                             <p className="mb-3 text-sm font-bold text-slate-300">
//                               Technologies
//                             </p>

//                             <div className="flex flex-wrap gap-2">
//                               {technologies.map((technology) => (
//                                 <span
//                                   key={technology}
//                                   className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300"
//                                 >
//                                   {technology}
//                                 </span>
//                               ))}
//                             </div>
//                           </div>
//                         )}

//                         <div className="mt-8 flex flex-wrap gap-3">
//                           {project.githubUrl && (
//                             <a
//                               href={project.githubUrl}
//                               target="_blank"
//                               rel="noreferrer"
//                               className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-200"
//                             >
//                               View GitHub ↗
//                             </a>
//                           )}

//                           {project.liveUrl && (
//                             <a
//                               href={project.liveUrl}
//                               target="_blank"
//                               rel="noreferrer"
//                               className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-violet-400 hover:text-violet-300"
//                             >
//                               Live Demo ↗
//                             </a>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </article>
//                 )
//               })}
//             </div>
//           )}
//         </div>
//       </section>
//     </main>
//   )
// }

// export default Projects
import { useEffect, useState } from 'react'
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

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await api.get('/api/projects')
        const data = Array.isArray(response.data) ? response.data : []

        setProjects(
          [...data].sort(
            (a, b) =>
              (a.displayOrder ?? 999) - (b.displayOrder ?? 999)
          )
        )
      } catch (error) {
        console.error('Failed to load projects:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  return (
    <main className="bg-slate-950 text-white">
      {/* Hero - unchanged */}
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-300">
            Selected Work
          </p>

          <h1 className="mt-4 max-w-5xl text-4xl font-black sm:text-5xl lg:text-6xl">
            Projects that turn ideas into software.
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Practical applications built across backend development,
            web technologies, databases and security.
          </p>
        </div>
      </section>

      {/* Middle section - changed to white/light only */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-violet-50 px-5 py-12 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="h-96 animate-pulse rounded-[2rem] bg-slate-200" />
          ) : projects.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <h2 className="text-2xl font-bold text-slate-900">
                No projects published yet
              </h2>

              <p className="mt-3 text-slate-500">
                Projects added through the CMS will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {projects.map((project, index) => {
                const technologies = (project.technologies || '')
                  .split(',')
                  .map((tech) => tech.trim())
                  .filter(Boolean)

                return (
                  <article
                    key={project.id}
                    className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/50 transition duration-300 hover:border-violet-200 hover:shadow-2xl"
                  >
                    <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                      <div className="relative min-h-80 overflow-hidden bg-slate-950">
                        {project.imageUrl ? (
                          <img
                            src={project.imageUrl}
                            alt={project.name}
                            className="h-full min-h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="relative flex h-full min-h-80 items-center justify-center overflow-hidden bg-gradient-to-br from-violet-700 via-blue-700 to-cyan-600">
                            <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

                            <div className="relative text-center">
                              <span className="block text-8xl font-black tracking-tight text-white">
                                {getProjectInitials(project.name)}
                              </span>

                              <span className="mt-2 block text-sm font-bold uppercase tracking-[0.3em] text-white/70">
                                {project.name}
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur">
                          Project {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>

                      <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                        <p className="text-sm font-bold uppercase tracking-wider text-violet-600">
                          Featured Work
                        </p>

                        <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
                          {project.name}
                        </h2>

                        {project.shortDescription && (
                          <p className="mt-4 text-xl font-semibold leading-8 text-slate-700">
                            {project.shortDescription}
                          </p>
                        )}

                        {project.description && (
                          <p className="mt-4 leading-8 text-slate-600">
                            {project.description}
                          </p>
                        )}

                        {technologies.length > 0 && (
                          <div className="mt-7">
                            <p className="mb-3 text-sm font-bold text-slate-700">
                              Technologies
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {technologies.map((technology) => (
                                <span
                                  key={technology}
                                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600"
                                >
                                  {technology}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="mt-8 flex flex-wrap gap-3">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                            >
                              View GitHub ↗
                            </a>
                          )}

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-violet-400 hover:text-violet-700"
                            >
                              Live Demo ↗
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default Projects