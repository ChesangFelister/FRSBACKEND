const express = require('express');
const cors = require('cors');

const authRoutes = require('./api/routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});



// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// app.use(cors({ origin: '*' }));
// app.use(express.json());
// // const authRoutes = require('./api/routes/auth.routes');

// // ===== API Routes =====

// app.use('/api/auth', require('./api/routes/auth.routes'));
// app.use('/api/users', require('./api/routes/user.routes'));
// app.use('/api/properties', require('./api/routes/properties.routes'));
// app.use('/api/reminders', require('./api/routes/reminder.routes'));

// app.get('/', (req, res) => res.send('FRS MVP Backend Running'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
