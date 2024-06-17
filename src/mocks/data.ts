import { OrderStatus } from "~/constants/order";
import { CartItem } from "~/models/CartItem";
import { Order } from "~/models/Order";
import { AvailableProduct, Product } from "~/models/Product";

export const products: Product[] = [
  {
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    name: "Roadster 3000",
    brand: "Speedster",
    type: "Road Bike",
    price: 1200.0,
    color: "Red",
    isAvailable: true,
    description:
      "A high-performance road bike designed for speed and agility. Perfect for competitive racing and long-distance rides.",
  },
  {
    id: "81c5a9d7-2e2e-4f75-ae32-c9d8b1a6e4d5",
    name: "Mountain King",
    brand: "Trail Blazer",
    type: "Mountain Bike",
    price: 1500.0,
    color: "Blue",
    isAvailable: true,
    description:
      "Conquer the toughest trails with the Mountain King. Built for durability and performance on rugged terrains.",
  },
  {
    id: "b1b64e7b-9f47-4b59-8820-30f6370d8a58",
    name: "Urban Glide",
    brand: "City Ride",
    type: "Hybrid Bike",
    price: 800.0,
    color: "Black",
    isAvailable: false,
    description:
      "The Urban Glide combines the best features of road and mountain bikes, making it ideal for city commuting and casual rides.",
  },
  {
    id: "e8cb5a2d-5e45-41b5-8ae8-4a5075b7681d",
    name: "Speed Demon",
    brand: "Fast Track",
    type: "Road Bike",
    price: 2200.0,
    color: "White",
    isAvailable: true,
    description:
      "Experience the thrill of high-speed cycling with the Speed Demon. Engineered for precision and unmatched performance.",
  },
  {
    id: "4f75d8c6-7b8d-4c9a-8d3f-dc3f7db2a1e9",
    name: "Trail Blazer",
    brand: "Mountain Peak",
    type: "Mountain Bike",
    price: 1700.0,
    color: "Green",
    isAvailable: true,
    description:
      "Navigate challenging trails effortlessly with the Trail Blazer. Designed for the adventurer seeking excitement and reliability.",
  },
  {
    id: "9b6c4b7d-61e3-4f2f-84f2-4c3b5e2f6d41",
    name: "Commuter Pro",
    brand: "City Slicker",
    type: "Hybrid Bike",
    price: 950.0,
    color: "Gray",
    isAvailable: true,
    description:
      "The Commuter Pro is perfect for daily commutes and weekend rides. Comfortable, efficient, and stylish for urban living.",
  },
  {
    id: "2d59e6b7-6e9e-4f8c-8442-9d3e6e4f8e7d",
    name: "Racer X",
    brand: "Speedster",
    type: "Road Bike",
    price: 1300.0,
    color: "Yellow",
    isAvailable: false,
    description:
      "Push your limits with the Racer X. Built for speed enthusiasts who demand high performance and exceptional control.",
  },
  {
    id: "c6b5e4d8-3f7d-4f6e-9b2c-8d3f5b6e7d1f",
    name: "Rock Hopper",
    brand: "Mountain Peak",
    type: "Mountain Bike",
    price: 1600.0,
    color: "Orange",
    isAvailable: true,
    description:
      "The Rock Hopper is your go-to bike for off-road adventures. Rugged and reliable, it handles the roughest paths with ease.",
  },
  {
    id: "7d2f5b6e-4f8c-4e3f-9b2c-6e7d1f6b5e4d",
    name: "Eco Rider",
    brand: "Green Wheels",
    type: "Electric Bike",
    price: 2500.0,
    color: "Silver",
    isAvailable: true,
    description:
      "Go green with the Eco Rider. This electric bike offers a smooth, eco-friendly ride, perfect for urban commuting and beyond.",
  },
  {
    id: "1f6b5e4d-3c7f-4e9e-8d2c-5b7d4e8f1c6e",
    name: "Foldaway",
    brand: "Compact Ride",
    type: "Folding Bike",
    price: 1100.0,
    color: "Black",
    isAvailable: true,
    description:
      "Convenience meets performance with the Foldaway. Easily foldable for storage and transport, ideal for city dwellers.",
  },
];

export const availableProducts: AvailableProduct[] = products.map(
  (product, index) => ({ ...product, count: index + 1 })
);

export const cart: CartItem[] = [
  {
    product: {
      id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
      name: "Roadster 3000",
      brand: "Speedster",
      type: "Road Bike",
      price: 1200.0,
      color: "Red",
      isAvailable: true,
      description:
        "A high-performance road bike designed for speed and agility. Perfect for competitive racing and long-distance rides.",
    },
    count: 2,
  },
  {
    product: {
      id: "c6b5e4d8-3f7d-4f6e-9b2c-8d3f5b6e7d1f",
      name: "Rock Hopper",
      brand: "Mountain Peak",
      type: "Mountain Bike",
      price: 1600.0,
      color: "Orange",
      isAvailable: true,
      description:
        "The Rock Hopper is your go-to bike for off-road adventures. Rugged and reliable, it handles the roughest paths with ease.",
    },
    count: 5,
  },
];

export const orders: Order[] = [
  {
    id: "1",
    address: {
      address: "some address",
      firstName: "Name",
      lastName: "Surname",
      comment: "",
    },
    items: [
      { productId: "7567ec4b-b10c-48c5-9345-fc73c48a80aa", count: 2 },
      { productId: "c6b5e4d8-3f7d-4f6e-9b2c-8d3f5b6e7d1f", count: 5 },
    ],
    statusHistory: [
      { status: OrderStatus.Open, timestamp: Date.now(), comment: "New order" },
    ],
  },
  {
    id: "2",
    address: {
      address: "another address",
      firstName: "John",
      lastName: "Doe",
      comment: "Ship fast!",
    },
    items: [{ productId: "7567ec4b-b10c-48c5-9345-fc73c48a80aa", count: 3 }],
    statusHistory: [
      {
        status: OrderStatus.Sent,
        timestamp: Date.now(),
        comment: "Fancy order",
      },
    ],
  },
];
