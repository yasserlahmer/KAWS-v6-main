import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../data/mock';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

const ContactPage = () => {
  const { t, language } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(
      language === 'fr' ? 'Message envoyé avec succès !' : 'Message sent successfully!'
    );
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      language === 'fr'
        ? 'Bonjour, je souhaite avoir plus d\'informations sur vos services de location.'
        : 'Hello, I would like to have more information about your rental services.'
    );
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t.contact.title}
          </h1>
          <p className="text-xl text-gray-400">{t.contact.subtitle}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {language === 'fr' ? 'Nos coordonnées' : 'Our Contact Details'}
                </h2>
                <div className="space-y-6">
                  {/* Phone */}
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t.contact.phone}</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {siteConfig.phone}
                      </p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t.contact.email}</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {siteConfig.email}
                      </p>
                    </div>
                  </a>

                  {/* Address */}
                  <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-sm">
                    <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t.contact.address}</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {siteConfig.address[language]}
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-sm">
                    <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        {language === 'fr' ? 'Disponibilité' : 'Availability'}
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        24h/24 - 7j/7
                      </p>
                      <p className="text-gray-600">{t.contact.hours}</p>
                      <p className="text-red-600 font-medium mt-2">{t.contact.delivery}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-green-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {language === 'fr' ? 'Réponse rapide via WhatsApp' : 'Quick Response via WhatsApp'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {language === 'fr'
                    ? 'Obtenez une réponse immédiate à toutes vos questions.'
                    : 'Get an immediate response to all your questions.'}
                </p>
                <Button
                  onClick={handleWhatsApp}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {language === 'fr' ? 'Envoyez-nous un message' : 'Send us a message'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        {language === 'fr' ? 'Nom complet' : 'Full Name'} *
                      </Label>
                      <Input id="name" required className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" required className="h-12" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {language === 'fr' ? 'Téléphone' : 'Phone'}
                    </Label>
                    <Input id="phone" type="tel" className="h-12" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">
                      {language === 'fr' ? 'Sujet' : 'Subject'} *
                    </Label>
                    <Input id="subject" required className="h-12" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white h-14 text-lg rounded-xl"
                  >
                    {language === 'fr' ? 'Envoyer' : 'Send'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden shadow-lg h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212270.68752214!2d-7.6916953!3d33.5713115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca%2C%20Morocco!5e0!3m2!1sen!2s!4v1635000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="KAWS CAR Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
