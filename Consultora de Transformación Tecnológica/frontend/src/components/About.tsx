import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { value: '5+', label: t('about.experience') },
    { value: '50+', label: t('about.projects') },
    { value: '30+', label: t('about.clients') },
  ];

  return (
    <section id="about" className="section-container bg-white">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-secondary mb-4">{t('about.title')}</h2>
          <p className="text-primary mb-6">{t('about.subtitle')}</p>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {t('about.description')}
          </p>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {t('about.expertise')}
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <span className="text-primary-600 mr-2">✓</span>
              AI Strategy & Implementation
            </li>
            <li className="flex items-center">
              <span className="text-primary-600 mr-2">✓</span>
              Process Automation
            </li>
            <li className="flex items-center">
              <span className="text-primary-600 mr-2">✓</span>
              Machine Learning Solutions
            </li>
            <li className="flex items-center">
              <span className="text-primary-600 mr-2">✓</span>
              Digital Transformation Consulting
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 gap-6"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-primary-50 rounded-lg"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
