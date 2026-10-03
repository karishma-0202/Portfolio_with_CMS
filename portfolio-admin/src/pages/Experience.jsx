import { useEffect, useState } from 'react'
import api from '../services/api'

function Experience() {
  const [experiences, setExperiences] = useState([])

  const [organization, setOrganization] = useState('')
  const [role, setRole] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [description, setDescription] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [displayOrder, setDisplayOrder] = useState('')

  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const fetchExperiences = async () => {
    try {
      const response = await api.get('/api/experiences')
      setExperiences(response.data)
    } catch (error) {
      setError('Failed to load experiences')
    }
  }

  useEffect(() => {
    fetchExperiences()
  }, [])

  const clearForm = () => {
    setOrganization('')
    setRole('')
    setStartDate('')
    setEndDate('')
    setDescription('')
    setTechnologies('')
    setDisplayOrder('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setMessage('')

    try {
      await api.post('/api/experiences', {
        organization,
        role,
        startDate,
        endDate,
        description,
        technologies,
        displayOrder: Number(displayOrder),
      })

      clearForm()
      setMessage('Experience added successfully')
      fetchExperiences()
    } catch (error) {
      setError('Failed to add experience')
    }
  }

  const handleEdit = async (experience) => {
    const updatedOrganization = window.prompt(
      'Organization:',
      experience.organization
    )
    if (updatedOrganization === null) return

    const updatedRole = window.prompt(
      'Role:',
      experience.role
    )
    if (updatedRole === null) return

    const updatedStartDate = window.prompt(
      'Start date:',
      experience.startDate || ''
    )
    if (updatedStartDate === null) return

    const updatedEndDate = window.prompt(
      'End date:',
      experience.endDate || ''
    )
    if (updatedEndDate === null) return

    const updatedDescription = window.prompt(
      'Description:',
      experience.description || ''
    )
    if (updatedDescription === null) return

    const updatedTechnologies = window.prompt(
      'Technologies:',
      experience.technologies || ''
    )
    if (updatedTechnologies === null) return

    const updatedOrder = window.prompt(
      'Display order:',
      experience.displayOrder
    )
    if (updatedOrder === null) return

    try {
      setEditingId(experience.id)
      setError('')
      setMessage('')

      await api.put(`/api/experiences/${experience.id}`, {
        organization: updatedOrganization,
        role: updatedRole,
        startDate: updatedStartDate,
        endDate: updatedEndDate,
        description: updatedDescription,
        technologies: updatedTechnologies,
        displayOrder: Number(updatedOrder),
      })

      setMessage('Experience updated successfully')
      fetchExperiences()
    } catch (error) {
      setError('Failed to update experience')
    } finally {
      setEditingId(null)
    }
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this experience?'
    )

    if (!confirmed) return

    try {
      setError('')
      setMessage('')

      await api.delete(`/api/experiences/${id}`)

      setMessage('Experience deleted successfully')
      fetchExperiences()
    } catch (error) {
      setError('Failed to delete experience')
    }
  }

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">
        Experience
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
          Add Experience
        </h2>

        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block font-medium mb-2">
                Organization
              </label>

              <input
                type="text"
                value={organization}
                onChange={(event) =>
                  setOrganization(event.target.value)
                }
                placeholder="Organization"
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Role
              </label>

              <input
                type="text"
                value={role}
                onChange={(event) =>
                  setRole(event.target.value)
                }
                placeholder="Role"
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block font-medium mb-2">
                Start Date
              </label>

              <input
                type="text"
                value={startDate}
                onChange={(event) =>
                  setStartDate(event.target.value)
                }
                placeholder="Dec 2023"
                className="w-full border rounded-md px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                End Date
              </label>

              <input
                type="text"
                value={endDate}
                onChange={(event) =>
                  setEndDate(event.target.value)
                }
                placeholder="Feb 2024 / Present"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
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
              placeholder="Experience description"
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
              placeholder="AWS Lambda, API Gateway, S3, DynamoDB"
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
          Add Experience
        </button>
      </form>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">
            Existing Experience
          </h2>
        </div>

        {experiences.length === 0 ? (
          <p className="p-6 text-gray-500">
            No experience found.
          </p>
        ) : (
          <div className="divide-y">
            {experiences.map((experience) => (
              <div
                key={experience.id}
                className="p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {experience.role}
                    </h3>

                    <p className="text-gray-700">
                      {experience.organization}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {experience.startDate} - {experience.endDate}
                    </p>

                    <p className="text-gray-700 mt-3">
                      {experience.description}
                    </p>

                    {experience.technologies && (
                      <p className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">
                          Technologies:
                        </span>{' '}
                        {experience.technologies}
                      </p>
                    )}

                    <p className="text-sm text-gray-500 mt-1">
                      Order: {experience.displayOrder}
                    </p>
                  </div>

                  <div className="flex items-start gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleEdit(experience)}
                      disabled={editingId === experience.id}
                      className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 disabled:opacity-50"
                    >
                      {editingId === experience.id
                        ? 'Saving...'
                        : 'Edit'}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(experience.id)
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Experience