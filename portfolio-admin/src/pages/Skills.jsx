import { useEffect, useState } from 'react'
import api from '../services/api'

function Skills() {
  const [skills, setSkills] = useState([])
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [displayOrder, setDisplayOrder] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [editingId, setEditingId] = useState(null)

  const fetchSkills = async () => {
    try {
      const response = await api.get('/api/skills')
      setSkills(response.data)
    } catch (error) {
      setError('Failed to load skills')
    }
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setMessage('')

    try {
      await api.post('/api/skills', {
        name,
        category,
        displayOrder: Number(displayOrder),
      })

      setName('')
      setCategory('')
      setDisplayOrder('')

      setMessage('Skill added successfully')

      fetchSkills()
    } catch (error) {
      setError('Failed to add skill')
    }
  }
  const handleEdit = async (skill) => {
  const updatedName = window.prompt('Skill name:', skill.name)

  if (updatedName === null) {
    return
  }

  const updatedCategory = window.prompt(
    'Category:',
    skill.category
  )

  if (updatedCategory === null) {
    return
  }

  const updatedOrder = window.prompt(
    'Display order:',
    skill.displayOrder
  )

  if (updatedOrder === null) {
    return
  }

  try {
    setEditingId(skill.id)
    setError('')
    setMessage('')

    await api.put(`/api/skills/${skill.id}`, {
      name: updatedName,
      category: updatedCategory,
      displayOrder: Number(updatedOrder),
    })

    setMessage('Skill updated successfully')
    fetchSkills()
  } catch (error) {
    setError('Failed to update skill')
  } finally {
    setEditingId(null)
  }
}
const handleDelete = async (id) => {
  const confirmed = window.confirm(
    'Are you sure you want to delete this skill?'
  )

  if (!confirmed) {
    return
  }

  try {
    setError('')
    setMessage('')

    await api.delete(`/api/skills/${id}`)

    setMessage('Skill deleted successfully')
    fetchSkills()
  } catch (error) {
    setError('Failed to delete skill')
  }
}

  return (
    <div className="max-w-4xl">

      <h1 className="text-2xl font-bold mb-6">
        Skills
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

      {/* Add Skill */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow mb-8"
      >
        <h2 className="text-lg font-semibold mb-4">
          Add Skill
        </h2>

        <div className="grid gap-4 md:grid-cols-3">

          <input
            type="text"
            placeholder="Skill name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="border rounded-md px-3 py-2"
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="border rounded-md px-3 py-2"
            required
          />

          <input
            type="number"
            placeholder="Display order"
            value={displayOrder}
            onChange={(event) => setDisplayOrder(event.target.value)}
            className="border rounded-md px-3 py-2"
            required
          />

        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
        >
          Add Skill
        </button>
      </form>

      {/* Skills List */}
      <div className="bg-white rounded-lg shadow">

        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">
            Existing Skills
          </h2>
        </div>

        {skills.length === 0 ? (
          <p className="p-6 text-gray-500">
            No skills found.
          </p>
        ) : (
          <div className="divide-y">

            {skills.map((skill) => (
              <div
                key={skill.id}
                className="p-6 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    {skill.name}
                  </p>

                  <p className="text-sm text-gray-600">
                    {skill.category}
                  </p>
                </div>

                <span className="text-sm text-gray-500">
                  Order: {skill.displayOrder}
                </span>
                 <button
                         type="button"
                        onClick={() => handleEdit(skill)}
                          disabled={editingId === skill.id}
                           className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 disabled:opacity-50"
                      >
                  {editingId === skill.id ? 'Saving...' : 'Edit'}
                  </button>
                  <button
                 type="button"
                onClick={() => handleDelete(skill.id)}
                 className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                 Delete
                  </button>
              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  )
}

export default Skills