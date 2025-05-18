import React from 'react';

interface SubscriptionFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier: {
    name: string;
    price: string;
  } | null;
}

interface FormData {
  name: string;
  whatsapp: string;
  discord: string;
  mpesaId: string;
  email: string;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ isOpen, onClose, selectedTier }) => {
  const [formData, setFormData] = React.useState<FormData>({
    name: '',
    whatsapp: '',
    discord: '',
    mpesaId: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://formspree.io/f/xbloyloq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          subscriptionTier: selectedTier?.name,
          subscriptionPrice: selectedTier?.price,
          formType: 'Subscription Registration'
        })
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          whatsapp: '',
          discord: '',
          mpesaId: '',
          email: ''
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch {
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ×
        </button>

        {success ? (
          <div className="text-center py-8">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-white mb-2">Registration Successful!</h3>
            <p className="text-gray-400 mb-6">
              Thank you for joining {selectedTier?.name}. We&apos;ll verify your payment and contact you shortly.
            </p>
            <button
              onClick={onClose}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-6">
              Join {selectedTier?.name}
            </h2>
            <p className="text-gray-400 mb-6">
              Please complete your registration for {selectedTier?.name} ({selectedTier?.price}/month)
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300 mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your WhatsApp number"
                />
              </div>

              <div>
                <label htmlFor="discord" className="block text-sm font-medium text-gray-300 mb-1">
                  Discord Username
                </label>
                <input
                  type="text"
                  id="discord"
                  name="discord"
                  value={formData.discord}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your Discord username"
                />
              </div>

              <div>
                <label htmlFor="mpesaId" className="block text-sm font-medium text-gray-300 mb-1">
                  M-Pesa Transaction ID
                </label>
                <input
                  type="text"
                  id="mpesaId"
                  name="mpesaId"
                  value={formData.mpesaId}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter M-Pesa transaction ID"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg bg-green-500 text-white font-medium transition-all duration-200 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? 'Submitting...' : 'Complete Registration'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SubscriptionForm; 