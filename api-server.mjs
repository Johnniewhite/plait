/**
 * Local dev server for /api/submit so the same endpoint works when running Vite.
 * Production uses Vercel serverless api/submit.ts.
 */
import express from "express";
import { MongoClient } from "mongodb";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env and .env.local into process.env
function loadEnvFile(filename) {
  const path = resolve(__dirname, filename);
  if (!existsSync(path)) return;
  const content = readFileSync(path, "utf8");
  content.split("\n").forEach((line) => {
    const i = line.indexOf("=");
    if (i > 0) {
      const key = line.slice(0, i).trim();
      const value = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = value;
    }
  });
}
loadEnvFile(".env");
loadEnvFile(".env.local");

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.warn("Missing MONGO_URI env variable. Set it in .env or .env.local");
}

const collectionMap = {
  USER_WAITLIST: "user_waitlist",
  STYLIST_WAITLIST: "stylist_waitlist",
  NOMINATE: "nominations",
  CONTACT: "contact_submissions",
};

let db = null;

async function connectDB() {
  if (db) return db;
  const client = new MongoClient(mongoUri);
  await client.connect();
  db = client.db("plait");
  console.log("Connected to MongoDB");
  return db;
}

const app = express();
app.use(express.json());

app.post("/api/submit", async (req, res) => {
  if (!mongoUri) {
    return res.status(503).json({ error: "MongoDB not configured" });
  }

  try {
    const data = req.body || {};
    if (!data.formType || !(data.formType in collectionMap)) {
      return res.status(400).json({ error: "Invalid or missing formType" });
    }

    const collectionName = collectionMap[data.formType];
    const database = await connectDB();
    const collection = database.collection(collectionName);

    const document = {
      ...data,
      timestamp: new Date(),
      created_at: new Date(),
    };

    await collection.insertOne(document);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Submission error:", err);
    return res.status(500).json({
      error: "Server error",
      details: err instanceof Error ? err.message : String(err),
    });
  }
});

app.get("/api/admin", async (req, res) => {
  if (!mongoUri) {
    return res.status(503).json({ error: "MongoDB not configured" });
  }

  try {
    const { formType } = req.query;
    if (!formType || !(formType in collectionMap)) {
      return res.status(400).json({ error: "Invalid or missing formType" });
    }

    const database = await connectDB();
    const collection = database.collection(collectionMap[formType]);
    const docs = await collection.find({}).sort({ created_at: -1 }).toArray();

    return res.status(200).json({ data: docs });
  } catch (err) {
    console.error("Admin fetch error:", err);
    return res.status(500).json({
      error: "Server error",
      details: err instanceof Error ? err.message : String(err),
    });
  }
});

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
