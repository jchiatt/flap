import db from '../../../lib/firebaseAdmin';

console.log(db);

export default (req, res) => {
  const tweetsRef = db.collection('tweets');

  tweetsRef.doc().set({
    name: 'San Francisco',
    state: 'CA',
    country: 'USA',
    capital: false,
    population: 860000,
  });

  res.status(200).json({ status: 'success' });
};
