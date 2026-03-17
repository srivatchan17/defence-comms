const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Load users from file
function getUsers() {
  const data = fs.readFileSync('./data/users.json');
  return JSON.parse(data);
}

function saveUsers(data) {
  fs.writeFileSync('./data/users.json', JSON.stringify(data, null, 2));
}

// Store messages in memory
let messages = [];
let clients = new Map();

// LOGIN route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const db = getUsers();
  const user = db.users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  if (!user.approved) {
    return res.status(403).json({ error: 'Your account is pending HQ approval' });
  }

  res.json({ success: true, user: { id: user.id, name: user.name, role: user.role, username: user.username } });
});

// GET all users (admin only)
app.get('/api/users', (req, res) => {
  const db = getUsers();
  res.json(db.users.map(u => ({ id: u.id, name: u.name, username: u.username, role: u.role, approved: u.approved })));
});

// APPROVE user
app.post('/api/users/:id/approve', (req, res) => {
  const db = getUsers();
  const user = db.users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.approved = true;
  saveUsers(db);
  res.json({ success: true });
});

// REVOKE user
app.post('/api/users/:id/revoke', (req, res) => {
  const db = getUsers();
  const user = db.users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.approved = false;
  saveUsers(db);
  res.json({ success: true });
});

// GET messages
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// WebSocket for real-time chat
wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const msg = JSON.parse(data);

    if (msg.type === 'join') {
      clients.set(ws, msg.user);
    }

    if (msg.type === 'message') {
      const newMsg = {
        id: Date.now(),
        user: msg.user,
        text: msg.text,
        time: new Date().toLocaleTimeString(),
        encrypted: true
      };
      messages.push(newMsg);

      // Broadcast to all connected clients
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'message', data: newMsg }));
        }
      });
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`\n🛡️  DefenceComms server running at http://localhost:${PORT}`);
  console.log(`   Admin login:   admin / admin123`);
  console.log(`   Officer login: officer1 / pass123`);
  console.log(`   Veteran login: veteran1 / pass123\n`);
});