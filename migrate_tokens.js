require('dotenv').config();
const { MongoClient } = require('mongodb');

async function migrate() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db();
  
  // Update users with less than 25 tokens to 100
  const r1 = await db.collection('users').updateMany(
    { tokens: { $lt: 25 } },
    { $set: { tokens: 100 } }
  );
  console.log(`✅ Updated ${r1.modifiedCount} users → 100 tokens`);
  
  await client.close();
  console.log('Migration complete');
}
migrate().catch(console.error);
