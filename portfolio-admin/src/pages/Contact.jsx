import { useEffect, useState } from 'react'
import api from '../services/api'

function Contact() {
  const [messages, setMessages] = useState([])
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const fetchMessages = async () => {
    try {
      const response = await api.get('/api/contact')
      setMessages(response.data)
    } catch (error) {
      setError('Failed to load contact messages')
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleMarkRead = async (id) => {
    try {
      setError('')
      setMessage('')

      await api.put(`/api/contact/${id}/read`)

      setMessage('Message marked as read')
      fetchMessages()
    } catch (error) {
      setError('Failed to mark message as read')
    }
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this message?'
    )

    if (!confirmed) return

    try {
      setError('')
      setMessage('')

      await api.delete(`/api/contact/${id}`)

      setMessage('Message deleted successfully')
      fetchMessages()
    } catch (error) {
      setError('Failed to delete message')
    }
  }

  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">
        Contact Messages
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
        {messages.length === 0 ? (
          <p className="p-6 text-gray-500">
            No contact messages found.
          </p>
        ) : (
          <div className="divide-y">
            {messages.map((contact) => (
              <div
                key={contact.id}
                className={`p-6 ${
                  contact.read ? '' : 'bg-blue-50'
                }`}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row md:justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold">
                        {contact.subject}
                      </h2>

                      <p className="text-sm text-gray-600 mt-1">
                        From: {contact.name}
                      </p>

                      <p className="text-sm text-gray-600">
                        Email: {contact.email}
                      </p>
                    </div>

                    <span
                      className={`text-sm font-medium ${
                        contact.read
                          ? 'text-gray-500'
                          : 'text-blue-600'
                      }`}
                    >
                      {contact.read
                        ? 'Read'
                        : 'Unread'}
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="whitespace-pre-wrap">
                      {contact.message}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    {!contact.read && (
                      <button
                        type="button"
                        onClick={() =>
                          handleMarkRead(contact.id)
                        }
                        className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                      >
                        Mark as Read
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(contact.id)
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

export default Contact