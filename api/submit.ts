import { VercelRequest, VercelResponse } from "@vercel/node";
import { MongoClient, Db } from "mongodb";

// ------------------------
// MongoDB connection
// ------------------------
const mongoUri = process.env.MONGO_URI;

let cachedDb: Db | null = null;

async function connectDB(): Promise<Db> {
  if (cachedDb) return cachedDb;
  const client = new MongoClient(mongoUri!);
  await client.connect();
  cachedDb = client.db("plait");
  return cachedDb;
}

// ------------------------
// Types
// ------------------------
export enum FormType {
  USER_WAITLIST = "USER_WAITLIST",
  STYLIST_WAITLIST = "STYLIST_WAITLIST",
  NOMINATE = "NOMINATE",
  CONTACT = "CONTACT"
}

export interface BaseFormData {
  formType: FormType;
  timestamp?: string;
  [key: string]: any;
}

// Collection map
const collectionMap: Record<FormType, string> = {
  [FormType.USER_WAITLIST]: "user_waitlist",
  [FormType.STYLIST_WAITLIST]: "stylist_waitlist",
  [FormType.NOMINATE]: "nominations",
  [FormType.CONTACT]: "contact_submissions"
};

// ------------------------
// API Handler
// ------------------------
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!mongoUri) {
    return res.status(503).json({
      error: "MongoDB not configured",
      details: "Set MONGO_URI in Vercel Environment Variables.",
    });
  }

  try {
    let data: BaseFormData =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

    if (!data.formType || !(data.formType in collectionMap)) {
      return res.status(400).json({ error: "Invalid or missing formType" });
    }

    const collectionName = collectionMap[data.formType as FormType];
    const db = await connectDB();
    const collection = db.collection(collectionName);

    const document = {
      ...data,
      timestamp: new Date(),
      created_at: new Date(),
    };

    await collection.insertOne(document);

    return res.status(200).json({ success: true });
  } catch (err: unknown) {
    console.error("Submission error:", err);

    return res.status(500).json({
      error: "Server error",
      details: err instanceof Error ? err.message : String(err),
    });
  }
}
