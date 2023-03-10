import path from 'path';
import fs from 'fs';

//create the path to data.json
function buildPath() {
  return path.join(process.cwd(), 'data', 'data.json');
}

//read the data from data.json
function extractData(filePath) {
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export default function handler(req, res) {
  const { method } = req;

  const filePath = buildPath();
  console.log('filePath--->', filePath);
  const { events_categories, allEvents } = extractData(filePath);
  console.log('all events->', allEvents);

  if (!allEvents) {
    return res.status(404).json({
      message: 'Events data not found!',
    });
  }

  if (method === 'POST') {
    const { email, eventId } = req.body;

    const newAllEvents = allEvents.map((ev) => {
      if (ev.id === eventId) {
        //email is already in the emails_registered
        if (ev.emails_registered.includes(email)) {
          return res
            .status(409)
            .json({ message: 'This email has already been registered' });
        }
        //new email
        return {
          ...ev,
          emails_registered: [...ev.emails_registered, email],
        };
      }
      return ev;
    });

    //overwrite the file with the new event data
    fs.writeFileSync(
      filePath,
      JSON.stringify({ events_categories, allEvents: newAllEvents })
    );

    res.status(200).json({
      message: `You have successfully been regiestered with the ${email}`,
    });
  }
}
