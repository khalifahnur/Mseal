import { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  HelpCircle,
  ArrowUpRight,
  CreditCard,
  Clock,
  Award,
  Tag,
} from "lucide-react";

export default function MembershipFAQ() {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const faqs = [
    {
      question: "How do I upgrade my membership?",
      answer:
        "You can upgrade your membership at any time by selecting a new plan above. The price difference will be prorated.",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      question: "Can I cancel my membership?",
      answer:
        "Yes, you can cancel your membership at any time. Refunds are available within 14 days of purchase.",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      question: "How do I earn membership points?",
      answer:
        "You earn points by attending matches, purchasing merchandise, and participating in member events.",
      icon: <Award className="h-5 w-5" />,
    },
    {
      question: "What happens when I reach a new tier?",
      answer:
        "You'll automatically receive all the benefits of your new tier and a notification to celebrate your achievement.",
      icon: <Tag className="h-5 w-5" />,
    },
  ];

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <div className="max-w-full mx-auto">
      <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
        <div className="relative">
          <div className="h-2 bg-gradient-to-r from-primary via-gray-600 to-black"></div>
          <div className="p-6 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-gray-800">
                Frequently Asked Questions
              </h2>
            </div>
            <p className="text-gray-500">
              Common questions about our membership program
            </p>
          </div>
        </div>
        <div className="px-6 pb-4">
          <div className="divide-y divide-gray-100">
            {faqs.map((faq, index) => (
              <div key={index} className="py-4">
                <button
                  onClick={() => toggleExpanded(index)}
                  className={`flex items-center justify-between w-full text-left ${
                    expandedIndex === index ? "text-primary" : "text-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        expandedIndex === index
                          ? "bg-indigo-100 text-primary"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {faq.icon}
                    </div>
                    <span className="font-medium">{faq.question}</span>
                  </div>
                  {expandedIndex === index ? (
                    <ChevronUp className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 flex-shrink-0" />
                  )}
                </button>

                {expandedIndex === index && (
                  <div className="mt-3 pl-12 pr-6 text-gray-600 animate-fadeIn">
                    <p className="text-sm">{faq.answer}</p>
                    <div className="mt-3 pt-2 border-t border-gray-100">
                      <button className="inline-flex items-center text-xs font-medium text-primary hover:text-primary/10 transition-colors">
                        Learn more about this{" "}
                        <ArrowUpRight className="ml-1 h-3 w-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <button className="w-full py-2.5 px-4 bg-yellow-400/20 text-yellow-400 border-yellow-400/30 hover:bg-yellow-400/30 hover:text-yellow-400 transition-all font-medium rounded-lg border  flex items-center justify-center gap-2">
            View All FAQs
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
        <div className="h-2 bg-gradient-to-r from-primary via-gray-600 to-black"></div>
      </div>
    </div>
  );
}
