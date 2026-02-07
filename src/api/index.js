import productRoutes from "./module/product/route.js";

const setupRoutes = (app) => {

app.use("/api/products", productRoutes);

}

export default setupRoutes;