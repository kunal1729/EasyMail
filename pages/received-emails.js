import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '../components/navbar';
import FilterInbox from '@/components/FilterInbox';

function Card({email, index}) {
    
    const [removeItem, setRemoveItem] = useState(false)

    const handleRemove = () =>
    {
        setRemoveItem(true);
    }

    return (
        <li key={index} hidden = {removeItem} className="bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700">
            
            <div className="flex justify-between items-center mb-4">
                <div>
                    <p className="text-lg font-semibold text-white">From</p>
                    <p className="text-gray-400">{email.from}</p>
                </div>
                <button onClick={handleRemove} className='bg-red-800  p-2 text-black'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2 "><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                </button> 
            </div>
            <div className="mb-4">
                <p className="font-semibold text-white">Subject:</p>
                <p className="text-gray-300">{email.subject}</p>
            </div>
            <div className="mb-4">
                <p className="font-semibold text-white">Body:</p>
                <p className="text-gray-300">{email.body}</p>
            </div>
            <div className="mb-4">
                <p className="font-semibold text-white">Date:</p>
                <p className="text-gray-400">{new Date(email.date).toLocaleString()}</p>
            </div>
        </li>
    )
}

const ReceivedEmails = () => {
    const [emails, setEmails] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filteredEmails, setFilteredEmails] = useState([]);
    const [checklist, setChecklist] = useState([])
    
    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await axios.get('/api/received-emails');
                setEmails(response.data);
                setFilteredEmails(response.data)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching emails:', error);
                setError('Error fetching emails');
                setLoading(false);
            }
        };
        fetchEmails();
    }, []);

    


    return (
        <div className="min-h-screen flex flex-col bg-black text-white">
            <Navbar />
            <div className="flex-grow flex flex-col items-center py-8 bg-gradient-to-r from-blue-500 to-green-400">
                <div className="bg-gray-900 shadow-md rounded-lg p-6 w-full max-w-4xl relative">
                    <Link href="/" passHref>
                        <button className="absolute top-4 right-4 bg-slate-700 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-slate-600 transition">
                            Dashboard
                        </button>
                    </Link>
                    <h1 className="text-2xl font-bold text-white mb-6 text-center">Received Emails</h1>
                    {loading ? (
                        <p className="text-gray-300 text-center">Loading...</p>
                    ) : error ? (
                        <p className="text-red-500 text-center mb-4">{error}</p>
                    ) : emails.length === 0 ? (
                        <p className="text-gray-300 text-center">No emails found.</p>
                    ) : (
                        <div className='space-y-4'>
                        <FilterInbox setEmails = {setEmails} filteredEmails={filteredEmails} setFilteredEmails={setFilteredEmails} emails = {emails} />
                        
                        <ul className="space-y-6">
                            {filteredEmails.map((email, index) => {
                                return (
                                    <Card setFilteredEmails={setFilteredEmails} filteredEmails = {filteredEmails} email = {email} index={index} />
                            )})}
                        </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReceivedEmails;
