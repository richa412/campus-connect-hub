import { Button } from "@/components/ui/button";
import { marketplaceListings } from "@/data/campusData";
import { MessageCircle, ShoppingBag } from "lucide-react";

const MarketplacePage = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <h1 className="text-4xl font-bold tracking-tight text-white">Marketplace</h1>
        <Button size="lg" className="rounded-xl shadow-indigo-500/25">
          <ShoppingBag className="h-5 w-5 mr-2" /> List an Item
        </Button>
      </div>

      {marketplaceListings.length === 0 && (
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-10 shadow-xl text-center">
          <ShoppingBag className="mx-auto h-10 w-10 text-indigo-300" />
          <h2 className="mt-4 text-2xl font-bold text-white">No listings yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
            Books, devices, furniture, and other student-to-student listings will appear here after students add items.
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {marketplaceListings.map((item) => (
          <div key={item.id} className="group bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:border-white/20">
            <div className="aspect-[16/10] bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent flex items-center justify-center relative overflow-hidden">
              <ShoppingBag className="h-16 w-16 text-indigo-400/20 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 right-4">
                <span className="bg-white/10 backdrop-blur-md text-[10px] font-bold text-white px-3 py-1.5 rounded-lg border border-white/10 uppercase tracking-widest">
                  {item.condition}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1 block">{item.category}</span>
                <h3 className="font-bold text-xl text-white group-hover:text-indigo-300 transition-colors line-clamp-1">{item.title}</h3>
              </div>

              <div className="flex items-center justify-between mb-6">
                <p className="text-2xl font-black text-white">{item.price}</p>
                <span className="text-xs font-bold text-gray-500">By {item.seller}</span>
              </div>

              <Button variant="outline" size="sm" className="w-full rounded-xl border-white/10 hover:bg-white/10 font-bold py-6">
                <MessageCircle className="h-4 w-4 mr-2 text-indigo-400" /> Contact Seller
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketplacePage;
