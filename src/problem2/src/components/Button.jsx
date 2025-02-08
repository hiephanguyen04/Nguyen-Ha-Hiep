const Button = ({ onClick, loading, children }) => {
  return (
    <button
      className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:opacity-50"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? "Swapping..." : children}
    </button>
  );
};

export default Button;
