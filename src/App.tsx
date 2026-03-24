/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, FormEvent, ChangeEvent, useEffect } from 'react';
import { Phone, Check, ArrowRight } from 'lucide-react';

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    phoneNumber: '',
    monthlyVolume: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo(0, 0);
  };

  const scrollToForm = () => {
    if (path !== '/') {
      navigate('/');
      // Small delay to allow navigation and then scroll
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.businessName) newErrors.businessName = 'Business name is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.monthlyVolume) newErrors.monthlyVolume = 'Please select your monthly volume';
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send request');
      }

      console.log('Form submitted successfully:', formData);
      setIsSubmitted(true);
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Something went wrong. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  if (path === '/liquor-store-pos-sanford-fl') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans">
        <header className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <button onClick={() => navigate('/')} className="font-bold text-lg text-blue-700">
              Sanford Liquor Store POS
            </button>
            <a href="tel:4074765923" className="flex items-center text-blue-700 font-semibold">
              <Phone className="w-4 h-4 mr-2" />
              <span>(407) 476-5923</span>
            </a>
          </div>
        </header>
        <main className="max-w-3xl mx-auto py-16 px-4">
          <nav className="mb-8 text-sm">
            <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">Home</button>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-500">Liquor Store POS in Sanford FL</span>
          </nav>
          <h1 className="text-4xl font-bold mb-8">Liquor Store POS in Sanford FL</h1>
          
          <div className="prose prose-slate lg:prose-lg max-w-none">
            {/* Intro Section */}
            <section className="mb-12">
              <p className="text-xl text-slate-600 leading-relaxed">
                Looking for a POS system for your liquor store in Sanford? Finding the right point of sale (POS) system and credit card processing for your business doesn't have to be complicated.
              </p>
            </section>

            {/* Problem Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">The Problem: High Fees and Outdated Systems</h2>
              <p className="mb-6">
                Many liquor store owners in the Sanford area are unaware that they might be overpaying on their merchant service fees. Between interchange rates, flat fees, and hidden surcharges, the cost of doing business can add up quickly. Additionally, using an outdated POS system can lead to inventory errors and slow checkout times.
              </p>
            </section>

            {/* Solution Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">The Solution: Modern POS + Lower Fees</h2>
              <p className="mb-6">
                Our goal is to help local businesses keep more of their hard-earned money. By reviewing your current processing statements, a local specialist can identify areas where you can save. We focus specifically on the unique needs of liquor stores, from inventory management integration to high-volume transaction handling.
              </p>
            </section>

            {/* Call to Action / Form Section */}
            <section ref={formRef} className="mt-16 pt-16 border-t border-slate-100">
              <LeadForm 
                formData={formData} 
                isSubmitted={isSubmitted} 
                isSubmitting={isSubmitting}
                errors={errors} 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                setIsSubmitted={setIsSubmitted} 
              />
            </section>
            <RelatedPages navigate={navigate} />
          </div>
        </main>
        <footer className="py-12 border-t border-slate-100 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Sanford Liquor Store POS. Sanford, Florida</p>
        </footer>
      </div>
    );
  }

  if (path === '/lower-credit-card-fees-liquor-store-sanford') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans">
        <header className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <button onClick={() => navigate('/')} className="font-bold text-lg text-blue-700">
              Sanford Liquor Store POS
            </button>
            <a href="tel:4074765923" className="flex items-center text-blue-700 font-semibold">
              <Phone className="w-4 h-4 mr-2" />
              <span>(407) 476-5923</span>
            </a>
          </div>
        </header>
        <main className="max-w-3xl mx-auto py-16 px-4">
          <nav className="mb-8 text-sm">
            <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">Home</button>
            <span className="mx-2 text-slate-400">/</span>
            <button onClick={() => navigate('/liquor-store-pos-sanford-fl')} className="text-blue-600 hover:underline">Liquor Store POS</button>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-500">Lower Credit Card Fees</span>
          </nav>
          
          <h1 className="text-4xl font-bold mb-8 leading-tight">How to Lower Credit Card Fees for Liquor Stores in Sanford</h1>
          
          <div className="prose prose-slate lg:prose-lg max-w-none">
            <section className="mb-12">
              <p className="text-xl text-slate-600 leading-relaxed">
                If you run a liquor store in Sanford, card processing fees are a constant expense. Many store owners accept these costs without knowing if they can be reduced. In many cases, there are simple ways to lower what you are paying.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Where Fees Come From</h2>
              <p className="mb-4">Every card transaction includes processing fees. These can include:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>percentage-based transaction fees</li>
                <li>flat fees per transaction</li>
                <li>monthly service charges</li>
              </ul>
              <p>If your rates are higher than they should be, the cost adds up quickly.</p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Why Most Stores Overpay</h2>
              <p className="mb-6">
                Most liquor store owners are focused on running their business day to day. They do not have time to review statements or compare providers. Because of this, many stay with the same setup for years without checking if better options exist.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">What You Can Do</h2>
              <p className="mb-4">Lowering your fees usually starts with reviewing your current setup. This includes:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>checking your current rates</li>
                <li>identifying hidden fees</li>
                <li>comparing options available in your area</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Simple Next Step</h2>
              <p className="mb-6">
                We connect liquor store owners in Sanford with a local specialist who can review your current setup. They will look at your current fees and explain if there is a way to reduce them. If not, you keep what you have.
              </p>
            </section>

            <section className="mt-16 pt-16 border-t border-slate-100">
              <p className="text-xl font-medium text-center mb-10">If you want to see if you can lower your fees, start with a quick check.</p>
              <LeadForm 
                formData={formData} 
                isSubmitted={isSubmitted} 
                isSubmitting={isSubmitting}
                errors={errors} 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                setIsSubmitted={setIsSubmitted} 
              />
            </section>
            <RelatedPages navigate={navigate} />
          </div>
        </main>
        <footer className="py-12 border-t border-slate-100 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Sanford Liquor Store POS. Sanford, Florida</p>
        </footer>
      </div>
    );
  }

  if (path === '/credit-card-processing-liquor-store-sanford') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans">
        <header className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <button onClick={() => navigate('/')} className="font-bold text-lg text-blue-700">
              Sanford Liquor Store POS
            </button>
            <a href="tel:4074765923" className="flex items-center text-blue-700 font-semibold">
              <Phone className="w-4 h-4 mr-2" />
              <span>(407) 476-5923</span>
            </a>
          </div>
        </header>
        <main className="max-w-3xl mx-auto py-16 px-4">
          <nav className="mb-8 text-sm">
            <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">Home</button>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-500">Credit Card Processing</span>
          </nav>
          <h1 className="text-4xl font-bold mb-8">Credit Card Processing for Liquor Stores in Sanford</h1>
          <div className="prose prose-slate lg:prose-lg max-w-none">
            <section className="mb-12">
              <p className="text-xl text-slate-600 leading-relaxed">
                Reliable credit card processing is the backbone of any successful liquor store. In Sanford, businesses need a partner that understands high-volume retail and the importance of secure, fast transactions.
              </p>
            </section>
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Why Local Processing Matters</h2>
              <p>Working with a local specialist means you get support when you need it. We focus on providing Sanford liquor stores with transparent rates and modern equipment that integrates seamlessly with your business.</p>
            </section>
            <section className="mt-16 pt-16 border-t border-slate-100">
              <LeadForm 
                formData={formData} 
                isSubmitted={isSubmitted} 
                isSubmitting={isSubmitting}
                errors={errors} 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                setIsSubmitted={setIsSubmitted} 
              />
            </section>
            <RelatedPages navigate={navigate} />
          </div>
        </main>
        <footer className="py-12 border-t border-slate-100 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Sanford Liquor Store POS. Sanford, Florida</p>
        </footer>
      </div>
    );
  }

  if (path === '/best-pos-system-liquor-store-sanford') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans">
        <header className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <button onClick={() => navigate('/')} className="font-bold text-lg text-blue-700">
              Sanford Liquor Store POS
            </button>
            <a href="tel:4074765923" className="flex items-center text-blue-700 font-semibold">
              <Phone className="w-4 h-4 mr-2" />
              <span>(407) 476-5923</span>
            </a>
          </div>
        </header>
        <main className="max-w-3xl mx-auto py-16 px-4">
          <nav className="mb-8 text-sm">
            <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">Home</button>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-500">Best POS System</span>
          </nav>
          
          <h1 className="text-4xl font-bold mb-8 leading-tight">Best POS System for Liquor Stores in Sanford FL</h1>
          
          <div className="prose prose-slate lg:prose-lg max-w-none">
            <section className="mb-12">
              <p className="text-xl text-slate-600 leading-relaxed">
                Choosing the right POS system for your liquor store can affect both your daily operations and your costs. Many systems look similar at first, but the details matter when it comes to fees, ease of use, and long term value.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">What to Look For</h2>
              <p className="mb-4">When comparing POS systems for liquor stores, focus on:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>clear and transparent processing fees</li>
                <li>fast and reliable checkout</li>
                <li>easy inventory management</li>
                <li>support for high product volume</li>
                <li>simple setup for staff</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Common Problems</h2>
              <p className="mb-4">Many liquor store owners deal with:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>systems that are slow or outdated</li>
                <li>unclear or high processing fees</li>
                <li>complicated inventory management</li>
                <li>poor support when issues come up</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">A Practical Approach</h2>
              <p className="mb-6">
                Instead of guessing, it helps to review your current system and compare it to what is available locally. This allows you to see if your current setup is costing more than it should.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Local Option</h2>
              <p className="mb-6">
                We connect liquor store owners in Sanford with a local specialist who can review your current system and fees. They can show you if there is a better option available. If not, you can keep what you have.
              </p>
            </section>

            <section className="mt-16 pt-16 border-t border-slate-100">
              <p className="text-xl font-medium text-center mb-10">If you want to compare your current system and see if there is a better option, request a fee review.</p>
              <LeadForm 
                formData={formData} 
                isSubmitted={isSubmitted} 
                isSubmitting={isSubmitting}
                errors={errors} 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                setIsSubmitted={setIsSubmitted} 
              />
            </section>
            <RelatedPages navigate={navigate} />
          </div>
        </main>
        <footer className="py-12 border-t border-slate-100 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Sanford Liquor Store POS. Sanford, Florida</p>
        </footer>
      </div>
    );
  }

  if (path === '/pos-system-small-liquor-store-sanford') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans">
        <header className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <button onClick={() => navigate('/')} className="font-bold text-lg text-blue-700">
              Sanford Liquor Store POS
            </button>
            <a href="tel:4074765923" className="flex items-center text-blue-700 font-semibold">
              <Phone className="w-4 h-4 mr-2" />
              <span>(407) 476-5923</span>
            </a>
          </div>
        </header>
        <main className="max-w-3xl mx-auto py-16 px-4">
          <nav className="mb-8 text-sm">
            <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">Home</button>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-500">POS for Small Liquor Stores</span>
          </nav>
          <h1 className="text-4xl font-bold mb-8">POS System for Small Liquor Stores in Sanford</h1>
          <div className="prose prose-slate lg:prose-lg max-w-none">
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Small liquor stores in Sanford have specific needs. You don't need a complex enterprise system, but you do need something that works every time.
            </p>
            <h2 className="text-2xl font-bold mb-4">Simple and Effective</h2>
            <p className="mb-6">
              A good POS for a small store should focus on speed and accuracy. It should help you manage your inventory without being a full-time job. Most importantly, it should not come with high monthly fees that eat into your profits.
            </p>
            <h2 className="text-2xl font-bold mb-4">What Matters Most</h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Low monthly costs</li>
              <li>Easy to learn for new staff</li>
              <li>Reliable hardware that lasts</li>
              <li>Local support when you have a question</li>
            </ul>
            <section className="mt-16 pt-16 border-t border-slate-100">
              <LeadForm 
                formData={formData} 
                isSubmitted={isSubmitted} 
                isSubmitting={isSubmitting}
                errors={errors} 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                setIsSubmitted={setIsSubmitted} 
              />
            </section>
            <RelatedPages navigate={navigate} />
          </div>
        </main>
        <footer className="py-12 border-t border-slate-100 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Sanford Liquor Store POS. Sanford, Florida</p>
        </footer>
      </div>
    );
  }

  if (path === '/liquor-store-payment-processing-costs') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans">
        <header className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <button onClick={() => navigate('/')} className="font-bold text-lg text-blue-700">
              Sanford Liquor Store POS
            </button>
            <a href="tel:4074765923" className="flex items-center text-blue-700 font-semibold">
              <Phone className="w-4 h-4 mr-2" />
              <span>(407) 476-5923</span>
            </a>
          </div>
        </header>
        <main className="max-w-3xl mx-auto py-16 px-4">
          <nav className="mb-8 text-sm">
            <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">Home</button>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-500">Processing Costs Explained</span>
          </nav>
          <h1 className="text-4xl font-bold mb-8">Liquor Store Payment Processing Costs Explained</h1>
          <div className="prose prose-slate lg:prose-lg max-w-none">
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Understanding your processing statement can be difficult. Fees are often hidden behind complex terms and multiple categories.
            </p>
            <h2 className="text-2xl font-bold mb-4">The Breakdown</h2>
            <p className="mb-6">
              Most costs come from three areas: interchange fees (set by card networks), processor markups, and fixed monthly fees. For a liquor store, these costs can vary based on your average transaction size and the types of cards your customers use.
            </p>
            <h2 className="text-2xl font-bold mb-4">How to Evaluate Costs</h2>
            <p className="mb-6">
              The best way to understand your costs is to look at your "effective rate"—the total fees paid divided by your total sales volume. If this number is higher than expected, it's time for a review.
            </p>
            <section className="mt-16 pt-16 border-t border-slate-100">
              <LeadForm 
                formData={formData} 
                isSubmitted={isSubmitted} 
                isSubmitting={isSubmitting}
                errors={errors} 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                setIsSubmitted={setIsSubmitted} 
              />
            </section>
            <RelatedPages navigate={navigate} />
          </div>
        </main>
        <footer className="py-12 border-t border-slate-100 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Sanford Liquor Store POS. Sanford, Florida</p>
        </footer>
      </div>
    );
  }

  if (path === '/liquor-store-credit-card-fees') {
    return (
      <div className="min-h-screen bg-white text-slate-900 font-sans">
        <header className="bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <button onClick={() => navigate('/')} className="font-bold text-lg text-blue-700">
              Sanford Liquor Store POS
            </button>
            <a href="tel:4074765923" className="flex items-center text-blue-700 font-semibold">
              <Phone className="w-4 h-4 mr-2" />
              <span>(407) 476-5923</span>
            </a>
          </div>
        </header>
        <main className="max-w-3xl mx-auto py-16 px-4">
          <nav className="mb-8 text-sm">
            <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">Home</button>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-500">Credit Card Fees Guide</span>
          </nav>
          <h1 className="text-4xl font-bold mb-8">How Much Do Liquor Stores Pay in Credit Card Fees?</h1>
          <div className="prose prose-slate lg:prose-lg max-w-none">
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Many store owners ask what a "normal" fee is. While it varies, most liquor stores in Sanford pay between 2% and 4% on average.
            </p>
            <h2 className="text-2xl font-bold mb-4">Factors That Affect Your Fees</h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Your total monthly sales volume</li>
              <li>The average price of a customer's purchase</li>
              <li>Whether you use flat-rate or interchange-plus pricing</li>
              <li>The specific types of cards (debit vs. rewards credit cards)</li>
            </ul>
            <h2 className="text-2xl font-bold mb-4">Getting a Clear Answer</h2>
            <p className="mb-6">
              The only way to know exactly what you are paying—and if you can pay less—is to have a specialist review your actual statements. We provide this review for local Sanford businesses at no cost.
            </p>
            <section className="mt-16 pt-16 border-t border-slate-100">
              <LeadForm 
                formData={formData} 
                isSubmitted={isSubmitted} 
                isSubmitting={isSubmitting}
                errors={errors} 
                handleChange={handleChange} 
                handleSubmit={handleSubmit} 
                setIsSubmitted={setIsSubmitted} 
              />
            </section>
            <RelatedPages navigate={navigate} />
          </div>
        </main>
        <footer className="py-12 border-t border-slate-100 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Sanford Liquor Store POS. Sanford, Florida</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      {/* 1. Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="font-bold text-lg tracking-tight text-blue-700">
            Sanford Liquor Store POS
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors">Home</button>
            <button onClick={scrollToForm} className="hover:text-blue-600 transition-colors">How It Works</button>
            <button onClick={scrollToForm} className="hover:text-blue-600 transition-colors">Contact</button>
          </nav>
          <div className="flex items-center">
            <a href="tel:4074765923" className="flex items-center text-blue-700 font-semibold hover:text-blue-800 transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">(407) 476-5923</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* 2. Hero Section */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-8">
            Find Out If Your Liquor Store Is Overpaying on Card Fees
          </h1>
          <p className="text-xl text-slate-600 max-w-xl mx-auto mb-12 leading-relaxed">
            We connect you with a local specialist who will review your current setup and show you if you can save money.
          </p>
          <div className="space-y-6">
            <p className="text-sm font-bold text-blue-600 uppercase tracking-wider">Most checks show savings.</p>
            <button 
              onClick={scrollToForm}
              className="bg-blue-600 text-white px-10 py-5 rounded-md font-bold text-xl hover:bg-blue-700 transition-all shadow-lg active:scale-95"
            >
              Request Fee Review
            </button>
            <p className="text-sm text-slate-500">Takes 2 minutes. No obligation.</p>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-100 max-w-2xl mx-auto">
            <p className="text-slate-800 font-semibold text-lg">
              If your store runs more than $5,000 a month in card sales, you should check this.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
              <button onClick={() => navigate('/liquor-store-pos-sanford-fl')} className="text-blue-600 hover:underline">Liquor Store POS</button>
              <button onClick={() => navigate('/lower-credit-card-fees-liquor-store-sanford')} className="text-blue-600 hover:underline">Lower Your Fees</button>
              <button onClick={() => navigate('/credit-card-processing-liquor-store-sanford')} className="text-blue-600 hover:underline">Credit Card Processing</button>
              <button onClick={() => navigate('/best-pos-system-liquor-store-sanford')} className="text-blue-600 hover:underline">Best POS Systems</button>
              <button onClick={() => navigate('/pos-system-small-liquor-store-sanford')} className="text-blue-600 hover:underline">Small Store POS</button>
              <button onClick={() => navigate('/liquor-store-payment-processing-costs')} className="text-blue-600 hover:underline">Processing Costs</button>
              <button onClick={() => navigate('/liquor-store-credit-card-fees')} className="text-blue-600 hover:underline">Fee Guide</button>
            </div>
            <p className="text-slate-500 mt-4 font-medium">Serving local Sanford businesses.</p>
          </div>
        </section>

        {/* 5. Lead Form Section */}
        <section ref={formRef} id="contact-form" className="py-20 bg-slate-50 px-4 sm:px-6 lg:px-8 border-y border-slate-100">
          <LeadForm 
            formData={formData} 
            isSubmitted={isSubmitted} 
            isSubmitting={isSubmitting}
            errors={errors} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
            setIsSubmitted={setIsSubmitted} 
          />
          <div className="max-w-xl mx-auto">
            <RelatedPages navigate={navigate} />
          </div>
        </section>

        {/* 3. Problem Section */}
        <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-slate-900">You Could Be Losing Money Every Month</h2>
            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p>Most liquor stores pay fees on every card sale.</p>
              <p>Even a small difference in rates can cost you hundreds or thousands over time.</p>
              <p>Many owners never check their rates, so they keep paying the same fees without knowing if there is a better option.</p>
            </div>
          </div>
        </section>

        {/* 4. Solution Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-slate-900">A Simple Way to Check Your Rates</h2>
              <div className="space-y-4 text-lg text-slate-700 leading-relaxed mb-8">
                <p>We help liquor store owners in Sanford take a quick look at what they are paying now.</p>
                <p>If there is a way to lower your fees, we will show you.</p>
                <p>If not, you keep what you have.</p>
                <p>No pressure.</p>
              </div>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
              <ul className="space-y-4">
                {[
                  'quick fee review',
                  'clear explanation',
                  'no obligation',
                  'local support'
                ].map((item) => (
                  <li key={item} className="flex items-center text-slate-800 font-medium">
                    <Check className="w-5 h-5 text-blue-600 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 6. Trust Section */}
        <section className="py-16 bg-slate-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-slate-900">Local and Straightforward</h2>
            <ul className="space-y-6">
              {[
                'Focused on Sanford businesses',
                'No upfront cost to review your rates',
                'Clear and simple process',
                'You can keep your current setup if you choose'
              ].map((item) => (
                <li key={item} className="flex items-start text-lg text-slate-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2.5 mr-4 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7. Final Call to Action */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-white">
          <div className="max-w-2xl mx-auto">
            <p className="text-2xl font-medium text-slate-900 mb-10">
              If you are open to lowering your fees, start with a quick check.
            </p>
            <button 
              onClick={scrollToForm}
              className="bg-blue-600 text-white px-10 py-5 rounded-md font-bold text-xl hover:bg-blue-700 transition-all shadow-lg active:scale-95"
            >
              Request Fee Review
            </button>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-100 text-center text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Sanford Liquor Store POS. All rights reserved.</p>
          <p className="mt-2">Sanford, Florida</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate('/')} className="hover:underline">Home</button>
            <button onClick={() => navigate('/liquor-store-pos-sanford-fl')} className="hover:underline">
              Liquor Store POS in Sanford FL
            </button>
            <button onClick={() => navigate('/lower-credit-card-fees-liquor-store-sanford')} className="hover:underline">
              Lower Credit Card Fees
            </button>
            <button onClick={() => navigate('/credit-card-processing-liquor-store-sanford')} className="hover:underline">
              Credit Card Processing
            </button>
            <button onClick={() => navigate('/best-pos-system-liquor-store-sanford')} className="hover:underline">
              Best POS Systems
            </button>
            <button onClick={() => navigate('/pos-system-small-liquor-store-sanford')} className="hover:underline">
              Small Store POS
            </button>
            <button onClick={() => navigate('/liquor-store-payment-processing-costs')} className="hover:underline">
              Processing Costs
            </button>
            <button onClick={() => navigate('/liquor-store-credit-card-fees')} className="hover:underline">
              Fee Guide
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

const RelatedPages = ({ navigate }: { navigate: (to: string) => void }) => (
  <section className="mt-16 pt-8 border-t border-slate-100">
    <h3 className="text-lg font-bold mb-4 text-slate-900">Related Pages</h3>
    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
      <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">Home</button>
      <button onClick={() => navigate('/liquor-store-pos-sanford-fl')} className="text-blue-600 hover:underline">Liquor Store POS in Sanford</button>
      <button onClick={() => navigate('/lower-credit-card-fees-liquor-store-sanford')} className="text-blue-600 hover:underline">How to Lower Credit Card Fees</button>
      <button onClick={() => navigate('/credit-card-processing-liquor-store-sanford')} className="text-blue-600 hover:underline">Credit Card Processing for Liquor Stores</button>
      <button onClick={() => navigate('/best-pos-system-liquor-store-sanford')} className="text-blue-600 hover:underline">Best POS System for Liquor Stores</button>
      <button onClick={() => navigate('/pos-system-small-liquor-store-sanford')} className="text-blue-600 hover:underline">POS for Small Liquor Stores</button>
      <button onClick={() => navigate('/liquor-store-payment-processing-costs')} className="text-blue-600 hover:underline">Payment Processing Costs</button>
      <button onClick={() => navigate('/liquor-store-credit-card-fees')} className="text-blue-600 hover:underline">Credit Card Fees Guide</button>
    </div>
  </section>
);

interface LeadFormProps {
  formData: any;
  isSubmitted: boolean;
  isSubmitting: boolean;
  errors: Record<string, string>;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  setIsSubmitted: (val: boolean) => void;
}

const LeadForm = ({ formData, isSubmitted, isSubmitting, errors, handleChange, handleSubmit, setIsSubmitted }: LeadFormProps) => (
  <div className="max-w-xl mx-auto">
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold mb-4 text-slate-900">Request a Fee Review</h2>
      <p className="text-slate-600 mb-2">Fill this out and we will connect you with a local specialist to review your current setup.</p>
      <p className="text-sm text-slate-500 italic">We will review your information and connect you with a local representative.</p>
    </div>

    {isSubmitted ? (
      <div className="bg-green-50 border border-green-200 p-8 rounded-lg text-center">
        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-green-900 mb-2">Thank you.</h3>
        <p className="text-green-800">We will contact you shortly.</p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="mt-6 text-sm text-green-700 underline hover:text-green-800"
        >
          Send another request
        </button>
      </div>
    ) : (
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-md border ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-slate-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
            placeholder="John Doe"
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-slate-700 mb-1">Business Name</label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-md border ${errors.businessName ? 'border-red-500 bg-red-50' : 'border-slate-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
            placeholder="Sanford Spirits"
          />
          {errors.businessName && <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>}
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-md border ${errors.phoneNumber ? 'border-red-500 bg-red-50' : 'border-slate-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
            placeholder="(407) 476-5923"
          />
          {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
        </div>

        <div>
          <label htmlFor="monthlyVolume" className="block text-sm font-medium text-slate-700 mb-1">Estimated Monthly Card Volume</label>
          <select
            id="monthlyVolume"
            name="monthlyVolume"
            value={formData.monthlyVolume}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-md border ${errors.monthlyVolume ? 'border-red-500 bg-red-50' : 'border-slate-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white`}
          >
            <option value="">Select volume...</option>
            <option value="under-5k">Under $5,000</option>
            <option value="5k-20k">$5,000 - $20,000</option>
            <option value="20k-50k">$20,000 - $50,000</option>
            <option value="50k-100k">$50,000 - $100,000</option>
            <option value="over-100k">Over $100,000</option>
          </select>
          {errors.monthlyVolume && <p className="mt-1 text-sm text-red-600">{errors.monthlyVolume}</p>}
        </div>

        {errors.submit && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm mb-6">
            {errors.submit}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white py-4 rounded-md font-bold text-lg hover:bg-blue-700 transition-all shadow-md flex items-center justify-center group ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Sending...' : 'Submit Request'}
          {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
        </button>
      </form>
    )}
  </div>
);
