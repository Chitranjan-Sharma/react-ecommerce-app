export const rupee = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

export const getPrice = (MRP) => {
    return rupee.format(MRP);
  };

export const categories=[
    "Mobile & Smartphones",
    "Electronics",
    "Life Style",
    "Watches & Bands",
    "Cloths",
    "Fashions",
    "Laptops & Desktop",
    "Books & Stationary"
];