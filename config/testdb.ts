import pool from "./db";

async function testDB() {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Connected to MySQL successfully!");
        connection.release();
    } catch (error) {
        console.error("❌ Database connection error:", error);
    }
}

testDB();
