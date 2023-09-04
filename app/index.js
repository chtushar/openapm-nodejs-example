const { faker } = require("@faker-js/faker");
const express = require("express");
const { Order } = require("./db");
const { OpenAPM } = require("@last9/openapm");

// Initialize openAPM
const openapm = new OpenAPM();

// pass mysql as string value to initialize DB monitoring specifically for MySQL only.
openapm.instrument("mysql");

const app = express();
const port = 6080;

app.use(express.json());
app.use(openapm.REDMiddleware);

// Insert fake data function
async function insertFakeData() {
  let customerName = faker.name.fullName();
  let product = faker.commerce.productName();
  let quantity = faker.number.int({
    min: 1,
    max: 100,
  });

  const order = await Order.create({
    customerName: customerName,
    product: product,
    quantity: quantity,
  });

  console.log("Data insertion complete.");

  return order;
}

// Create Order API
app.post("/orders", async (req, res) => {
  const { customerName, product, quantity } = req.body;

  try {
    const order = insertFakeData();
    res.status(201).json({ message: "Order stored", orderId: order.id });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

// Delete Last Order API
app.delete("/orders/last", async (req, res) => {
  try {
    // await throttle()
    const lastOrder = await Order.findOne({
      order: [["id"]], // Find the order with the highest id (last order)
    });

    if (!lastOrder) {
      return res.status(404).json({ message: "No orders found" });
    }

    await lastOrder.destroy();

    res.json({ message: "Last order deleted" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.listen(process.env.PORT ?? port, () => {
  console.log(`Server is running on port ${process.env.PORT ?? port}`);
});
