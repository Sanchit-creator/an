const PDFDocument = require('pdfkit');
const path = require('path');

const generatePDF = async(userData) => {
    const doc = new PDFDocument();
  
    // Set document properties
    doc.info.Title = 'User Profile';
  
    // Add profile picture if available
    if (userData.profilePicture) {
      const imagePath = path.join(userData.profilePicture);
      doc.image(imagePath, { width: 100, height: 100 });
    }
  
    // Add user details
    doc.text(`Name: ${userData.firstName} ${userData.lastName}`);
    doc.text(`Date of Birth: ${userData.dob}`);
    doc.text(`Hobbies: ${userData.hobbies.join(', ')}`);
    doc.text(`Projects: ${userData.projects.join(', ')}`);
    doc.text(`Email: ${userData.email}`);

    doc.end();
    return doc;
}

module.exports = generatePDF;