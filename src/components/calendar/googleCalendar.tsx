import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = '883306771364-727gs19fbrflvkrsabfvgq7jdp9b2ldo.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDEGM2HynN4z7bwlSaHQP090UhT0FIDjnE';
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

const GoogleCalendar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    function start() {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
          ],
          scope: SCOPES,
        })
        .then(() => {
          const auth = gapi.auth2.getAuthInstance();
          auth.isSignedIn.listen(setIsSignedIn);
          setIsSignedIn(auth.isSignedIn.get());
        });
    }

    gapi.load('client:auth2', start);
  }, []);

  const handleLogin = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const createEvent = () => {
    if (!gapi.client?.calendar) {
      alert("L'API Google Calendar n'est pas encore prête.");
      return;
    }

    const event = {
      summary: 'Absence validée - Congé',
      description: 'Congé validé pour Ladji Timera.',
      start: { date: '2025-08-10', timeZone: 'Africa/Dakar' },
      end: { date: '2025-08-15', timeZone: 'Africa/Dakar' },
    };

    const request = gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    request.execute((event: any) => {
      alert(`Événement créé : ${event.htmlLink}`);
    });
  };

  return (
    <div className="p-4 space-y-4">
      {!isSignedIn ? (
        <button
          onClick={handleLogin}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Se connecter à Google
        </button>
      ) : (
        <button
          onClick={createEvent}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ajouter une absence validée au calendrier
        </button>
      )}
    </div>
  );
};

export default GoogleCalendar;
