import { Truck, RotateCcw, Headset } from "lucide-react";

const features = [
  {
    title: "Free Delivery",
    description: "Enjoy Free Delivery in UAE for all orders above AED 150.",
    icon: Truck,
  },
  {
    title: "Easy Returns & Exchange",
    description: "Not Happy with the Product? You can return or exchange it within 7 days of purchase.",
    icon: RotateCcw,
  },
  {
    title: "24/7 Customer Service",
    description: "Need assistance? We are always here to help you.",
    icon: Headset,
  },
];

const Features = () => {
  return (
    <section className="bg-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-lg  "
              >
                <div className="text-green-600 bg-green-50 p-3 rounded-full mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="font-semibold text-base text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;