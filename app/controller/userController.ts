import { createUser, getUserById, getUsers } from "../model/userModel";
import { generateCVPDF } from "../service/pdfService";
import { User } from "../types/user";

export const addUser = async (req: any, res: any): Promise<void> => {
    try {
        const user: User = req.body;
        const userId = await createUser(user);
        res.status(201).json({ id: userId, message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
}
export const getAllUsers = async (req: Request, res: any): Promise<void> => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};
export const getUser = async (req: any, res: any): Promise<void> => {
    try {
        const userId = parseInt(req.params.id, 10);
        const user = await getUserById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
};
export const generateUserPDF = async (req: any, res: any): Promise<void> => {
    const userId = parseInt(req.params.id, 10);
    const user = await getUserById(userId);
  
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
  
    try {
      const pdfBuffer = await generateCVPDF(user);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${user.name}_CV.pdf`);
      res.send(pdfBuffer);
    } catch (error) {
      res.status(500).json({ message: 'Error generating PDF' });
    }
  };