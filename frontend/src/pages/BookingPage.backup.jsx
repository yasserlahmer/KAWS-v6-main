import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon, MessageCircle, CheckCircle2, Info } from 'lucide-react';
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
  }, [language]);

  useEffect(() => {
    if (preselectedCarId) {
      setFormData((prev) => ({ ...prev, carId: preselectedCarId }));
    }
  }, [preselectedCarId]);

  const selectedCar = useMemo(() => {
    return cars.find((c) => c.id === formData.carId);
  }, [formData.carId]);

  const totalDays = useMemo(() => {
    if (formData.pickupDate && formData.returnDate) {
      const days = differenceInDays(formData.returnDate, formData.pickupDate);
      return days > 0 ? days : 1;
    }
    return 0;
  }, [formData.pickupDate, formData.returnDate]);

  const totalPrice = useMemo(() => {
    if (selectedCar && totalDays > 0) {
      return selectedCar.price_per_day * totalDays;
    }
    return 0;
  }, [selectedCar, totalDays]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.fullName || !formData.email || !formData.phone || !formData.carId || !formData.pickupDate || !formData.returnDate) {
        toast.error(language === 'fr' ? 'Veuillez remplir tous les champs requis' : 'Please fill all required fields');
        setIsSubmitting(false);
        return;
      }

      // Create booking via API
      const bookingData = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        car_id: formData.carId,
        pickup_date: formData.pickupDate.toISOString(),
        return_date: formData.returnDate.toISOString(),
        pickup_location: formData.pickupLocation,
        message: formData.message || '',
      };

      const response = await createBooking(bookingData);
      console.log('Booking created:', response);

      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success(t.booking.success);
    } catch (error) {
      console.error('Error creating booking:', error);
      setIsSubmitting(false);
      toast.error(language === 'fr' ? `Erreur lors de la réservation: ${error.message}` : `Booking error: ${error.message}`);
    }
  };

  const handleWhatsApp = () => {
    const car = selectedCar;
    const pickup = formData.pickupDate
      ? format(formData.pickupDate, 'dd/MM/yyyy')
      : '-';
    const returnD = formData.returnDate
      ? format(formData.returnDate, 'dd/MM/yyyy')
      : '-';

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
      message = `مرحبا، أريد حجز سيارة:\n\n` +
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
        `• مكان الاستلام: ${formData.pickupLocation === 'casablanca' ? 'الدار البيضاء' : formData.pickupLocation}\n\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `💰 التكلفة الإجمالية: ${totalPrice} DH\n` +
        `━━━━━━━━━━━━━━━━━━━━\n\n` +
        `👤 معلومات الاتصال:\n` +
        `الاسم: ${formData.fullName}\n` +
        `الهاتف: ${formData.phone}\n` +
        `البريد الإلكتروني: ${formData.email}` +
        (formData.message ? `\n\n📝 ملاحظات: ${formData.message}` : '');
    } else if (language === 'en') {
      message = `Hello, I would like to book a car:\n\n` +
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
        `Email: ${formData.email}` +
        (formData.message ? `\n\n📝 Notes: ${formData.message}` : '');
    } else {
      message = `Bonjour, je souhaite réserver une voiture:\n\n` +
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
        `Email: ${formData.email}` +
        (formData.message ? `\n\n📝 Message: ${formData.message}` : '');
    }

    window.open(
      `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t.booking.success}
          </h1>
          <p className="text-gray-600 mb-8">
            {language === 'ar'
              ? 'سيتصل بك فريقنا في أقرب وقت ممكن.'
              : language === 'en'
              ? 'Our team will contact you as soon as possible.'
              : 'Notre équipe vous contactera dans les plus brefs délais.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/fleet">
              <Button variant="outline" className="px-8">
                {language === 'ar' ? 'عرض سيارات أخرى' : language === 'en' ? 'View other vehicles' : 'Voir d\'autres véhicules'}
              </Button>
            </Link>
            <Link to="/">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8">
                {t.nav.home}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-4">{t.booking.title}</h1>
          <p className="text-xl text-gray-400">{t.booking.subtitle}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t.booking.form.fullName} *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="h-12"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.booking.form.email} *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="h-12"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.booking.form.phone} *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="h-12"
                    />
                  </div>

                  {/* Car Selection */}
                  <div className="space-y-2">
                    <Label>{language === 'ar' ? 'السيارة' : 'Véhicule'} *</Label>
                    <Select
                      value={formData.carId}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, carId: value }))
                      }
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue
                          placeholder={
                            language === 'ar'
                              ? 'اختر سيارة'
                              : 'Sélectionnez un véhicule'
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {cars.map((car) => (
                          <SelectItem key={car.id} value={car.id}>
                            {car.brand} {car.model} - {car.price_per_day} DH/{language === 'ar' ? 'يوم' : 'jour'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Pickup Date */}
                  <div className="space-y-2">
                    <Label>{t.booking.form.pickupDate} *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full h-12 justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.pickupDate ? (
                            format(formData.pickupDate, 'PPP', { locale: fr })
                          ) : (
                            <span className="text-muted-foreground">
                              {language === 'ar' ? 'اختر تاريخ' : 'Choisir une date'}
                            </span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.pickupDate}
                          onSelect={(date) =>
                            setFormData((prev) => ({
                              ...prev,
                              pickupDate: date,
                              returnDate:
                                prev.returnDate && date > prev.returnDate
                                  ? null
                                  : prev.returnDate,
                            }))
                          }
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Return Date */}
                  <div className="space-y-2">
                    <Label>{t.booking.form.returnDate} *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full h-12 justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.returnDate ? (
                            format(formData.returnDate, 'PPP', { locale: fr })
                          ) : (
                            <span className="text-muted-foreground">
                              {language === 'ar' ? 'اختر تاريخ' : 'Choisir une date'}
                            </span>
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
                            date < (formData.pickupDate || new Date()) ||
                            date < addDays(formData.pickupDate || new Date(), 1)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Pickup Location */}
                  <div className="space-y-2 md:col-span-2">
                    <Label>{t.booking.form.pickupLocation}</Label>
                    <Select
                      value={formData.pickupLocation}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, pickupLocation: value }))
                      }
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casablanca">Casablanca</SelectItem>
                        <SelectItem value="aeroport">
                          {language === 'ar'
                            ? 'مطار محمد الخامس'
                            : 'Aéroport Mohammed V'}
                        </SelectItem>
                        <SelectItem value="autre">
                          {language === 'ar' ? 'آخر (حدد)' : 'Autre (précisez)'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="message">{t.booking.form.message}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.carId || !formData.pickupDate || !formData.returnDate}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white h-14 text-lg rounded-xl"
                  >
                    {isSubmitting
                      ? (language === 'ar' ? 'جاري الإرسال...' : 'Envoi en cours...')
                      : t.booking.form.submit}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleWhatsApp}
                    className="flex-1 h-14 text-lg rounded-xl border-2"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t.booking.form.whatsapp}
                  </Button>
                </div>
              </form>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-28">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  {language === 'ar' ? 'الملخص' : 'Récapitulatif'}
                </h3>

                {selectedCar ? (
                  <div className="space-y-6">
                    <div className="aspect-video rounded-xl overflow-hidden">
                      <img
                        src={selectedCar.image}
                        alt={`${selectedCar.brand} ${selectedCar.model}`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">{selectedCar.brand}</p>
                      <p className="text-xl font-bold text-gray-900">
                        {selectedCar.model}
                      </p>
                    </div>

                    <div className="border-t pt-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {language === 'ar' ? 'السعر لليوم' : 'Prix par jour'}
                        </span>
                        <span className="font-medium">
                          {selectedCar.price_per_day} DH
                        </span>
                      </div>
                      {totalDays > 0 && (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {language === 'ar' ? 'عدد الأيام' : 'Nombre de jours'}
                            </span>
                            <span className="font-medium">{totalDays}</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold border-t pt-3">
                            <span>{t.booking.total}</span>
                            <span className="text-red-600">{totalPrice} DH</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    {language === 'ar'
                      ? 'اختر سيارة'
                      : 'Sélectionnez un véhicule'}
                  </p>
                )}

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-500 mb-2">
                    {language === 'ar' ? 'تحتاج مساعدة؟' : 'Besoin d\'aide ?'}
                  </p>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;
