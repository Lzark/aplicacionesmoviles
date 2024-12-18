import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("roledb");

export const setupDatabase = async () => {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS daylitask (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        description TEXT NOT NULL
      );
    `);

    // await db.runAsync(
    //   `INSERT INTO daylitask (name, description) VALUES (?, ?)`,
    //   ["Tarea 01", "Descripción de la tarea 01"]
    // );
    // await db.runAsync(
    //   `INSERT INTO daylitask (name, description) VALUES (?, ?)`,
    //   ["Tarea 02", "Descripción de la tarea 02"]
    // );
  } catch (error) {
    console.error("Error setting up the database:", error);
  }
};

export const getTasks = async () => {
  try {
    const { rows } = await db.getAllAsync("SELECT * FROM daylitask");
    return rows._array; // `_array` contiene las filas resultantes
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};
