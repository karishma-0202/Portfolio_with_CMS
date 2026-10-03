import { useEffect, useState } from 'react'
import api from '../services/api'

function Dashboard() {
  const [stats, setStats] = useState({
    skills: 0,
    projects: 0,
    experiences: 0,
    resumes: 0,
    unreadMessages: 0,
    pendingFeedback: 0,
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/api/dashboard')
        setStats(response.data)
      } catch (error) {
        console.error(error)
        setError('Failed to load dashboard statistics')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <p className="text-gray-600">Loading dashboard...</p>
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-md">
        {error}
      </div>
    )
  }

  const cards = [
    {
      title: 'Skills',
      value: stats.skills,
    },
    {
      title: 'Projects',
      value: stats.projects,
    },
    {
      title: 'Experiences',
      value: stats.experiences,
    },
    {
      title: 'Resumes',
      value: stats.resumes,
    },
    {
      title: 'Unread Messages',
      value: stats.unreadMessages,
    },
    {
      title: 'Pending Feedback',
      value: stats.pendingFeedback,
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">
        Welcome to Portfolio CMS
      </h1>

      <p className="text-gray-600 mb-6">
        Manage your portfolio content from the sidebar.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-lg shadow p-6"
          >
            <h2 className="text-sm font-medium text-gray-500">
              {card.title}
            </h2>

            <p className="text-3xl font-bold mt-2">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard