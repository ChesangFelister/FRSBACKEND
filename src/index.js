const express = require('express');
const cors = require('cors');

require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json())
// ===== Routes =====
// Auth routes (register, login)
app.use('/', require('./routes/auth.routes')); 
app.use('/', require('./routes/user.routes'));
app.use('/properties', require('./routes/properties.routes'));
app.use('/reminder', require('./routes/reminder.routes'));


app.get('/', (req, res) => res.send('FRS MVP Backend Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
