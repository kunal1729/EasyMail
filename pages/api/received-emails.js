// pages/api/received-emails.js

import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).send('Method Not Allowed');
    }
    console.log("h1")

    try {
        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection('receivedEmails');
        let emails;
        try {
            emails = await collection.find({}).toArray();
        } catch (emailFetchError) {
            console.error('An error occurred while fetching emails:', emailFetchError);
            emails = []; // You can choose to handle the error in other ways, such as rethrowing it or returning an empty array
        }
        
        
        res.status(200).json(emails);
        console.log(emails)
        
    } catch (error) {
        res.status(500).json({ message: 'Error fetching emails', error: error.message });
    }
}


