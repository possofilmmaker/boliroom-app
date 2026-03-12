import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { nombre, fecha, hora, personas, correo, telefono } = body;

    // Limpieza agresiva de la llave privada para asegurar que Google la reconozca
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    
    if (privateKey) {
      // Reemplazar saltos de línea escapados (\n) por saltos de línea reales
      privateKey = privateKey.replace(/\\n/g, '\n');
      // Quitar comillas si se filtraron
      privateKey = privateKey.replace(/"/g, '');
    }
    
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    if (!clientEmail || !privateKey) {
      return NextResponse.json({ success: false, error: "Faltan credenciales en .env.local" }, { status: 500 });
    }

    // Usar la librería de Google de forma más directa
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    const startDateTime = new Date(`${fecha}T${hora}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000); 

    const event = {
      summary: `Reserva: ${nombre} (${personas} pax)`,
      location: "Carrera 15 # 67 - 27, Bogotá",
      description: `Cliente: ${nombre}\nCelular: ${telefono}\nCorreo: ${correo}\nPersonas: ${personas}\n\nCondiciones: 200k consumibles, 2 horas de estadía.`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: "America/Bogota",
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: "America/Bogota",
      },
    };

    console.log("Intentando insertar evento en:", calendarId);
    
    // Pasar la autenticación explícitamente en la llamada
    const response = await calendar.events.insert({
      calendarId: calendarId,
      requestBody: event,
    });

    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error("GOOGLE CALENDAR FULL ERROR:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      details: error.response?.data || "Verifica que compartiste el calendario con el correo del robot."
    }, { status: 500 });
  }
}
