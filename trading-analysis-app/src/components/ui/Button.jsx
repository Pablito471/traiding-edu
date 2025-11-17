const Button = ({
  children,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
    secondary:
      "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500",
    success: "bg-success text-white hover:bg-green-600 focus:ring-green-500",
    warning: "bg-warning text-white hover:bg-yellow-600 focus:ring-yellow-500",
    error: "bg-error text-white hover:bg-red-600 focus:ring-red-500",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
  };

  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          Cargando...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
