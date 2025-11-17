const Card = ({
  children,
  className = "",
  padding = "medium",
  hover = false,
  ...props
}) => {
  const paddingStyles = {
    none: "",
    small: "p-4",
    medium: "p-6",
    large: "p-8",
  };

  return (
    <div
      className={`
        bg-white rounded-lg border border-gray-200
        ${paddingStyles[padding]}
        ${hover ? "hover:shadow-md transition-shadow duration-200" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
