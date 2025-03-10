"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCVPDF = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const generateCVPDF = (user) => {
    return new Promise((resolve, reject) => {
        const doc = new pdfkit_1.default();
        const buffers = [];
        // Collect PDF data into buffers
        doc.on('data', (chunk) => buffers.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', reject);
        // Add content to the PDF
        doc.fontSize(20).text('CV', { align: 'center' });
        doc.moveDown();
        // Personal Information
        doc.fontSize(14).text('Personal Information', { underline: true });
        doc.fontSize(12).text(`Name: ${user.name}`);
        doc.text(`Email: ${user.email}`);
        doc.text(`Phone: ${user.phone}`);
        doc.text(`Professional Summary: ${user.professional_summary}`);
        doc.moveDown();
        // Work Experience
        doc.fontSize(14).text('Work Experience', { underline: true });
        user.work_experience.forEach((exp) => {
            doc.text(`${exp.company} - ${exp.position} (${exp.start_date} to ${exp.end_date})`);
            doc.text(`Description: ${exp.description}`);
            doc.moveDown();
        });
        // Education
        doc.fontSize(14).text('Education', { underline: true });
        user.education.forEach((edu) => {
            doc.text(`${edu.institution} - ${edu.degree} (${edu.start_date} to ${edu.end_date})`);
            doc.text(`Field of Study: ${edu.field_of_study}`);
            doc.moveDown();
        });
        // Skills
        doc.fontSize(14).text('Skills', { underline: true });
        user.skills.forEach((skill) => doc.text(`- ${skill}`));
        // Finalize the PDF
        doc.end();
    });
};
exports.generateCVPDF = generateCVPDF;
