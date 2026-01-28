'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en'
    i18n.changeLanguage(newLang)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
            >
              AI Consultancy
            </button>
          </div>

          <div className="hidden md:flex md:space-x-8 md:items-center">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              {t('nav.services')}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              {t('nav.about')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              {t('nav.contact')}
            </button>
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              {i18n.language === 'en' ? 'ES' : 'EN'}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
            >
              {i18n.language === 'en' ? 'ES' : 'EN'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary-600"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <button
              onClick={() => scrollToSection('hero')}
              className="block w-full text-left text-gray-700 hover:text-primary-600 font-medium py-2"
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left text-gray-700 hover:text-primary-600 font-medium py-2"
            >
              {t('nav.services')}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-gray-700 hover:text-primary-600 font-medium py-2"
            >
              {t('nav.about')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-gray-700 hover:text-primary-600 font-medium py-2"
            >
              {t('nav.contact')}
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
