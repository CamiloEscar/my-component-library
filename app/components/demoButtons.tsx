const Button = ({ label }: { label: string }) => {
  return (
    <button className="bg-primary text-white py-2 px-4 rounded">
      {label}
    </button>
  );
};

export default Button;