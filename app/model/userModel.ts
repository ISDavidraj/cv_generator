import pool from "../../config/db";
import { User } from "../types/user";

export const createUser = async (user: User): Promise<number> => {
    console.log('Inserting user:', user);
    const [result] = await pool.query(
        'INSERT INTO users (name, email, phone, professional_summary, work_experience, education, skills) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
            user.name,
            user.email,
            user.phone,
            user.professional_summary,
            JSON.stringify(user.work_experience),
            JSON.stringify(user.education),
            JSON.stringify(user.skills),
        ]
    );
    return (result as any).insertId;
}
export const getUsers = async (): Promise<User[]> => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows as User[];
};

export const getUserById = async (id: number): Promise<User | null> => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return (rows as any)[0] || null;
};