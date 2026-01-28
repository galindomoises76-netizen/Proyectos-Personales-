'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiTrendingUp, FiUsers, FiDollarSign, FiAward } from 'react-icons/fi'

export default function Benefits() {
  const { t } = useTranslation()

  const benefits = [
    {
      icon: <FiCheckCircle className="w-8 h-8" />,
      title: t('benefits.automation.title'),
      description: t('benefits.automation.description'),
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: t('benefits.insights.title'),
      description: t('benefits.insights.description'),
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: t('benefits.experience.title'),
      description: t('benefits.experience.description'),
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: t('benefits.costs.title'),
      description: t('benefits.costs.description'),
    },
    {
      icon: <FiAward className="w-8 h-8" />,
      title: t('benefits.competitive.title'),
      description: t('benefits.competitive.description'),
    },
  ]

  return (
    <section className="section-container bg-gradient-to-br from-primary-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="heading-secondary">{t('benefits.title')}</h2>
        <p className="text-primary max-w-2xl mx-auto">{t('benefits.subtitle')}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-primary-600 mb-4">{benefit.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {benefit.title}
            </h3>
            <p className="text-gray-600">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
