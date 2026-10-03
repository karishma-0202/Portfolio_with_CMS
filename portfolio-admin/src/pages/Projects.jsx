import { useEffect, useState } from 'react'
import api from '../services/api'

function Projects() {
  const [projects, setProjects] = useState([])

  const [name, setName] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [description, setDescription] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [liveUrl, setLiveUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [displayOrder, setDisplayOrder] = useState('')

  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const fetchProjects = async () => {
    try {
      const response = await api.get('/api/projects')
      setProjects(response.data)
    } catch (error) {
      setError('Failed to load projects')
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const clearForm = () => {
    setName('')
    setShortDescription('')
    setDescription('')
    setTechnologies('')
    setGithubUrl('')
    setLiveUrl('')
    setImageUrl('')
    setDisplayOrder('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setMessage('')

    try {
      await api.post('/api/projects', {
        name,
        shortDescription,
        description,
        technologies,
        githubUrl,
        liveUrl,
        imageUrl,
        displayOrder: Number(displayOrder),
      })

      clearForm()
      setMessage('Project added successfully')
      fetchProjects()
    } catch (error) {
      setError('Failed to add project')
    }
  }

  const handleEdit = async (project) => {
    const updatedName = window.prompt(
      'Project name:',
      project.name
    )
    if (updatedName === null) return

    const updatedShortDescription = window.prompt(
      'Short description:',
      project.shortDescription || ''
    )
    if (updatedShortDescription === null) return

    const updatedDescription = window.prompt(
      'Description:',
      project.description || ''
    )
    if (updatedDescription === null) return

    const updatedTechnologies = window.prompt(
      'Technologies:',
      project.technologies || ''
    )
    if (updatedTechnologies === null) return

    const updatedGithubUrl = window.prompt(
      'GitHub URL:',
      project.githubUrl || ''
    )
    if (updatedGithubUrl === null) return

    const updatedLiveUrl = window.prompt(
      'Live URL:',
      project.liveUrl || ''
    )
    if (updatedLiveUrl === null) return

    const updatedImageUrl = window.prompt(
      'Image URL:',
      project.imageUrl || ''
    )
    if (updatedImageUrl === null) return

    const updatedOrder = window.prompt(
      'Display order:',
      project.displayOrder
    )
    if (updatedOrder === null) return

    try {
      setEditingId(project.id)
      setError('')
      setMessage('')

      await api.put(`/api/projects/${project.id}`, {
        name: updatedName,
        shortDescription: updatedShortDescription,
        description: updatedDescription,
        technologies: updatedTechnologies,
        githubUrl: updatedGithubUrl,
        liveUrl: updatedLiveUrl,
        imageUrl: updatedImageUrl,
        displayOrder: Number(updatedOrder),
      })

      setMessage('Project updated successfully')
      fetchProjects()
    } catch (error) {
      setError('Failed to update project')
    } finally {
      setEditingId(null)
    }
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this project?'
    )

    if (!confirmed) return

    try {
      setError('')
      setMessage('')

      await api.delete(`/api/projects/${id}`)

      setMessage('Project deleted successfully')
      fetchProjects()
    } catch (error) {
      setError('Failed to delete project')
    }
  }

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">
        Projects
      </h1>

      {message && (
        <p className="text-green-600 mb-4">
          {message}
        </p>
      )}

      {error && (
        <p className="text-red-600 mb-4">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow mb-8"
      >
        <h2 className="text-lg font-semibold mb-4">
          Add Project
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-2">
              Project Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Project name"
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Short Description
            </label>

            <textarea
              value={shortDescription}
              onChange={(event) =>
                setShortDescription(event.target.value)
              }
              placeholder="Short project description"
              rows="3"
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Detailed project description"
              rows="5"
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Technologies
            </label>

            <input
              type="text"
              value={technologies}
              onChange={(event) =>
                setTechnologies(event.target.value)
              }
              placeholder="React.js, Spring Boot, MySQL"
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block font-medium mb-2">
                GitHub URL
              </label>

              <input
                type="text"
                value={githubUrl}
                onChange={(event) =>
                  setGithubUrl(event.target.value)
                }
                placeholder="https://github.com/..."
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Live URL
              </label>

              <input
                type="text"
                value={liveUrl}
                onChange={(event) =>
                  setLiveUrl(event.target.value)
                }
                placeholder="https://..."
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">
              Image URL
            </label>

            <input
              type="text"
              value={imageUrl}
              onChange={(event) =>
                setImageUrl(event.target.value)
              }
              placeholder="Project image URL"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Display Order
            </label>

            <input
              type="number"
              value={displayOrder}
              onChange={(event) =>
                setDisplayOrder(event.target.value)
              }
              placeholder="1"
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
        >
          Add Project
        </button>
      </form>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">
            Existing Projects
          </h2>
        </div>

        {projects.length === 0 ? (
          <p className="p-6 text-gray-500">
            No projects found.
          </p>
        ) : (
          <div className="divide-y">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold">
                      {project.name}
                    </h3>

                    <p className="text-gray-700 mt-1">
                      {project.shortDescription}
                    </p>

                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">
                        Technologies:
                      </span>{' '}
                      {project.technologies}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Order: {project.displayOrder}
                    </p>
                  </div>

                  <div className="flex items-start gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleEdit(project)}
                      disabled={editingId === project.id}
                      className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 disabled:opacity-50"
                    >
                      {editingId === project.id
                        ? 'Saving...'
                        : 'Edit'}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(project.id)
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {(project.githubUrl || project.liveUrl) && (
                  <div className="flex gap-4 mt-4 text-sm">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        GitHub
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Projects