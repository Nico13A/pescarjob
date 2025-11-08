export default function CardFeature({ icon: Icon, color, bgColor, title, description }) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100 flex flex-col items-center">
      <div className={`rounded-2xl p-3 mb-4 flex items-center justify-center w-14 h-14 ${bgColor}`}>
        <Icon className={`${color} w-7 h-7`} />
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
