import Contact from "../models/contact.model.js"; // Import the Contact model
import { errorHandler } from "../utils/error.js";

// Controller function to handle the contact form submission
// const submitContactForm = async (req, res, next) => {
//   try {
//     const contact = await Contact.create(req.body);
//     return res.status(201).json(contact);
//   } catch (error) {
//     next(error);
//   }
// };


const submitContactForm = async (req, res, next) => {
    try {
      const contact = await Contact.create(req.body);
      return res.status(201).json(contact);
    } catch (error) {
      console.error(error); // Log the error for debugging
      next(error);
    }
  };

export default submitContactForm;
