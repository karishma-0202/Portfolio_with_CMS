import { useEffect, useRef, useState } from 'react'
import api from '../services/api'

function About() {
  const [about, setAbout] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  const [zoom, setZoom] = useState(1)
  const [positionX, setPositionX] = useState(50)
  const [positionY, setPositionY] = useState(50)

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const previewImageRef = useRef(null)

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await api.get('/api/about')
        setAbout(response.data)
      } catch (error) {
        setError('Failed to load About content')
      } finally {
        setLoading(false)
      }
    }

    fetchAbout()
  }, [])

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  const handleChange = (event) => {
    const { name, value } = event.target

    setAbout((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ]

    if (!allowedTypes.includes(file.type)) {
      setError('Please select a JPG, PNG, or WebP image')
      setSelectedImage(null)
      return
    }

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }

    const previewUrl = URL.createObjectURL(file)

    setSelectedImage(file)
    setImagePreview(previewUrl)

    setZoom(1)
    setPositionX(50)
    setPositionY(50)

    setMessage('')
    setError('')
  }

  const resetImageAdjustment = () => {
    setZoom(1)
    setPositionX(50)
    setPositionY(50)
  }

  const createAdjustedImage = () => {
    return new Promise((resolve, reject) => {
      const image = previewImageRef.current

      if (!image || !image.naturalWidth || !image.naturalHeight) {
        reject(new Error('Image is not ready'))
        return
      }

      const outputSize = 800

      const canvas = document.createElement('canvas')

      canvas.width = outputSize
      canvas.height = outputSize

      const context = canvas.getContext('2d')

      if (!context) {
        reject(new Error('Canvas is not supported'))
        return
      }

      const sourceWidth = image.naturalWidth
      const sourceHeight = image.naturalHeight

      /*
       * Make the image cover the complete square.
       *
       * This is important because it prevents black/empty
       * areas from appearing.
       */
      const baseScale = Math.max(
        outputSize / sourceWidth,
        outputSize / sourceHeight
      )

      const scaledWidth =
        sourceWidth * baseScale * zoom

      const scaledHeight =
        sourceHeight * baseScale * zoom

      /*
       * Calculate how much the image extends beyond
       * the square crop area.
       */
      const overflowX = scaledWidth - outputSize
      const overflowY = scaledHeight - outputSize

      /*
       * Position:
       * 0%   = left/top
       * 50%  = center
       * 100% = right/bottom
       */
      const drawX =
        -overflowX * (positionX / 100)

      const drawY =
        -overflowY * (positionY / 100)

      context.clearRect(
        0,
        0,
        outputSize,
        outputSize
      )

      context.drawImage(
        image,
        drawX,
        drawY,
        scaledWidth,
        scaledHeight
      )

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to create image'))
            return
          }

          const fileName =
            selectedImage?.name
              ?.replace(/\.[^/.]+$/, '')
              .replace(/[^a-zA-Z0-9-_]/g, '_') ||
            'profile-image'

          const adjustedFile = new File(
            [blob],
            `${fileName}-profile.jpg`,
            {
              type: 'image/jpeg',
              lastModified: Date.now(),
            }
          )

          resolve(adjustedFile)
        },
        'image/jpeg',
        0.92
      )
    })
  }

  const handleImageUpload = async () => {
    if (!selectedImage) {
      setError('Please select an image first')
      return
    }

    setUploadingImage(true)
    setMessage('')
    setError('')

    try {
      const adjustedImage = await createAdjustedImage()

      const formData = new FormData()

      formData.append('file', adjustedImage)

      const response = await api.post(
        '/api/about/profile-image',
        formData
      )

      const imageUrl = response.data

      setAbout((current) => ({
        ...current,
        profileImage: imageUrl,
      }))

      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }

      setSelectedImage(null)
      setImagePreview(null)

      setZoom(1)
      setPositionX(50)
      setPositionY(50)

      setMessage('Profile image uploaded successfully')
    } catch (error) {
      console.error(
        'Failed to upload profile image:',
        error
      )

      setError('Failed to upload profile image')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setSaving(true)
    setMessage('')
    setError('')

    try {
      await api.put(
        `/api/about/${about.id}`,
        about
      )

      setMessage(
        'About content updated successfully'
      )
    } catch (error) {
      setError(
        'Failed to update About content'
      )
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p>Loading About content...</p>
  }

  if (!about) {
    return <p>No About content found.</p>
  }

  const existingImageUrl = about.profileImage
    ? about.profileImage.startsWith('http')
      ? about.profileImage
      //: `http://localhost:8080${about.profileImage}`
      : `https://portfoliowithcms-production.up.railway.app${about.profileImage}`
    : null

  /*
   * These values are used only for the preview.
   * The image is deliberately larger than the square
   * so the entire preview area is always covered.
   */
  const previewImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: `${positionX}% ${positionY}%`,
    transform: `scale(${zoom})`,
    transformOrigin: `${positionX}% ${positionY}%`,
  }

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold">
        About
      </h1>

      {message && (
        <p className="mb-4 text-green-600">
          {message}
        </p>
      )}

      {error && (
        <p className="mb-4 text-red-600">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-lg bg-white p-6 shadow"
      >
        <div>
          <label className="mb-2 block font-medium">
            Bio
          </label>

          <textarea
            name="bio"
            value={about.bio || ''}
            onChange={handleChange}
            rows="5"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Education
          </label>

          <textarea
            name="education"
            value={about.education || ''}
            onChange={handleChange}
            rows="4"
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Career Focus
          </label>

          <input
            type="text"
            name="careerFocus"
            value={about.careerFocus || ''}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Location
          </label>

          <input
            type="text"
            name="location"
            value={about.location || ''}
            onChange={handleChange}
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Profile Image
          </label>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            className="w-full rounded-md border px-3 py-2"
          />

          <p className="mt-2 text-sm text-gray-500">
            Supported formats: JPG, PNG, WebP
          </p>

          {imagePreview && (
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="flex-shrink-0">
                  <p className="mb-2 text-sm font-medium text-slate-700">
                    Adjust Preview
                  </p>

                  {/* Square crop area */}
                  <div className="relative h-64 w-64 overflow-hidden rounded-2xl bg-slate-200">
                    <img
                      ref={previewImageRef}
                      src={imagePreview}
                      alt="Profile adjustment preview"
                      className="absolute inset-0 h-full w-full select-none object-cover"
                      style={previewImageStyle}
                    />

                    {/* Crop border */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-white/80" />
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    The square area is exactly what will
                    be uploaded.
                  </p>
                </div>

                <div className="min-w-0 flex-1 space-y-5">
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">
                        Zoom
                      </label>

                      <span className="text-sm text-slate-500">
                        {zoom.toFixed(1)}×
                      </span>
                    </div>

                    <input
                      type="range"
                      min="1"
                      max="3"
                      step="0.1"
                      value={zoom}
                      onChange={(event) =>
                        setZoom(
                          Number(event.target.value)
                        )
                      }
                      className="mt-2 w-full"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">
                        Horizontal Position
                      </label>

                      <span className="text-sm text-slate-500">
                        {positionX}%
                      </span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={positionX}
                      onChange={(event) =>
                        setPositionX(
                          Number(event.target.value)
                        )
                      }
                      className="mt-2 w-full"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">
                        Vertical Position
                      </label>

                      <span className="text-sm text-slate-500">
                        {positionY}%
                      </span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={positionY}
                      onChange={(event) =>
                        setPositionY(
                          Number(event.target.value)
                        )
                      }
                      className="mt-2 w-full"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={resetImageAdjustment}
                    className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    Reset Adjustment
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleImageUpload}
                disabled={uploadingImage}
                className="mt-6 w-full rounded-md bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
              >
                {uploadingImage
                  ? 'Uploading...'
                  : 'Upload Adjusted Image'}
              </button>
            </div>
          )}

          {!imagePreview && existingImageUrl && (
            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-slate-700">
                Current Profile Image
              </p>

              <img
                src={existingImageUrl}
                alt="Current profile"
                className="h-32 w-32 rounded-2xl border object-cover"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}

export default About