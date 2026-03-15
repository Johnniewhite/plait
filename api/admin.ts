import { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient, Db } from "mongodb";

const mongoUri = process.env.MONGO_URI;

let cachedDb: Db | null = null;

async function connectDB(): Promise<Db> {
  if (cachedDb) return cachedDb;
  const client = new MongoClient(mongoUri!);
  await client.connect();
  cachedDb = client.db("plait");
  return cachedDb;
}

const collectionMap: Record<string, string> = {
  USER_WAITLIST: "user_waitlist",
  STYLIST_WAITLIST: "stylist_waitlist",
  NOMINATE: "nominations",
  CONTACT: "contact_submissions",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!mongoUri) {
    return res.status(503).json({ error: "MongoDB not configured" });
  }

  try {
    const formType = req.query.formType as string;
    if (!formType || !(formType in collectionMap)) {
      return res.status(400).json({ error: "Invalid or missing formType" });
    }

    const db = await connectDB();
    const collection = db.collection(collectionMap[formType]);
    const docs = await collection.find({}).sort({ created_at: -1 }).toArray();

    return res.status(200).json({ data: docs });
  } catch (err: unknown) {
    console.error("Admin fetch error:", err);
    return res.status(500).json({
      error: "Server error",
      details: err instanceof Error ? err.message : String(err),
    });
  }
}
