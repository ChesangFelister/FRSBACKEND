const sequelize = require('./api/config/db');

// Import all models to establish associations
require('./api/models');

const { User, Property, Document, Tenant, Payment, Maintenance } = require('./api/models');

async function seed() {
    await sequelize.sync(); 
    
    const landlord = await User.create({
        fullname: 'chess Doe',
        email: 'chessdoe@example.com',
        password: 'password123',
        role: 'landlord'
    });
    await Property.create({
        name: 'Riverside Villa',
        location: 'Nairobi',
        totalUnits: 30,
        landlordId: landlord.id,
    });
    console.log('Database seeded successfully');
    process.exit();

}
seed();

    // Create sample users
    