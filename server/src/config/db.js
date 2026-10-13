import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../../data_store');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// LowDB/JSON simple store fallback if MongoDB connection fails
export class FileDB {
  constructor(collectionName) {
    this.filePath = path.join(DATA_DIR, `${collectionName}.json`);
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]), 'utf8');
    }
  }

  read() {
    try {
      const content = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(content || '[]');
    } catch (e) {
      return [];
    }
  }

  write(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  find(query = {}) {
    let items = this.read();
    return items.filter(item => {
      for (let key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });
  }

  findOne(query = {}) {
    const results = this.find(query);
    return results.length > 0 ? results[0] : null;
  }

  findById(id) {
    return this.findOne({ _id: id }) || this.findOne({ id: id });
  }

  create(doc) {
    const items = this.read();
    const newDoc = {
      _id: doc._id || 'id_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...doc
    };
    items.push(newDoc);
    this.write(items);
    return newDoc;
  }

  findByIdAndUpdate(id, update, options = {}) {
    const items = this.read();
    const idx = items.findIndex(i => i._id === id || i.id === id);
    if (idx === -1) return null;

    const existing = items[idx];
    const updated = {
      ...existing,
      ...(update.$set || update),
      updatedAt: new Date().toISOString()
    };
    items[idx] = updated;
    this.write(items);
    return updated;
  }

  deleteMany(query = {}) {
    const items = this.read();
    const filtered = items.filter(item => {
      for (let key in query) {
        if (item[key] === query[key]) return false;
      }
      return true;
    });
    this.write(filtered);
    return { deletedCount: items.length - filtered.length };
  }
}

export const isMongoConnected = { current: false };

export const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/careerpath_ai';
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2000
    });
    isMongoConnected.current = true;
    console.log('⚡ Connected to MongoDB successfully!');
  } catch (err) {
    isMongoConnected.current = false;
    console.log('ℹ️ Local MongoDB daemon not detected. Using high-performance JSON File Storage driver.');
  }
};
