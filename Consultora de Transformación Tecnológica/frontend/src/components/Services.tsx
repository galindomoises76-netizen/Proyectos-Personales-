import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiBook, FiZap, FiCode } from 'react-icons/fi';

const Services: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <FiBook className="w-12 h-12" />,
      title: t('services.training.title'),
      description: t('services.training.description'),
    },
    {
      icon: <FiZap className="w-12 h-12" />,
      title: t('services.automation.title'),
      description: t('services.automation.description'),
    },
    {
      icon: <FiCode className="w-12 h-12" />,
      title: t('services.custom.title'),
      description: t('services.custom.description'),
    },
  ];

  return (
    <section id="services" className="section-container bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="heading-secondary">{t('services.title')}</h2>
        <p className="text-primary max-w-2xl mx-auto">{t('services.subtitle')}</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
          >
            <div className="text-primary-600 mb-4 flex justify-center">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {service.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
