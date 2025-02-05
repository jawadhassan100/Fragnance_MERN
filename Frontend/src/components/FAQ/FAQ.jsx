import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: "What types of perfumes do you offer?",
      answer: "We offer a wide range of high-quality fragrances inspired by popular scents, available for both men and women."
    },
    {
      question: "How can I order from LaScentio Fragrances?",
      answer: "Simply visit our website, select your desired fragrances, and place an order for home or Office delivery."
    },
    {
      question: "Can I return or exchange a product?",
      answer: "Yes, returns and exchanges are accepted within a specified period, as outlined in our return policy."
    },
    {
      question: "Are your perfumes original?",
      answer: "While our perfumes are inspired by popular fragrances, we ensure that each scent is uniquely crafted for a distinct experience."
    },
    {
      question: "Are the perfumes safe for sensitive skin?",
      answer: "Our perfumes are crafted with premium ingredients, suitable for most skin types. However, we recommend a patch test if you have sensitive skin."
    },
    {
      question: "What payment options do you accept?",
      answer: "We accept multiple payment methods including credit/debit cards & Cash on Delivery for your convenience."
    },
    {
      question: "What is your disclaimer regarding fragrance impressions?",
      answer: "Our fragrances are not affiliated with or endorsed by the brands they are inspired by. They are crafted to provide a similar experience."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-emerald-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-emerald-800 mb-6">Frequently Asked Questions</h2>
          <div className="w-24 h-1 bg-emerald-600 mx-auto"></div>
        </div>

        {/* FAQ Items */}
        <div className="max-w-5xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 bg-white  rounded-lg shadow-md overflow-hidden  border-emerald-600"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center cursor-pointer transition-colors duration-200"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-emerald-800">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-emerald-600 transform transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-40' : 'max-h-0'
                }`}
              >
                <div className="px-6 py-4 text-emerald-700  border-t border-emerald-200">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Help text */}
        <div className="text-center mt-8">
          <p className="text-emerald-600">
            Still have questions? Contact our support team at{' '}
            <a href="mailto:support@lascentio.com" className="font-medium hover:text-emerald-800">
              support@lascentio.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;