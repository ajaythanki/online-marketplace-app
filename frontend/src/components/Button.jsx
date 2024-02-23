const Button = ({
  label,
  iconURL,
  backgroundColor,
  borderColor,
  textColor,
  fullWidth
}) => {
  return (
    <button
      className={`flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none ${
        backgroundColor || `bg-coral-red`
      } rounded-full ${textColor || `text-white`} ${
        borderColor || `border-coral-red`
      }
      ${fullWidth && `w-full`} hover:border-red-600 hover:text-white hover:bg-red-600 transition-all duration-300`}
    >
      {label}
      {iconURL && (
        <img src={iconURL} alt={label} className="ml-2 rounded-full w-5 h-5" />
      )}
    </button>
  );
};

export default Button;
