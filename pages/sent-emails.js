import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Navbar from '../components/navbar';
import FilterSent from '@/components/FilterSent';

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
                    <p className="text-slate-400">from</p>
                    <p className="text-lg font-semibold text-white">{email.senderName}</p>
                </div>
                <button onClick={handleRemove} className='bg-red-800  p-2 text-black'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2 "><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                </button> 
            </div>
            <div className="flex items-center mb-4">
                <div>
                    <p className="text-slate-400">to</p>
                    <p className="text-lg font-semibold text-white">{email.recipient}</p>
                </div>
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
                <p className="font-semibold text-white">Status:</p>
                <p className="text-gray-400">{email.status}</p>
            </div>
            <div>
                <p className="font-semibold text-white">Reference Code:</p>
                <p className="text-gray-400">{email.referenceCode}</p>
            </div>
        </li>
    )
}

export default function SentEmails() {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredEmails, setFilteredEmails] = useState([]);
    

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await axios.get('/api/sent-emails');
                setEmails(response.data.reverse());
                setFilteredEmails(response.data.reverse())
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sent emails:', error);
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
                    <h1 className="text-2xl font-bold text-white mb-6 text-center">Sent Emails</h1>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                        </div>
                    ) : (
                        <div className='space-y-4'>
                        <FilterSent setEmails = {setEmails} filteredEmails={filteredEmails} setFilteredEmails={setFilteredEmails} emails = {emails} />
                        <ul className="space-y-6">
                            
                            {filteredEmails.map((email, index) => {
                                return(
                                    <Card setFilteredEmails={setFilteredEmails} filteredEmails = {filteredEmails} email = {email} index={index} />
                                )
                            })}
                        </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
