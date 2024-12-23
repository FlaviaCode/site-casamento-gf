import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { Calendar, Clock, MapPin, Shirt, Info } from 'lucide-react';
import { demoWeddingInfo } from '../lib/demo-data';
import { AlertDialog } from '../components/AlertDialog';

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
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-80">
            <img
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3"
              alt="Wedding"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                onClick={handleAddToCalendar}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <Calendar className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="font-medium text-gray-900">Data</h3>
                  <p className="text-gray-600">{weddingInfo.date}</p>
                </div>
              </div>

              <div 
                onClick={handleTimeClick}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <Clock className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="font-medium text-gray-900">Horário</h3>
                  <p className="text-gray-600">{weddingInfo.time}</p>
                </div>
              </div>

              <div 
                onClick={handleLocationClick}
                className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <MapPin className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="font-medium text-gray-900">Local: Portal Ecomangue</h3>
                  <p className="text-gray-600">{weddingInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <Shirt className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="font-medium text-gray-900">Dress Code</h3>
                  <p className="text-gray-600">{weddingInfo.dressCode}</p>
                </div>
              </div>
            </div>

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
    </>
  );
}