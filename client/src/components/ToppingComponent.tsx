const ToppingComponent = (props: { topping: any, isActive: boolean, handleAddTopping: any }) => {
    const { topping, isActive, handleAddTopping } = { ...props }
    return (
        <div
            className={`py-2 px-5 flex items-center gap-3 rounded-md border hover:cursor-pointer ${isActive
                ? "text-white bg-[#e57905] border-[#e57905]"
                : "text-gray-600 bg-white border-gray-400"
                }`}
            onClick={() => {
                handleAddTopping(topping.toppingId, topping.toppingPrice / 1000);
            }}
        >
            <p className="text-sm">{topping.toppingName} + {topping.toppingPrice} đ</p>
        </div>
    )
}

export default ToppingComponent