export default function ProductCard({ item, onAdd }) {
  return (
    <div className="group bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">{item.name}</h3>
          <span className="font-bold">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">{item.brand}</p>
        {item.colors?.length > 0 && (
          <div className="flex gap-2 mt-3">
            {item.colors.slice(0,4).map((c, i) => (
              <span key={i} className="w-4 h-4 rounded-full border" style={{ backgroundColor: c.toLowerCase() }} title={c} />
            ))}
          </div>
        )}
        <button onClick={() => onAdd(item)} className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-900">
          Add to bag
        </button>
      </div>
    </div>
  )
}
