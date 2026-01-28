'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

interface QuoteRequestData {
  name: string
  company: string
  email: string
  phone: string
  industry?: string
  serviceType: string
  projectDescription: string
  budgetRange?: string
}

export default function Contact() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState<QuoteRequestData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: '',
    serviceType: '',
    projectDescription: '',
    budgetRange: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          industry: '',
          serviceType: '',
          projectDescription: '',
          budgetRange: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting quote request:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-container bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="heading-secondary">{t('contact.title')}</h2>
        <p className="text-primary max-w-2xl mx-auto">{t('contact.subtitle')}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-2xl mx-auto"
      >
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {t('contact.form.name')} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                {t('contact.form.company')} *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('contact.form.email')} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                {t('contact.form.phone')} *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
              {t('contact.form.industry')}
            </label>
            <input
              type="text"
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
              {t('contact.form.serviceType')} *
            </label>
            <select
              id="serviceType"
              name="serviceType"
              required
              value={formData.serviceType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">{t('contact.form.servicePlaceholder')}</option>
              <option value="AI Training & Education">{t('contact.serviceTypes.training')}</option>
              <option value="Process Automation">{t('contact.serviceTypes.automation')}</option>
              <option value="Custom Development">{t('contact.serviceTypes.custom')}</option>
            </select>
          </div>

          <div>
            <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-2">
              {t('contact.form.projectDescription')} *
            </label>
            <textarea
              id="projectDescription"
              name="projectDescription"
              required
              rows={5}
              value={formData.projectDescription}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-700 mb-2">
              {t('contact.form.budgetRange')}
            </label>
            <select
              id="budgetRange"
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">{t('contact.form.budgetPlaceholder')}</option>
              <option value="Under $10,000">{t('contact.budgetRanges.under10k')}</option>
              <option value="$10,000 - $25,000">{t('contact.budgetRanges.10k-25k')}</option>
              <option value="$25,000 - $50,000">{t('contact.budgetRanges.25k-50k')}</option>
              <option value="$50,000 - $100,000">{t('contact.budgetRanges.50k-100k')}</option>
              <option value="Over $100,000">{t('contact.budgetRanges.over100k')}</option>
            </select>
          </div>

          {submitStatus === 'success' && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
              {t('contact.form.success')}
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {t('contact.form.error')}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
          </button>
        </form>
      </motion.div>
    </section>
  )
}
