import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../data/mock';

const PrivacyPage = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">
            {language === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy'}
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 prose prose-gray max-w-none">
            {language === 'fr' ? (
              <>
                <h2>1. Collecte des données</h2>
                <p>
                  {siteConfig.name} collecte uniquement les données nécessaires à la gestion de votre réservation :
                </p>
                <ul>
                  <li>Nom et prénom</li>
                  <li>Adresse email</li>
                  <li>Numéro de téléphone</li>
                  <li>Informations de permis de conduire</li>
                </ul>

                <h2>2. Utilisation des données</h2>
                <p>
                  Vos données sont utilisées exclusivement pour :
                </p>
                <ul>
                  <li>Traiter votre demande de réservation</li>
                  <li>Vous contacter concernant votre location</li>
                  <li>Améliorer nos services</li>
                </ul>

                <h2>3. Protection des données</h2>
                <p>
                  Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès non autorisé.
                </p>

                <h2>4. Partage des données</h2>
                <p>
                  Nous ne vendons ni ne partageons vos données personnelles avec des tiers, sauf obligation légale.
                </p>

                <h2>5. Vos droits</h2>
                <p>
                  Conformément à la réglementation en vigueur, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
                </p>

                <h2>6. Cookies</h2>
                <p>
                  Notre site utilise des cookies essentiels au fonctionnement du site. Aucun cookie publicitaire n'est utilisé.
                </p>

                <h2>7. Contact</h2>
                <p>
                  Pour toute question concernant vos données personnelles, contactez-nous au {siteConfig.phone} ou par email à {siteConfig.email}.
                </p>
              </>
            ) : (
              <>
                <h2>1. Data Collection</h2>
                <p>
                  {siteConfig.name} only collects data necessary for managing your booking:
                </p>
                <ul>
                  <li>First and last name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Driver's license information</li>
                </ul>

                <h2>2. Data Use</h2>
                <p>
                  Your data is used exclusively for:
                </p>
                <ul>
                  <li>Processing your booking request</li>
                  <li>Contacting you regarding your rental</li>
                  <li>Improving our services</li>
                </ul>

                <h2>3. Data Protection</h2>
                <p>
                  We implement appropriate security measures to protect your personal data against unauthorized access.
                </p>

                <h2>4. Data Sharing</h2>
                <p>
                  We do not sell or share your personal data with third parties, except where required by law.
                </p>

                <h2>5. Your Rights</h2>
                <p>
                  In accordance with current regulations, you have the right to access, rectify and delete your data.
                </p>

                <h2>6. Cookies</h2>
                <p>
                  Our site uses essential cookies for site functionality. No advertising cookies are used.
                </p>

                <h2>7. Contact</h2>
                <p>
                  For any questions regarding your personal data, contact us at {siteConfig.phone} or by email at {siteConfig.email}.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
