import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { Calendar, Clock, MapPin, Shirt, Info } from 'lucide-react';
import { demoWeddingInfo } from '../lib/demo-data';
import { AlertDialog } from '../components/AlertDialog';
import { ScrollButton } from '../components/ScrollButton';

export function Wedding() {
  const { weddingInfo, setWeddingInfo } = useStore();
  const [showCalendarAlert, setShowCalendarAlert] = useState(false);
  const [showTimeAlert, setShowTimeAlert] = useState(false);

  useEffect(() => {
    if (!weddingInfo.date) {
      setWeddingInfo(demoWeddingInfo);
    }
  }, [weddingInfo.date, setWeddingInfo]);

  const handleAddToCalendar = () => {
    setShowCalendarAlert(true);
  };

  const handleCalendarConfirm = () => {
    const event = {
      text: 'Casamento',
      dates: '20250614T160000',
      details: 'Casamento no Portal Ecomangue',
      location: weddingInfo.address,
    };

    const calendarUrl = `data:text/calendar;charset=utf-8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${event.dates}
DTEND:${event.dates}
SUMMARY:${event.text}
DESCRIPTION:${event.details}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    const link = document.createElement('a');
    link.href = encodeURI(calendarUrl);
    link.download = 'casamento.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTimeClick = () => {
    setShowTimeAlert(true);
  };

  const handleLocationClick = () => {
    window.open('https://maps.app.goo.gl/Gkrt56us5SED6oTG7', '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Couple Photo */}
      <section 
        className="h-screen bg-cover bg-center relative"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-1.2.1)'
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl text-white font-light tracking-wider">
            MARIA & PAULO
          </h1>
        </div>
      </section>

      {/* Announcement Section */}
      <section className="bg-[#B3CEE5] py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl md:text-4xl text-white font-light">
            VAMOS CASAR!
          </h2>
          <p className="text-2xl md:text-3xl text-white font-light">
            14 de Junho
          </p>
          <p className="text-xl md:text-2xl text-white font-light">
            Esperamos por você!
          </p>
        </div>
      </section>

      {/* Information Section with Background */}
      <section 
        className="relative bg-cover bg-center bg-fixed"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1)'
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                onClick={handleAddToCalendar}
                className="flex items-start space-x-4 p-6 bg-white/90 backdrop-blur-sm rounded-lg cursor-pointer hover:bg-white/95 transition-colors"
              >
                <Calendar className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="font-medium text-gray-900">Data</h3>
                  <p className="text-gray-600">{weddingInfo.date}</p>
                </div>
              </div>

              <div 
                onClick={handleTimeClick}
                className="flex items-start space-x-4 p-6 bg-white/90 backdrop-blur-sm rounded-lg cursor-pointer hover:bg-white/95 transition-colors"
              >
                <Clock className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="font-medium text-gray-900">Horário</h3>
                  <p className="text-gray-600">{weddingInfo.time}</p>
                </div>
              </div>

              <div 
                onClick={handleLocationClick}
                className="flex items-start space-x-4 p-6 bg-white/90 backdrop-blur-sm rounded-lg cursor-pointer hover:bg-white/95 transition-colors"
              >
                <MapPin className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="font-medium text-gray-900">Local: Portal Ecomangue</h3>
                  <p className="text-gray-600">{weddingInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white/90 backdrop-blur-sm rounded-lg">
                <Shirt className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="font-medium text-gray-900">Dress Code</h3>
                  <p className="text-gray-600">{weddingInfo.dressCode}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 bg-white/90 backdrop-blur-sm rounded-lg">
              <div className="flex items-start space-x-4">
                <Info className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="font-medium text-gray-900">Informações Adicionais</h3>
                  <p className="text-gray-600 whitespace-pre-line mt-2">
                    {weddingInfo.additionalInfo}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollButton />

      <AlertDialog
        isOpen={showCalendarAlert}
        onClose={() => setShowCalendarAlert(false)}
        title="Adicionar ao Calendário"
        message="Deseja adicionar este evento ao seu calendário?"
        confirmLabel="Adicionar lembrete"
        cancelLabel="Cancelar"
        onConfirm={handleCalendarConfirm}
        variant="action"
      />

      <AlertDialog
        isOpen={showTimeAlert}
        onClose={() => setShowTimeAlert(false)}
        title="Horário do Evento"
        message="Seja pontual 🥰"
        confirmLabel="OK"
        variant="info"
      />
    </div>
  );
}