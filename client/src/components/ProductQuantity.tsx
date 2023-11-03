interface PropType {
  quantity: number;
  setQuantity: any;
}

const ProductQuantity = (props: PropType) => {
  const { quantity, setQuantity } = props;

  return (
    <div className="flex items-center gap-5">
      <div
        className={`w-[35px] h-[35px] flex items-center p-2 rounded-full hover:cursor-pointer ${
          quantity > 1 ? "bg-[#e57905]" : "bg-gray-400"
        }`}
        onClick={() => {
          if (quantity > 1) {
            setQuantity(quantity - 1);
          }
        }}
      >
        <img
          className="w-[100%]"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMiIgdmlld0JveD0iMCAwIDE2IDIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSIyIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K"
          alt="increase"
        />
      </div>
      <p>{quantity}</p>
      <div
        className="w-[35px] h-[35px] flex items-center bg-[#e57905] p-2 rounded-full hover:cursor-pointer"
        onClick={() => {
          setQuantity(quantity + 1);
        }}
      >
        <img
          className="w-[100%]"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuODU3MTQgNi44NTcxNFYwSDkuMTQyODZWNi44NTcxNEgxNlY5LjE0Mjg2SDkuMTQyODZWMTZINi44NTcxNFY5LjE0Mjg2SDBWNi44NTcxNEg2Ljg1NzE0WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg=="
          alt="increase"
        />
      </div>
    </div>
  );
};

export default ProductQuantity;
