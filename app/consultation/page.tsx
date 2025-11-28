'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MainHeader from '@/app/components/Home/header/MainHeader';
import Footer from '@/app/components/Footer';
import Image from 'next/image';

interface Consultation {
    id: number;
    consult_date: string;
    consult_time: string;
    remarks: string | null;
    meet_link: string | null;
    created_at: string;
    weight: string;
    height: string;
    age: number;
    health_issues: string;
    status: 'pending' | 'completed' | 'deleted';
}

export default function ConsultationPage() {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ minutes: 15, seconds: 0 });
    const [history, setHistory] = useState<Consultation[]>([]);
    const [upcomingConsultation, setUpcomingConsultation] = useState<Consultation | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        weight: '',
        height: '',
        age: '',
        health_issues: '',
        consult_time: '',
        consult_date: ''
    });

    // Countdown Timer Logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds === 0) {
                    if (prev.minutes === 0) return prev;
                    return { minutes: prev.minutes - 1, seconds: 59 };
                }
                return { ...prev, seconds: prev.seconds - 1 };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Fetch History
    useEffect(() => {
        if (user?.id) {
            fetchHistory();
        }
    }, [user?.id]);

    const fetchHistory = async () => {
        if (!user) return;
        try {
            const res = await fetch(`/api/consultation?customer_id=${user.id}`);
            if (res.ok) {
                const data = await res.json();
                setHistory(data);

                // Check for upcoming consultation (status is pending)
                const upcoming = data.find((c: Consultation) =>
                    c.status === 'pending'
                );

                if (upcoming) {
                    setUpcomingConsultation(upcoming);
                    // Pre-fill form data for editing
                    setFormData({
                        weight: upcoming.weight,
                        height: upcoming.height,
                        age: upcoming.age.toString(),
                        health_issues: upcoming.health_issues,
                        consult_time: upcoming.consult_time,
                        consult_date: upcoming.consult_date.split('T')[0] // Ensure YYYY-MM-DD
                    });
                }
            }
        } catch (error) {
            console.error('Failed to fetch history:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            router.push('/login');
            return;
        }

        setLoading(true);
        try {
            const method = isEditing ? 'PUT' : 'POST';
            const body = {
                customer_id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                phone: user.phone || '',
                ...formData,
                id: isEditing ? upcomingConsultation?.id : undefined
            };

            const res = await fetch('/api/consultation', {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (res.ok) {
                setSuccess(true);
                fetchHistory(); // Refresh history
                setIsEditing(false);
            } else {
                alert('Failed to submit request. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!upcomingConsultation || !user) return;

        if (!confirm('Are you sure you want to cancel this consultation? This action cannot be undone.')) {
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`/api/consultation?id=${upcomingConsultation.id}&customer_id=${user.id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                alert('Consultation cancelled successfully.');
                setUpcomingConsultation(null);
                fetchHistory();
            } else {
                alert('Failed to cancel consultation.');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const scrollToForm = () => {
        document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-white font-sans">
            <MainHeader />

            {/* Top Green Banner */}
            <div className="bg-[#3e7b27] text-white py-3 px-4 sticky top-0 z-50 shadow-md">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-lg font-bold text-center sm:text-left">
                        Get Consultation Now
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2 items-center">
                            <div className="bg-white text-[#d32f2f] font-bold rounded px-2 py-1 text-center min-w-[50px]">
                                <div className="text-xl leading-none">{timeLeft.minutes}</div>
                                <div className="text-[10px] uppercase">Min</div>
                            </div>
                            <div className="bg-white text-[#d32f2f] font-bold rounded px-2 py-1 text-center min-w-[50px]">
                                <div className="text-xl leading-none">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                                <div className="text-[10px] uppercase">Sec</div>
                            </div>
                        </div>
                        <button
                            onClick={scrollToForm}
                            className="bg-[#1b5e20] hover:bg-[#0f3d12] text-white font-bold py-2 px-6 rounded border border-white/30 transition-colors shadow-lg uppercase text-sm"
                        >
                            {upcomingConsultation ? 'View Booking' : 'Book Your Call'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative w-full bg-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="relative w-full aspect-[16/6] md:aspect-[16/5]">
                        <Image
                            src="/consultation-hero.png"
                            alt="Ayurvedic Doctors Team"
                            fill
                            className="object-cover object-top"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                    Stressed over health? We got your back!
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                    Book a <span className="font-bold text-[#3e7b27]">free 30-minute consultation</span> with our expert <span className="font-bold text-[#3e7b27]">Ayurvedic doctors</span> and receive personalized health advice from the comfort of your home.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                    Need a personalized health advice or looking for Ayurvedic solutions, our specialists will guide you on your wellness journey.
                </p>

                <div className="text-left bg-green-50 p-8 rounded-xl border border-green-100 mb-12">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">What will you get:</h3>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="text-green-600 mt-1">●</span>
                            <span className="text-gray-700">Personalized Ayurvedic Guidance</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-600 mt-1">●</span>
                            <span className="text-gray-700">Lifestyle recommendations</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-green-600 mt-1">●</span>
                            <span className="text-gray-700">Dietary suggestions</span>
                        </li>
                    </ul>
                </div>

                <h3 className="text-2xl font-bold text-[#3e7b27] mb-8">
                    Book your free call now and step on your wellness journey today!
                </h3>
            </div>

            {/* Form / History Section */}
            <div id="consultation-form" className="bg-[#f1f8e9] py-16 px-4">
                <div className="max-w-4xl mx-auto">

                    {/* Upcoming Consultation View */}
                    {isAuthenticated && upcomingConsultation && !isEditing && !success && (
                        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border-t-4 border-[#3e7b27] mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Upcoming Consultation</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <p className="text-sm text-gray-700">Date</p>
                                    <p className="font-semibold text-lg text-gray-500">{new Date(upcomingConsultation.consult_date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-700">Time</p>
                                    <p className="font-semibold text-lg text-gray-500">{upcomingConsultation.consult_time}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-700">Health Issues</p>
                                    <p className="font-medium text-gray-500">{upcomingConsultation.health_issues}</p>
                                </div>
                                {upcomingConsultation.remarks && (
                                    <div className="col-span-1 md:col-span-2 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                        <p className="text-sm text-gray-500 font-bold mb-1">Doctor's Remarks</p>
                                        <p className="text-gray-800">{upcomingConsultation.remarks}</p>
                                    </div>
                                )}
                                {upcomingConsultation.meet_link && (
                                    <div className="col-span-1 md:col-span-2 bg-blue-50 p-4 rounded-lg border border-blue-200">
                                        <p className="text-sm text-blue-600 font-bold mb-1">Meeting Link</p>
                                        <a href={upcomingConsultation.meet_link} target="_blank" rel="noopener noreferrer" className="text-blue-800 underline break-all">
                                            {upcomingConsultation.meet_link}
                                        </a>
                                    </div>
                                )}
                            </div>

                            {!upcomingConsultation.meet_link ? (
                                <>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        disabled={!!upcomingConsultation.meet_link}
                                        className={`px-6 py-2 rounded-lg font-bold transition ${upcomingConsultation.meet_link ? 'bg-gray-400 cursor-not-allowed text-gray-200' : 'bg-[#3e7b27] text-white hover:bg-[#2e601b]'}`}
                                    >
                                        Update Booking
                                    </button>
                                    {upcomingConsultation.status === 'pending' && (
                                        <button
                                            onClick={handleDelete}
                                            className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition ml-4"
                                        >
                                            Cancel Consultation
                                        </button>
                                    )}
                                </>
                            ) : (
                                <div className="text-sm text-gray-500 italic">
                                    * Booking cannot be updated once a meeting link is assigned.
                                </div>
                            )}
                        </div>
                    )}

                    {/* Booking Form (New or Edit) */}
                    {(!upcomingConsultation || isEditing) && (
                        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border-t-4 border-[#3e7b27] mb-10">
                            {!isAuthenticated ? (
                                <div className="text-center py-10">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h3>
                                    <p className="text-gray-600 mb-8">Please login to book your free consultation.</p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Link href="/login" className="bg-[#3e7b27] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#2e601b] transition">
                                            Log In
                                        </Link>
                                        <Link href="/signup" className="border-2 border-[#3e7b27] text-[#3e7b27] px-8 py-3 rounded-lg font-bold hover:bg-green-50 transition">
                                            Sign Up
                                        </Link>
                                    </div>
                                </div>
                            ) : success ? (
                                <div className="text-center py-10">
                                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                                        <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{isEditing ? 'Booking Updated!' : 'Request Submitted!'}</h2>
                                    <p className="text-gray-600 mb-8">
                                        {isEditing
                                            ? 'Your consultation details have been updated successfully.'
                                            : 'Thank you for submitting your consultation request. Our team will review your details and send a meeting link to your email shortly.'}
                                    </p>
                                    <button onClick={() => { setSuccess(false); setIsEditing(false); }} className="text-[#3e7b27] font-bold hover:underline">
                                        View Details
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-8 text-center">
                                        <h2 className="text-3xl font-extrabold text-gray-900">{isEditing ? 'Update Consultation' : 'Book Your Free Consultation'}</h2>
                                        <p className="mt-2 text-gray-600">Fill in the details below to schedule your call.</p>
                                        {isEditing && (
                                            <button onClick={() => setIsEditing(false)} className="mt-2 text-sm text-red-600 hover:underline">
                                                Cancel Update
                                            </button>
                                        )}
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                                <input
                                                    type="text"
                                                    disabled
                                                    value={`${user?.firstName} ${user?.lastName}`}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 text-gray-500 sm:text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                                <input
                                                    type="email"
                                                    disabled
                                                    value={user?.email}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 text-gray-500 sm:text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                                <input
                                                    type="text"
                                                    disabled
                                                    value={user?.phone || 'Not provided'}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 text-gray-500 sm:text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                                                <input
                                                    type="number"
                                                    name="age"
                                                    id="age"
                                                    required
                                                    value={formData.age}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#3e7b27] focus:border-[#3e7b27] sm:text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                                                <input
                                                    type="text"
                                                    name="weight"
                                                    id="weight"
                                                    required
                                                    value={formData.weight}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#3e7b27] focus:border-[#3e7b27] sm:text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height (cm/ft)</label>
                                                <input
                                                    type="text"
                                                    name="height"
                                                    id="height"
                                                    required
                                                    value={formData.height}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#3e7b27] focus:border-[#3e7b27] sm:text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="consult_date" className="block text-sm font-medium text-gray-700">Preferred Date</label>
                                                <input
                                                    type="date"
                                                    name="consult_date"
                                                    id="consult_date"
                                                    required
                                                    min={new Date().toISOString().split('T')[0]}
                                                    value={formData.consult_date}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#3e7b27] focus:border-[#3e7b27] sm:text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="consult_time" className="block text-sm font-medium text-gray-700">Preferred Time</label>
                                                <input
                                                    type="time"
                                                    name="consult_time"
                                                    id="consult_time"
                                                    required
                                                    value={formData.consult_time}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#3e7b27] focus:border-[#3e7b27] sm:text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="health_issues" className="block text-sm font-medium text-gray-700">Health Issues / Reason for Consultation</label>
                                            <textarea
                                                id="health_issues"
                                                name="health_issues"
                                                rows={4}
                                                required
                                                value={formData.health_issues}
                                                onChange={handleChange}
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#3e7b27] focus:border-[#3e7b27] sm:text-sm"
                                                placeholder="Describe your symptoms or health concerns..."
                                            />
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white bg-[#3e7b27] hover:bg-[#2e601b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3e7b27] transition-all transform hover:scale-[1.02] ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                                            >
                                                {loading ? 'Submitting...' : (isEditing ? 'UPDATE CONSULTATION' : 'BOOK YOUR FREE CONSULTATION')}
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    )}

                    {/* History Table */}
                    {isAuthenticated && history.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-lg">
                            <h3 className="text-xl p-8 font-bold text-gray-900 mb-6">Consultation History</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health Issues</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booked On</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {history.map((consult) => (
                                            <tr key={consult.id} className={consult.status === 'deleted' ? 'bg-red-100' : consult.status === 'pending' ? 'bg-yellow-100' : consult.status === 'completed' ? 'bg-green-100' : 'bg-gray-100'}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {new Date(consult.consult_date).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {consult.consult_time}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {consult.health_issues}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {consult.remarks || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {consult.status || '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(consult.created_at).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div >
    );
}
