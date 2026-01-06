import { hc } from "hono/client";
import type { AppType } from "server";

const API_BASE_URL = import.meta.env.VITE_API_URL;

type Client = ReturnType<typeof hc<AppType>>;

const hcWithType = (...args: Parameters<typeof hc>): Client =>
	hc<AppType>(...args);

export const client = hcWithType(API_BASE_URL).api;
