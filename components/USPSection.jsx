export default function USPSection() {
    const list = [
      "100% Natural Ingredients",
      "Ayurvedic Formulations",
      "FSSAI Approved",
      "Clinically Tested",
    ];
  
    return (
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {list.map((item) => (
            <div
              key={item}
              className="p-4 border rounded-xl text-center shadow-sm bg-[#FFF8E7]"
            >
              <p className="text-sm font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  