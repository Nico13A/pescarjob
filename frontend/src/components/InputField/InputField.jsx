export const InputField = ({ label, id, name, type = "text", value, onChange, placeholder, error }) => {
  return (
    <div>
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="text-xs md:text-base w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
