import express, { json } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Create Express app
const app = express();
// Create HTTP server
const server = createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(json());

// Initiallocation data
const locations = [
  {
    id: 1,
    latitude: 62.7903,
    longitude: 22.8406
  },
  {
    id: 2,
    latitude: 62.7904,
    longitude: 22.8405
  }
];

// Routes

// Get all locations
app.get('/api/locations', (req, res) => {
  res.json({
    success: true,
    data: locations,
    count: locations.length
  });
});


// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Location Data API',
    endpoints: [
      'GET /api/locations - Get all locations'
    ]
  });
});

// POST endpoint to add a new location
app.post('/api/locations', (req, res) => {
  const { latitude, longitude } = req.body;
  if (typeof latitude === 'number' &&
    typeof longitude === 'number')
  {
    const newLocation = {
      id: locations.length + 1,
      latitude,
      longitude
    };
    // Add new location to the array
    locations.push(newLocation);

    // send data to the clients
    io.emit('locationAdded', newLocation)

    return res.status(201).json({
      success: true,
      data: newLocation
    });
  }
  res.status(400).json({
    success: false,
    message: 'Invalid location data'
  });
});

// Socket.IO connection handler
io.on('connection', socket => {
  console.log('client connected', socket.id)

  // send location data collected so far
  // to the newly connected client
  socket.emit('initialLocations', locations)

  // handle disconnection
  socket.on('disconnect', () => console.log('disconnected'))
})

// Start server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;