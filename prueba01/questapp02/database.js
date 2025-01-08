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

    CREATE TABLE IF NOT EXISTS "days" (
      "id" INTEGER PRIMARY KEY NOT NULL,
      "name" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "day_daylies" (
      "id" INTEGER PRIMARY KEY NOT NULL,
      "daylie_id" TEXT NOT NULL,
      "day_id" TEXT NOT NULL 
    );

    CREATE TABLE IF NOT EXISTS "daylie" (
      "id" INTEGER PRIMARY KEY NOT NULL,
      "name" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "hour" TEXT NOT NULL,
      "minute" TEXT NOT NULL,
      "state" INTEGER NOT NULL
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
export async function getToDoById(id) {
  const db = await openDatabase();
  const result = await db.getFirstAsync("SELECT * FROM todo WHERE id = ?", id);
  return result;
}

export async function updateToDoById(name, description, id) {
  const db = await openDatabase();
  await db.runAsync("UPDATE todo SET name = ?, description = ? WHERE id = ?", [
    name,
    description,
    id,
  ]);
}

export async function deleteToDoById(id) {
  const db = await openDatabase();
  await db.runAsync("DELETE FROM todo WHERE id = $id", { $id: id });
}

export async function readDayli() {
  const db = await openDatabase();
  const rows = await db.getAllAsync("SELECT * FROM daylie");
  return rows;
}

export async function addDayli(name, description, hour, minute, days) {
  const db = await openDatabase();
  await db.runAsync(
    "INSERT INTO daylie (name, description,hour,minute,state) VALUES (?, ?, ?, ?, ?)",
    [name, description, hour, minute, 0]
  );
}

export async function updateStateDayliById(id, state) {
  const db = await openDatabase();
  await db.runAsync("UPDATE daylie SET state = ?  WHERE id = ?", [id, state]);
}

export async function getDayliById(id) {
  const db = await openDatabase();
  const result = await db.getFirstAsync(
    "SELECT * FROM daylie WHERE id = ?",
    id
  );
  return result;
}
export async function updateDayliById(id, name, description, hour, minute) {
  const db = await openDatabase();
  await db.runAsync(
    "UPDATE daylie SET name = ?, description = ?, hour = ?, minute = ? WHERE id = ?",
    [name, description, hour, minute, id]
  );
}

export async function deleteDayliyId(id) {
  const db = await openDatabase();
  await db.runAsync("DELETE FROM daylie WHERE id = $id", { $id: id });
}

// "id" INTEGER PRIMARY KEY NOT NULL,
// "name" TEXT NOT NULL,
// "description" TEXT NOT NULL,
// "hour" TEXT NOT NULL,
// "minute" TEXT NOT NULL,
// "state" INTEGER NOT NULL
// name
// description
// hour
// minute
// DROP TABLE IF EXISTS daylie;
