import { MemoryRouter } from "react-router-dom";
import { test, expect } from "vitest";
import App from "~/components/App/App";
import { server } from "~/mocks/server";
import { rest } from "msw";
import API_PATHS from "~/constants/apiPaths";
import { CartItem } from "~/models/CartItem";
import { AvailableProduct } from "~/models/Product";
import { renderWithProviders } from "~/testUtils";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { formatAsPrice } from "~/utils/utils";

test("Renders products list", async () => {
  const products: AvailableProduct[] = [
    {
      id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
      title: "Roadster 3000",
      brand: "Speedster",
      type: "Road Bike",
      price: 1200.0,
      color: "Red",
      isAvailable: true,
      description:
        "A high-performance road bike designed for speed and agility. Perfect for competitive racing and long-distance rides.",
      count: 1,
    },
    {
      id: "81c5a9d7-2e2e-4f75-ae32-c9d8b1a6e4d5",
      title: "Mountain King",
      brand: "Trail Blazer",
      type: "Mountain Bike",
      price: 1500.0,
      color: "Blue",
      isAvailable: true,
      description:
        "Conquer the toughest trails with the Mountain King. Built for durability and performance on rugged terrains.",
      count: 2,
    },
  ];
  server.use(
    rest.get(`${API_PATHS.bff}/product/available`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.delay(),
        ctx.json<AvailableProduct[]>(products)
      );
    }),
    rest.get(`${API_PATHS.cart}/profile/cart`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json<CartItem[]>([]));
    })
  );
  renderWithProviders(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  await waitForElementToBeRemoved(() => screen.queryByText(/Loading/));
  products.forEach((product) => {
    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(formatAsPrice(product.price))).toBeInTheDocument();
  });
});
