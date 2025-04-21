import { useEffect, useState } from "react";
import { X } from "lucide-react";

const perfumes = [
  "Gilded Girl",
  "Elegant Coco",
  "Pure Grace",
  "Wild Elegance",
  "Velvet Temptation",
  "Aventis Noir",
  "Bleu Horizon",
  "Savage Essence",
  "Bold Desire",
  "Timeless Gentleman",
  "Velvet Orchids",
];

const generateRandomMessage = () => {
  const perfume = perfumes[Math.floor(Math.random() * perfumes.length)];
  const quantity = Math.floor(Math.random() * 5) + 1;

  const templates = [
    `🧴 ${quantity} bottle${quantity > 1 ? "s" : ""} of <b>${perfume}</b> just sold`,
    `🛍️ Someone just placed an order for <b>${perfume}</b>`,
    `🔥 <b>${perfume}</b> is trending right now`,
    `🚚 Order for <b>${perfume}</b> has been dispatched`,
    `🌟 <b>${perfume}</b> just received a 5-star review`,
    `✨ ${quantity > 1 ? quantity + " units" : "One bottle"} of <b>${perfume}</b> sold just now`,
    `💫 Limited stock left for <b>${perfume}</b> – selling fast!`,
    `🎁 Gift set featuring <b>${perfume}</b> was just ordered`,
    `🧴 Another fan just purchased <b>${perfume}</b>`,
    `💖 <b>${perfume}</b> is becoming a UAE favorite!`,
  ];

  return templates[Math.floor(Math.random() * templates.length)];
};

const FakeNotifications = () => {
  const [visible, setVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    const showNotification = () => {
      setCurrentMessage(generateRandomMessage());
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, 6000);
    };

    const interval = setInterval(() => {
      showNotification();
    }, Math.floor(Math.random() * (30000 - 10000 + 1)) + 10000);

    showNotification();

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50">
      <div className="relative bg-white/90 border border-gray-200 backdrop-blur-md shadow-xl  px-5 py-4 max-w-sm w-full text-gray-800 animate-slide-in-left transition-all duration-300 ease-in-out">
        <button
          className="absolute top-1 right-1 text-gray-500 hover:text-black"
          onClick={() => setVisible(false)}
        >
          <X size={18} />
        </button>
        <p
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: currentMessage }}
        />
      </div>
    </div>
  );
};

export default FakeNotifications;
