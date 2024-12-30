import * as SQLite from "expo-sqlite";
let db; // Función para abrir la base de datos de manera asíncrona
async function openDatabase() {
  if (!db) {
    db = await SQLite.openDatabaseAsync("roledb");
  }
  return db;
}

export async function setupDatabase() {
  const db = await openDatabase();
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS "todo" (
      "id" INTEGER PRIMARY KEY NOT NULL,
      "name" TEXT NOT NULL,
      "description" TEXT NOT NULL
    );
  `);
}

export async function readTodos() {
  const db = await openDatabase();
  const rows = await db.getAllAsync("SELECT * FROM todo");
  return rows;
}

export async function addTodo(name, description) {
  const db = await openDatabase();
  await db.runAsync("INSERT INTO todo (name, description) VALUES (?, ?)", [
    name,
    description,
  ]);
}
