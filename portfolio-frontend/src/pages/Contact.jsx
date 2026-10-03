// import { useState } from 'react'
// import api from '../services/api'

// function Contact() {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: '',
//   })

//   const [submitting, setSubmitting] = useState(false)
//   const [success, setSuccess] = useState('')
//   const [error, setError] = useState('')

//   const handleChange = (event) => {
//     const { name, value } = event.target

//     setForm((current) => ({
//       ...current,
//       [name]: value,
//     }))
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault()

//     setSubmitting(true)
//     setSuccess('')
//     setError('')

//     try {
//       await api.post('/api/contact', form)

//       setSuccess(
//         'Your message has been sent successfully. Thank you for reaching out!'
//       )

//       setForm({
//         name: '',
//         email: '',
//         subject: '',
//         message: '',
//       })
//     } catch (err) {
//       console.error('Failed to send contact message:', err)
//       setError('Unable to send your message right now. Please try again.')
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   return (
//     <main className="bg-slate-950 text-white">
//       <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
//         <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

//         <div className="relative mx-auto max-w-6xl">
//           <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-300">
//             Contact
//           </p>

//           <h1 className="mt-4 max-w-4xl text-4xl font-black sm:text-5xl lg:text-6xl">
//             Let’s talk about software, opportunities or ideas.
//           </h1>

//           <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
//             Whether you’re a recruiter, developer, collaborator or simply
//             interested in my work, I’d be happy to hear from you.
//           </p>
//         </div>
//       </section>

//       <section className="bg-gradient-to-b from-slate-900 to-slate-950 px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
//         <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
//           <div className="space-y-5">
//             <div className="rounded-[2rem] bg-gradient-to-br from-violet-700 via-blue-700 to-cyan-600 p-8 shadow-2xl shadow-violet-950/30">
//               <p className="text-sm font-bold uppercase tracking-wider text-violet-100">
//                 Available for
//               </p>

//               <h2 className="mt-3 text-3xl font-black">
//                 Software Engineering Opportunities
//               </h2>

//               <p className="mt-4 leading-7 text-violet-100">
//                 Interested in Java development, backend engineering and
//                 software development roles.
//               </p>
//             </div>

//             <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-7">
//               <p className="text-sm font-bold uppercase tracking-wider text-slate-500">
//                 Email
//               </p>

//               <a
//                 href="mailto:karishmashaik0202@gmail.com"
//                 className="mt-2 block break-all text-lg font-semibold text-white transition hover:text-violet-300"
//               >
//                 karishmashaik0202@gmail.com
//               </a>
//             </div>

//             <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-7">
//               <p className="text-sm font-bold uppercase tracking-wider text-slate-500">
//                 Profiles
//               </p>

//               <div className="mt-4 flex flex-wrap gap-3">
//                 <a
//                   href="https://github.com/karishma-0202?tab=repositories"
//                   target="_blank"
//                   rel="noreferrer"
//                   className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-200"
//                 >
//                   GitHub ↗
//                 </a>

//                 <a
//                   href="https://www.linkedin.com/in/karishma-shaik-847a4028a/"
//                   target="_blank"
//                   rel="noreferrer"
//                   className="rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:border-violet-400 hover:text-violet-300"
//                 >
//                   LinkedIn ↗
//                 </a>
//               </div>
//             </div>
//           </div>

//           <form
//             onSubmit={handleSubmit}
//             className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl backdrop-blur sm:p-9"
//           >
//             <h2 className="text-2xl font-black text-white">
//               Send a message
//             </h2>

//             <p className="mt-2 text-slate-400">
//               Your message will be securely stored in the portfolio CMS.
//             </p>

//             <div className="mt-7 grid gap-5 sm:grid-cols-2">
//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-slate-300">
//                   Name
//                 </label>

//                 <input
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-semibold text-slate-300">
//                   Email
//                 </label>

//                 <input
//                   type="email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
//                 />
//               </div>
//             </div>

//             <div className="mt-5">
//               <label className="mb-2 block text-sm font-semibold text-slate-300">
//                 Subject
//               </label>

//               <input
//                 name="subject"
//                 value={form.subject}
//                 onChange={handleChange}
//                 required
//                 className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
//               />
//             </div>

//             <div className="mt-5">
//               <label className="mb-2 block text-sm font-semibold text-slate-300">
//                 Message
//               </label>

//               <textarea
//                 name="message"
//                 value={form.message}
//                 onChange={handleChange}
//                 required
//                 rows="7"
//                 className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
//               />
//             </div>

//             {success && (
//               <div className="mt-5 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300">
//                 {success}
//               </div>
//             )}

//             {error && (
//               <div className="mt-5 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300">
//                 {error}
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={submitting}
//               className="mt-6 w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-900/30 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {submitting ? 'Sending...' : 'Send Message'}
//             </button>
//           </form>
//         </div>
//       </section>
//     </main>
//   )
// }

// export default Contact  
import { useState } from 'react'
import api from '../services/api'

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

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
      await api.post('/api/contact', form)

      setSuccess(
        'Your message has been sent successfully. I’ll get back to you as soon as possible.'
      )

      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    } catch (err) {
      console.error('Failed to send contact message:', err)

      setError(
        err.response?.data?.message ||
          'Unable to send your message. Please try again.'
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
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-violet-400/30 bg-violet-400/10 px-4 py-2 text-sm font-semibold text-violet-200">
              Get In Touch
            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Let’s build something
              <span className="block bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                meaningful together.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Have a project idea, an opportunity, or simply want to connect?
              Send me a message and I’ll be happy to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact content */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-violet-50 px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Contact information */}
            <div>
              <div className="mb-7">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
                  Contact details
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                  Start a conversation
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  Whether you’re a recruiter, developer, collaborator, or
                  someone interested in my work, I’d love to connect.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:karishmashaik0202@gmail.com"
                  className="group flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-lg text-violet-700">
                    @
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Email
                    </p>

                    <p className="mt-1 break-all font-semibold text-slate-800 group-hover:text-violet-700">
                      karishmashaik0202@gmail.com
                    </p>
                  </div>

                  <span className="ml-auto text-slate-400 transition group-hover:translate-x-1 group-hover:text-violet-600">
                    →
                  </span>
                </a>

                <a
                  href="https://www.linkedin.com/in/karishma-shaik-847a4028a/"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-lg font-black text-blue-700">
                    in
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      LinkedIn
                    </p>

                    <p className="mt-1 font-semibold text-slate-800 group-hover:text-blue-700">
                      Connect with me
                    </p>
                  </div>

                  <span className="ml-auto text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600">
                    →
                  </span>
                </a>

                <a
                  href="https://github.com/karishma-0202?tab=repositories"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-lg font-black text-slate-800">
                    GH
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      GitHub
                    </p>

                    <p className="mt-1 font-semibold text-slate-800 group-hover:text-slate-950">
                      Explore my repositories
                    </p>
                  </div>

                  <span className="ml-auto text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-800">
                    →
                  </span>
                </a>
              </div>

              <div className="mt-6 rounded-3xl bg-slate-950 p-6 text-white shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-violet-300">
                    ✦
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Open to software opportunities
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Interested in Java backend development, Spring Boot,
                      REST APIs, databases, and software engineering roles.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
                  Send a message
                </p>

                <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                  I’d love to hear from you.
                </h2>

                <p className="mt-3 leading-7 text-slate-600">
                  Fill out the form below and your message will be sent
                  directly to my portfolio inbox.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Name
                    </label>

                    <input
                      id="contact-name"
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
                      htmlFor="contact-email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email
                    </label>

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Subject
                  </label>

                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="What would you like to discuss?"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Message
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows="7"
                    placeholder="Write your message here..."
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
                  className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-4 font-bold text-white shadow-lg shadow-violet-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact