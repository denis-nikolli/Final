const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const rentalLocations = [
  "Tirana Airport",
  "Tirana City Center",
  "Durres Port",
  "Sarande Ferry Terminal",
  "Vlore Promenade",
];

const dataFile = path.join(__dirname, "data.json");

const defaultCars = [
  { id: 1, name: "Volkswagen Polo", type: "city", transmission: "Automatic", seats: 5, bags: 2, price: 32 },
  { id: 2, name: "Toyota Yaris Hybrid", type: "city", transmission: "Automatic", seats: 5, bags: 2, price: 36 },
  { id: 3, name: "Skoda Octavia", type: "city", transmission: "Automatic", seats: 5, bags: 3, price: 44 },
  { id: 4, name: "Dacia Duster", type: "suv", transmission: "Manual", seats: 5, bags: 4, price: 48 },
  { id: 5, name: "Hyundai Tucson", type: "suv", transmission: "Automatic", seats: 5, bags: 4, price: 58 },
  { id: 6, name: "Toyota RAV4", type: "suv", transmission: "Automatic", seats: 5, bags: 4, price: 68 },
  { id: 7, name: "Ford Transit Custom", type: "van", transmission: "Manual", seats: 9, bags: 8, price: 89 },
  { id: 8, name: "Mercedes Vito", type: "van", transmission: "Automatic", seats: 8, bags: 7, price: 112 },
  { id: 9, name: "Mercedes C-Class", type: "luxury", transmission: "Automatic", seats: 5, bags: 3, price: 76 },
  { id: 10, name: "BMW 5 Series", type: "luxury", transmission: "Automatic", seats: 5, bags: 3, price: 94 },
  { id: 11, name: "Fiat 500", type: "city", transmission: "Manual", seats: 4, bags: 1, price: 29 },
  { id: 12, name: "Renault Clio", type: "city", transmission: "Manual", seats: 5, bags: 2, price: 33 },
  { id: 13, name: "Peugeot 208", type: "city", transmission: "Automatic", seats: 5, bags: 2, price: 35 },
  { id: 14, name: "Opel Corsa", type: "city", transmission: "Automatic", seats: 5, bags: 2, price: 34 },
  { id: 15, name: "Volkswagen Golf", type: "city", transmission: "Automatic", seats: 5, bags: 3, price: 42 },
  { id: 16, name: "Nissan Qashqai", type: "suv", transmission: "Automatic", seats: 5, bags: 4, price: 55 },
  { id: 17, name: "Kia Sportage", type: "suv", transmission: "Automatic", seats: 5, bags: 4, price: 57 },
  { id: 18, name: "Volkswagen Tiguan", type: "suv", transmission: "Automatic", seats: 5, bags: 4, price: 72 },
  { id: 19, name: "Jeep Renegade", type: "suv", transmission: "Automatic", seats: 5, bags: 3, price: 64 },
  { id: 20, name: "Range Rover Evoque", type: "suv", transmission: "Automatic", seats: 5, bags: 3, price: 118 },
  { id: 21, name: "Mercedes GLC", type: "suv", transmission: "Automatic", seats: 5, bags: 4, price: 124 },
  { id: 22, name: "Opel Vivaro", type: "van", transmission: "Manual", seats: 9, bags: 8, price: 96 },
  { id: 23, name: "Volkswagen Caravelle", type: "van", transmission: "Automatic", seats: 8, bags: 7, price: 119 },
  { id: 24, name: "Audi A6", type: "luxury", transmission: "Automatic", seats: 5, bags: 3, price: 102 },
].map((car) => ({
  ...car,
  available: true,
  locations: rentalLocations,
}));

const users = [
  {
    id: 1,
    name: "Admin",
    username: "admin",
    email: "admin@albaniadrive.com",
    password: "admin123",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Denis Nikolli",
    username: "denisnikolli",
    email: "denisnikolli@albaniadrive.com",
    password: "denisnikolli",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
];

function readStoredData() {
  try {
    if (!fs.existsSync(dataFile)) {
      return null;
    }

    return JSON.parse(fs.readFileSync(dataFile, "utf8"));
  } catch (error) {
    return null;
  }
}

const storedData = readStoredData();
const cars = storedData?.cars || defaultCars;
const rentalRequests = storedData?.rentalRequests || [];
const reservations = storedData?.reservations || [];

function saveData() {
  fs.writeFileSync(dataFile, JSON.stringify({ cars, reservations, rentalRequests }, null, 2));
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

function getRentalDays(start, end) {
  if (!start || !end) {
    return 1;
  }

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const days = (new Date(end) - new Date(start)) / millisecondsPerDay;
  if (!Number.isFinite(days)) {
    return 1;
  }

  return Math.max(1, Math.ceil(days));
}

function getDiscountedPrice(price, discountCode) {
  return discountCode === "SAVE15" ? Math.round(price * 0.85) : price;
}

function searchCars(query) {
  const location = String(query.location || query.pickupLocation || "").trim().toLowerCase();
  const type = String(query.type || query.vehicleType || "all").trim().toLowerCase();
  const pickupDate = String(query.pickupDate || "");
  const returnDate = String(query.returnDate || "");
  const discountCode = String(query.discountCode || "");
  const days = getRentalDays(pickupDate, returnDate);

  const results = cars
    .filter((car) => {
      if (car.available === false) {
        return false;
      }

      const matchesLocation =
        !location ||
        car.locations.some((item) => item.toLowerCase().includes(location)) ||
        car.name.toLowerCase().includes(location);
      const matchesType = type === "all" || !type || car.type === type;

      return matchesLocation && matchesType;
    })
    .map((car) => ({
      ...car,
      discountedPrice: getDiscountedPrice(car.price, discountCode),
      estimatedTotal: getDiscountedPrice(car.price, discountCode) * days,
    }));

  return {
    count: results.length,
    filters: {
      location,
      type,
      pickupDate,
      returnDate,
      discountCode,
      days,
    },
    results,
  };
}

app.get("/api/cars", (req, res) => {
  res.json(searchCars(req.query));
});

app.get("/api/search", (req, res) => {
  res.json(searchCars(req.query));
});

app.post("/api/register", (req, res) => {
  const name = String(req.body.name || "").trim();
  const username = String(req.body.username || "").trim().toLowerCase();
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");

  if (!name || !username || !email || !password) {
    res.status(400).json({ ok: false, message: "Name, username, email, and password are required." });
    return;
  }

  if (users.some((user) => user.email === email || user.username === username)) {
    res.status(409).json({ ok: false, message: "An account with this email or username already exists." });
    return;
  }

  const user = {
    id: users.length + 1,
    name,
    username,
    email,
    password,
    role: "customer",
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  res.status(201).json({ ok: true, user: { id: user.id, name: user.name, username: user.username, email: user.email, role: user.role } });
});

app.post("/api/login", (req, res) => {
  const identifier = String(req.body.identifier || req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");
  const user = users.find((item) => (
    item.email === identifier ||
    item.username === identifier ||
    item.name.toLowerCase().replace(/\s+/g, "") === identifier
  ) && item.password === password);

  if (!user) {
    res.status(401).json({ ok: false, message: "Invalid username/email or password." });
    return;
  }

  res.json({ ok: true, user: { id: user.id, name: user.name, username: user.username, email: user.email, role: user.role } });
});

app.post("/api/reservations", (req, res) => {
  const reservation = {
    id: reservations.length + 1,
    createdAt: new Date().toISOString(),
    status: "new",
    ...req.body,
  };

  reservations.push(reservation);
  saveData();
  res.status(201).json({ ok: true, reservation });
});

app.get("/api/reservations", (req, res) => {
  res.json({ count: reservations.length, reservations });
});

app.post("/api/rental-requests", (req, res) => {
  const request = {
    id: rentalRequests.length + 1,
    createdAt: new Date().toISOString(),
    status: "new",
    ...req.body,
  };

  rentalRequests.push(request);
  saveData();
  res.status(201).json({ ok: true, request });
});

app.get("/api/rental-requests", (req, res) => {
  res.json({ count: rentalRequests.length, requests: rentalRequests });
});

app.get("/api/admin/dashboard", (req, res) => {
  res.json({
    reservations: {
      count: reservations.length,
      items: reservations,
    },
    rentalRequests: {
      count: rentalRequests.length,
      items: rentalRequests,
    },
    users: {
      count: users.length,
      items: users.map((user) => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      })),
    },
    cars: {
      count: cars.length,
      items: cars,
    },
  });
});

function updateById(collection, id, updates) {
  const item = collection.find((entry) => entry.id === id);

  if (!item) {
    return null;
  }

  Object.assign(item, updates, { updatedAt: new Date().toISOString() });
  saveData();
  return item;
}

app.get("/api/admin/cars", (req, res) => {
  res.json({ count: cars.length, items: cars });
});

app.patch("/api/admin/cars/:id", (req, res) => {
  const id = Number(req.params.id);
  const allowedFields = ["name", "type", "transmission", "fuel", "seats", "bags", "price", "available"];
  const updates = {};

  allowedFields.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(req.body, field)) {
      updates[field] = req.body[field];
    }
  });

  ["seats", "bags", "price"].forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(updates, field)) {
      updates[field] = Number(updates[field]);
    }
  });

  if (Object.prototype.hasOwnProperty.call(updates, "available")) {
    updates.available = Boolean(updates.available);
  }

  const car = updateById(cars, id, updates);

  if (!car) {
    res.status(404).json({ ok: false, message: "Car not found." });
    return;
  }

  res.json({ ok: true, car });
});

app.patch("/api/admin/reservations/:id", (req, res) => {
  const reservation = updateById(reservations, Number(req.params.id), {
    status: String(req.body.status || "new"),
  });

  if (!reservation) {
    res.status(404).json({ ok: false, message: "Reservation not found." });
    return;
  }

  res.json({ ok: true, reservation });
});

app.patch("/api/admin/rental-requests/:id", (req, res) => {
  const request = updateById(rentalRequests, Number(req.params.id), {
    status: String(req.body.status || "new"),
  });

  if (!request) {
    res.status(404).json({ ok: false, message: "Rental request not found." });
    return;
  }

  res.json({ ok: true, request });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
