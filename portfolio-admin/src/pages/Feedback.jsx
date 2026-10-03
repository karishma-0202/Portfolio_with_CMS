import { useEffect, useState } from 'react'
import api from '../services/api'

function Feedback() {
  const [feedback, setFeedback] = useState([])
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const fetchFeedback = async () => {
    try {
      const response = await api.get('/api/feedback')
      setFeedback(response.data)
    } catch (error) {
      setError('Failed to load feedback')
    }
  }

  useEffect(() => {
    fetchFeedback()
  }, [])

  const handleApprove = async (id) => {
    try {
      setError('')
      setMessage('')

      await api.put(`/api/feedback/${id}/approve`)

      setMessage('Feedback approved successfully')
      fetchFeedback()
    } catch (error) {
      setError('Failed to approve feedback')
    }
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this feedback?'
    )

    if (!confirmed) return

    try {
      setError('')
      setMessage('')

      await api.delete(`/api/feedback/${id}`)

      setMessage('Feedback deleted successfully')
      fetchFeedback()
    } catch (error) {
      setError('Failed to delete feedback')
    }
  }

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">
        Feedback
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

      <div className="bg-white rounded-lg shadow">
        {feedback.length === 0 ? (
          <p className="p-6 text-gray-500">
            No feedback found.
          </p>
        ) : (
          <div className="divide-y">
            {feedback.map((item) => (
              <div
                key={item.id}
                className={`p-6 ${
                  item.approved
                    ? ''
                    : 'bg-yellow-50'
                }`}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row md:justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold">
                        {item.name}
                      </h2>

                      {item.email && (
                        <p className="text-sm text-gray-600">
                          {item.email}
                        </p>
                      )}
                    </div>

                    <span
                      className={`text-sm font-medium ${
                        item.approved
                          ? 'text-green-600'
                          : 'text-yellow-700'
                      }`}
                    >
                      {item.approved
                        ? 'Approved'
                        : 'Pending'}
                    </span>
                  </div>

                  {item.rating && (
                    <p className="text-sm">
                      Rating:{' '}
                      <span className="font-semibold">
                        {item.rating}/5
                      </span>
                    </p>
                  )}

                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="whitespace-pre-wrap">
                      {item.message}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    {!item.approved && (
                      <button
                        type="button"
                        onClick={() =>
                          handleApprove(item.id)
                        }
                        className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(item.id)
                      }
                      className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
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

export default Feedback