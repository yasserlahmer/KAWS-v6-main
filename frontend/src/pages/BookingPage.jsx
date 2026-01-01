import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon, MessageCircle, Info, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getCars } from '../services/api';
import { siteConfig } from '../data/mock';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Calendar } from '../components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const { t, language } = useLanguage();
  const preselectedCarId = searchParams.get('car');

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    carId: preselectedCarId || '',
    pickupDate: null,
    returnDate: null,
    pickupLocation: 'casablanca',
    message: '',
  });

  // Fetch cars from API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const data = await getCars();
        setCars(data);
      } catch (err) {
        console.error('Error loading cars:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    if (preselectedCarId) {
      setFormData((prev) => ({ ...prev, carId: preselectedCarId }));
    }
  }, [preselectedCarId]);

  const selectedCar = useMemo(() => {
    return cars.find((c) => c.id === formData.carId);
  }, [cars, formData.carId]);

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 1;
  };

  const totalDays = calculateDays(formData.pickupDate, formData.returnDate);
  const totalPrice = selectedCar ? selectedCar.price_per_day * totalDays : 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppBooking = () => {
    // Validation
    if (!formData.fullName || !formData.phone || !formData.carId || !formData.pickupDate || !formData.returnDate) {
      alert(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : language === 'en' ? 'Please fill all required fields' : 'Veuillez remplir tous les champs requis');
      return;
    }

    const car = selectedCar;
    const pickup = format(formData.pickupDate, 'dd/MM/yyyy');
    const returnD = format(formData.returnDate, 'dd/MM/yyyy');

    // Transmission label
    const transmissionLabel = car ? (
      car.transmission === 'auto' 
        ? (language === 'ar' ? 'أوتوماتيك' : language === 'en' ? 'Automatic' : 'Automatique')
        : (language === 'ar' ? 'يدوي' : language === 'en' ? 'Manual' : 'Manuelle')
    ) : '-';

    // Fuel label
    const fuelLabel = car ? (
      car.fuel === 'diesel'
        ? 'Diesel'
        : (language === 'ar' ? 'بنزين' : language === 'en' ? 'Petrol' : 'Essence')
    ) : '-';

    let message;
    if (language === 'ar') {
      message = `مرحباً KAWS CAR! 🚗\n\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `🚗 تفاصيل السيارة:\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `• الموديل: ${car ? `${car.brand} ${car.model}` : 'غير محدد'}\n` +
        `• السنة: ${car ? car.year : '-'}\n` +
        `• ناقل الحركة: ${transmissionLabel}\n` +
        `• الوقود: ${fuelLabel}\n` +
        `• عدد المقاعد: ${car ? car.seats : '-'} مقاعد\n` +
        `• السعر: ${car ? car.price_per_day : '-'} DH/يوم\n\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `📅 تفاصيل الحجز:\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `• من: ${pickup}\n` +
        `• إلى: ${returnD}\n` +
        `• المدة: ${totalDays} ${totalDays > 1 ? 'أيام' : 'يوم'}\n` +
        `• مكان الاستلام: ${formData.pickupLocation}\n\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `💰 التكلفة الإجمالية: ${totalPrice} DH\n` +
        `━━━━━━━━━━━━━━━━━━━━\n\n` +
        `👤 معلومات الاتصال:\n` +
        `الاسم: ${formData.fullName}\n` +
        `الهاتف: ${formData.phone}\n` +
        `البريد الإلكتروني: ${formData.email || 'غير محدد'}` +
        (formData.message ? `\n\n📝 ملاحظات: ${formData.message}` : '') +
        `\n\nشكراً لك! أرجو تأكيد التوفر.`;
    } else if (language === 'en') {
      message = `Hello KAWS CAR! 🚗\n\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `🚗 Vehicle Details:\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `• Model: ${car ? `${car.brand} ${car.model}` : 'Not selected'}\n` +
        `• Year: ${car ? car.year : '-'}\n` +
        `• Transmission: ${transmissionLabel}\n` +
        `• Fuel: ${fuelLabel}\n` +
        `• Seats: ${car ? car.seats : '-'} seats\n` +
        `• Price: ${car ? car.price_per_day : '-'} DH/day\n\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `📅 Booking Details:\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `• From: ${pickup}\n` +
        `• To: ${returnD}\n` +
        `• Duration: ${totalDays} ${totalDays > 1 ? 'days' : 'day'}\n` +
        `• Pickup Location: ${formData.pickupLocation}\n\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `💰 Total Cost: ${totalPrice} DH\n` +
        `━━━━━━━━━━━━━━━━━━━━\n\n` +
        `👤 Contact Info:\n` +
        `Name: ${formData.fullName}\n` +
        `Phone: ${formData.phone}\n` +
        `Email: ${formData.email || 'Not provided'}` +
        (formData.message ? `\n\n📝 Notes: ${formData.message}` : '') +
        `\n\nThank you! Please confirm availability.`;
    } else {
      message = `Bonjour KAWS CAR! 🚗\n\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `🚗 Détails du véhicule:\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `• Modèle: ${car ? `${car.brand} ${car.model}` : 'Non sélectionné'}\n` +
        `• Année: ${car ? car.year : '-'}\n` +
        `• Transmission: ${transmissionLabel}\n` +
        `• Carburant: ${fuelLabel}\n` +
        `• Places: ${car ? car.seats : '-'} places\n` +
        `• Prix: ${car ? car.price_per_day : '-'} DH/jour\n\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `📅 Détails de la réservation:\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `• Du: ${pickup}\n` +
        `• Au: ${returnD}\n` +
        `• Durée: ${totalDays} ${totalDays > 1 ? 'jours' : 'jour'}\n` +
        `• Lieu de prise en charge: ${formData.pickupLocation}\n\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `💰 Coût Total: ${totalPrice} DH\n` +
        `━━━━━━━━━━━━━━━━━━━━\n\n` +
        `👤 Informations de contact:\n` +
        `Nom: ${formData.fullName}\n` +
        `Tél: ${formData.phone}\n` +
        `Email: ${formData.email || 'Non fourni'}` +
        (formData.message ? `\n\n📝 Message: ${formData.message}` : '') +
        `\n\nMerci! Veuillez confirmer la disponibilité.`;
    }

    window.open(
      `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-4">{t.booking.title}</h1>
          <p className="text-xl text-gray-400">{t.booking.subtitle}</p>
        </div>
      </section>

      {/* How to Book Section */}
      <section className="py-8 bg-blue-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                {language === 'ar' ? '📋 كيفية الحجز؟' : language === 'en' ? '📋 How to Book?' : '📋 Comment réserver ?'}
              </h3>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>{language === 'ar' ? '1. املأ النموذج أدناه' : language === 'en' ? '1. Fill the form below' : '1. Remplissez le formulaire ci-dessous'}</li>
                <li>{language === 'ar' ? '2. انقر على "حجز عبر WhatsApp"' : language === 'en' ? '2. Click "Book via WhatsApp"' : '2. Cliquez sur "Réserver via WhatsApp"'}</li>
                <li>{language === 'ar' ? '3. أكد مع فريقنا' : language === 'en' ? '3. Confirm with our team' : '3. Confirmez avec notre équipe'}</li>
                <li>{language === 'ar' ? '4. استلم سيارتك! 🚗' : language === 'en' ? '4. Get your car! 🚗' : '4. Récupérez votre véhicule ! 🚗'}</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <Label htmlFor="fullName">
                      {language === 'ar' ? 'الاسم الكامل' : language === 'en' ? 'Full Name' : 'Nom complet'} *
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder={language === 'ar' ? 'اسمك الكامل' : language === 'en' ? 'Your full name' : 'Votre nom complet'}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone">
                      {language === 'ar' ? 'الهاتف' : language === 'en' ? 'Phone' : 'Téléphone'} *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+212..."
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email">
                      {language === 'ar' ? 'البريد الإلكتروني' : language === 'en' ? 'Email' : 'Email'}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={language === 'ar' ? 'بريدك الإلكتروني' : language === 'en' ? 'Your email' : 'Votre email'}
                    />
                  </div>

                  {/* Car Selection */}
                  <div>
                    <Label htmlFor="carId">
                      {language === 'ar' ? 'السيارة' : language === 'en' ? 'Vehicle' : 'Véhicule'} *
                    </Label>
                    <Select
                      value={formData.carId}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, carId: value }))
                      }
                    >
                      <SelectTrigger id="carId">
                        <SelectValue placeholder={language === 'ar' ? 'اختر سيارة' : language === 'en' ? 'Select a car' : 'Sélectionnez une voiture'} />
                      </SelectTrigger>
                      <SelectContent>
                        {cars.map((car) => (
                          <SelectItem key={car.id} value={car.id}>
                            {car.brand} {car.model} ({car.year})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Pickup Date */}
                  <div>
                    <Label>
                      {language === 'ar' ? 'تاريخ الاستلام' : language === 'en' ? 'Pickup Date' : 'Date de prise en charge'} *
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.pickupDate ? (
                            format(formData.pickupDate, 'PPP', { locale: fr })
                          ) : (
                            <span>{language === 'ar' ? 'اختر تاريخ' : language === 'en' ? 'Pick a date' : 'Choisir une date'}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.pickupDate}
                          onSelect={(date) =>
                            setFormData((prev) => ({ ...prev, pickupDate: date }))
                          }
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Return Date */}
                  <div>
                    <Label>
                      {language === 'ar' ? 'تاريخ الإرجاع' : language === 'en' ? 'Return Date' : 'Date de retour'} *
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.returnDate ? (
                            format(formData.returnDate, 'PPP', { locale: fr })
                          ) : (
                            <span>{language === 'ar' ? 'اختر تاريخ' : language === 'en' ? 'Pick a date' : 'Choisir une date'}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.returnDate}
                          onSelect={(date) =>
                            setFormData((prev) => ({ ...prev, returnDate: date }))
                          }
                          disabled={(date) =>
                            date < (formData.pickupDate || new Date())
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Pickup Location */}
                  <div className="md:col-span-2">
                    <Label htmlFor="pickupLocation">
                      {language === 'ar' ? 'مكان الاستلام' : language === 'en' ? 'Pickup Location' : 'Lieu de prise en charge'}
                    </Label>
                    <Input
                      id="pickupLocation"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleInputChange}
                      placeholder={language === 'ar' ? 'مكان الاستلام' : language === 'en' ? 'Pickup location' : 'Lieu de prise en charge'}
                    />
                  </div>

                  {/* Message */}
                  <div className="md:col-span-2">
                    <Label htmlFor="message">
                      {language === 'ar' ? 'رسالة إضافية' : language === 'en' ? 'Additional Message' : 'Message supplémentaire'}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder={language === 'ar' ? 'أي ملاحظات إضافية...' : language === 'en' ? 'Any additional notes...' : 'Remarques supplémentaires...'}
                    />
                  </div>
                </div>

                {/* WhatsApp Button */}
                <div className="mt-8 flex flex-col gap-4">
                  <Button
                    type="button"
                    onClick={handleWhatsAppBooking}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold flex items-center justify-center gap-3"
                    size="lg"
                  >
                    <MessageCircle className="w-6 h-6" />
                    {language === 'ar' ? 'احجز عبر واتساب' : language === 'en' ? 'Book via WhatsApp' : 'Réserver via WhatsApp'}
                  </Button>

                  <div className="text-center text-sm text-gray-500">
                    {language === 'ar' ? 'أو اتصل بنا مباشرة' : language === 'en' ? 'Or contact us directly' : 'Ou contactez-nous directement'}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Phone className="w-5 h-5 text-red-600" />
                      <span className="font-medium">{siteConfig.phone}</span>
                    </a>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Mail className="w-5 h-5 text-red-600" />
                      <span className="font-medium text-sm">{siteConfig.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">{t.booking.summary}</h3>
                
                {selectedCar ? (
                  <div className="space-y-4">
                    <div>
                      <img
                        src={selectedCar.image}
                        alt={`${selectedCar.brand} ${selectedCar.model}`}
                        className="w-full h-40 object-cover rounded-lg mb-3"
                      />
                      <h4 className="font-semibold text-lg">
                        {selectedCar.brand} {selectedCar.model}
                      </h4>
                      <p className="text-gray-600 text-sm">{selectedCar.year}</p>
                    </div>

                    <div className="border-t pt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t.booking.pricePerDay}:</span>
                        <span className="font-semibold">{selectedCar.price_per_day} DH</span>
                      </div>
                      {formData.pickupDate && formData.returnDate && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-gray-600">{t.booking.duration}:</span>
                            <span className="font-semibold">
                              {totalDays} {totalDays > 1 ? (language === 'ar' ? 'أيام' : language === 'en' ? 'days' : 'jours') : (language === 'ar' ? 'يوم' : language === 'en' ? 'day' : 'jour')}
                            </span>
                          </div>
                          <div className="flex justify-between text-lg font-bold text-red-600 pt-2 border-t">
                            <span>{t.booking.total}:</span>
                            <span>{totalPrice} DH</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    {language === 'ar' ? 'اختر سيارة للمتابعة' : language === 'en' ? 'Select a car to continue' : 'Sélectionnez une voiture pour continuer'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;
