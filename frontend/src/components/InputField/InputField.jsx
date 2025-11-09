export const InputField = ({ label, id, name, type = "text", value, onChange, placeholder, error }) => {
  return (
    <div>
      {label && <label htmlFor={id} className="block text-sm font-semibold text-gray-500 mb-1">{label}</label>}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="text-xs md:text-base w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-red-500 text-xs md:text-sm mt-1">{error}</p>}
    </div>
  );
}
