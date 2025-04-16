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
    <div className=" py-10 ">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-600 mb-2">FAQ</h2>
          <div className="w-16 h-0.5 bg-gray-600 mx-auto"></div>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-2 bg-white rounded  overflow-hidden text-sm"
              
            >
             
              <button
                className="w-full px-4 py-3 text-left flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gray-800">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-600 transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === index ? 'max-h-32' : 'max-h-0'
                }`}
              >
                <div className="px-4 py-2  text-gray-700 border-t border-gray-500 text-xs">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Help text */}
        <div className="text-center mt-4">
          <p className="text-gray-600 text-xs">
            Questions? Email{' '}
            <a href="mailto:support@lascentio.com" className="font-medium">
              support@lascentio.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;