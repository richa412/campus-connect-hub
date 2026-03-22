import { ShoppingBag, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const listings = [
  { id: 1, title: "MacBook Air M2 (2024)", price: "₹65,000", category: "Electronics", seller: "Rahul S.", condition: "Like New" },
  { id: 2, title: "Data Structures & Algorithms (Cormen)", price: "₹350", category: "Books", seller: "Nisha P.", condition: "Good" },
  { id: 3, title: "Acoustic Guitar — Yamaha F310", price: "₹7,500", category: "Music", seller: "Arjun M.", condition: "Used" },
  { id: 4, title: "TI-84 Plus Calculator", price: "₹4,200", category: "Electronics", seller: "Priya S.", condition: "Like New" },
  { id: 5, title: "Desk Lamp — LED Adjustable", price: "₹800", category: "Furniture", seller: "Karan V.", condition: "New" },
  { id: 6, title: "Organic Chemistry (Morrison & Boyd)", price: "₹280", category: "Books", seller: "Ananya G.", condition: "Good" },
];

const MarketplacePage = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Marketplace</h1>
        <Button variant="hero" size="sm"><ShoppingBag className="h-4 w-4 mr-1" /> List Item</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map((item) => (
          <div key={item.id} className="bg-card rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
            <div className="aspect-[4/3] bg-muted flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground/30" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold text-sm leading-snug">{item.title}</h3>
              </div>
              <p className="text-lg font-bold text-primary mb-2">{item.price}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{item.condition} · {item.category}</span>
                <span>{item.seller}</span>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                <MessageCircle className="h-3.5 w-3.5 mr-1" /> Contact Seller
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketplacePage;
