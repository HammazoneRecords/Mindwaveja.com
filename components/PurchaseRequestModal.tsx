'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { trackPurchaseClick } from '@/lib/analytics';

interface PurchaseRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    itemName: string;
    itemPrice: string;
    itemType: 'pack' | 'product';
}

export function PurchaseRequestModal({
    isOpen,
    onClose,
    itemName,
    itemPrice,
    itemType,
}: PurchaseRequestModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        // Track purchase attempt
        trackPurchaseClick(itemName, itemType);

        try {
            const response = await fetch('/api/purchase-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    itemName,
                    itemPrice,
                    itemType,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit order');
            }

            setSubmitStatus('success');
            setTimeout(() => {
                onClose();
                setFormData({ name: '', email: '', phone: '' });
                setSubmitStatus('idle');
            }, 3000);
        } catch (error) {
            console.error('Order submission error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-elevated rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-primary">
                    <h2 className="text-2xl font-display font-bold text-primary">
                        Request Purchase
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-secondary rounded-full transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5 text-secondary" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {submitStatus === 'success' ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-8 h-8 text-brand-green"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-2">
                                Order Received!
                            </h3>
                            <p className="text-secondary">
                                Check your email for bank transfer instructions.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Item Info */}
                            <div className="bg-secondary rounded-2xl p-4 mb-6">
                                <p className="text-sm text-tertiary mb-1">You're ordering:</p>
                                <p className="font-bold text-primary text-lg">{itemName}</p>
                                <p className="text-brand-red font-bold text-xl mt-2">{itemPrice}</p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-secondary border border-primary rounded-xl text-primary placeholder-tertiary focus:outline-none focus:ring-2 focus:ring-brand-red transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-secondary border border-primary rounded-xl text-primary placeholder-tertiary focus:outline-none focus:ring-2 focus:ring-brand-red transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 bg-secondary border border-primary rounded-xl text-primary placeholder-tertiary focus:outline-none focus:ring-2 focus:ring-brand-red transition-all"
                                        placeholder="+1 876 XXX XXXX"
                                    />
                                </div>

                                {submitStatus === 'error' && (
                                    <div className="bg-brand-red/10 border border-brand-red/20 rounded-xl p-4">
                                        <p className="text-brand-red text-sm">
                                            Something went wrong. Please try again or contact us directly.
                                        </p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bold py-4 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Order Request'}
                                </button>

                                <p className="text-xs text-tertiary text-center">
                                    You'll receive bank transfer instructions via email
                                </p>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
