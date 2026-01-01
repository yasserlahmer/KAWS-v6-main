import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { siteConfig } from '../data/mock';

const TermsPage = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">
            {language === 'fr' ? 'Conditions Générales de Vente' : 'Terms and Conditions'}
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 prose prose-gray max-w-none">
            {language === 'fr' ? (
              <>
                <h2>1. Conditions de location</h2>
                <p>
                  Pour louer un véhicule chez {siteConfig.name}, le locataire doit :
                </p>
                <ul>
                  <li>Être âgé d'au moins 21 ans</li>
                  <li>Détenir un permis de conduire valide depuis au moins 2 ans</li>
                  <li>Présenter une pièce d'identité valide</li>
                  <li>Fournir une adresse de domicile vérifiable</li>
                </ul>

                <h2>2. Réservation et paiement</h2>
                <p>
                  La réservation est confirmée après versement d'un acompte de 30% du montant total de la location. Le solde est payable à la prise en charge du véhicule.
                </p>

                <h2>3. Annulation</h2>
                <p>
                  En cas d'annulation :
                </p>
                <ul>
                  <li>Plus de 48h avant : remboursement intégral de l'acompte</li>
                  <li>Moins de 48h avant : l'acompte est conservé</li>
                </ul>

                <h2>4. Assurance</h2>
                <p>
                  Tous nos véhicules sont assurés tous risques. Une franchise reste à la charge du locataire en cas de dommages.
                </p>

                <h2>5. Utilisation du véhicule</h2>
                <p>
                  Le véhicule doit être utilisé conformément au code de la route. Il est interdit de :
                </p>
                <ul>
                  <li>Conduire sous l'influence de l'alcool ou de stupéfiants</li>
                  <li>Utiliser le véhicule pour des compétitions</li>
                  <li>Sous-louer le véhicule</li>
                  <li>Transporter des marchandises dangereuses</li>
                </ul>

                <h2>6. Restitution</h2>
                <p>
                  Le véhicule doit être restitué à la date et à l'heure convenues, dans le même état qu'à la prise en charge. Tout retard sera facturé.
                </p>

                <h2>7. Contact</h2>
                <p>
                  Pour toute question concernant ces conditions, contactez-nous au {siteConfig.phone}.
                </p>
              </>
            ) : (
              <>
                <h2>1. Rental Conditions</h2>
                <p>
                  To rent a vehicle from {siteConfig.name}, the renter must:
                </p>
                <ul>
                  <li>Be at least 21 years old</li>
                  <li>Hold a valid driver's license for at least 2 years</li>
                  <li>Present a valid ID</li>
                  <li>Provide a verifiable home address</li>
                </ul>

                <h2>2. Booking and Payment</h2>
                <p>
                  The booking is confirmed after payment of a 30% deposit of the total rental amount. The balance is payable upon vehicle pickup.
                </p>

                <h2>3. Cancellation</h2>
                <p>
                  In case of cancellation:
                </p>
                <ul>
                  <li>More than 48h before: full refund of deposit</li>
                  <li>Less than 48h before: deposit is retained</li>
                </ul>

                <h2>4. Insurance</h2>
                <p>
                  All our vehicles are fully insured. An excess remains the responsibility of the renter in case of damage.
                </p>

                <h2>5. Vehicle Use</h2>
                <p>
                  The vehicle must be used in accordance with traffic laws. It is forbidden to:
                </p>
                <ul>
                  <li>Drive under the influence of alcohol or drugs</li>
                  <li>Use the vehicle for competitions</li>
                  <li>Sublet the vehicle</li>
                  <li>Transport dangerous goods</li>
                </ul>

                <h2>6. Return</h2>
                <p>
                  The vehicle must be returned on the agreed date and time, in the same condition as at pickup. Any delay will be charged.
                </p>

                <h2>7. Contact</h2>
                <p>
                  For any questions regarding these conditions, contact us at {siteConfig.phone}.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
