import { body, query, param } from "express-validator";
import formValidation from "../other.js";

const validations = {
  list: [
    query("limit")
      .optional()
      .custom((value) => {
        if (isNaN(value) || Number(value) < 1) {
          throw new Error("Please provide a correct limit");
        }
        return true;
      })
      .toInt(),

    query("page")
      .optional()
      .custom((value) => {
        if (isNaN(value) || Number(value) < 1) {
          throw new Error("Please provide a correct page");
        }
        return true;
      })
      .toInt(),

    formValidation,
  ],

  save: [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required"),

    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),

    body("price")
      .notEmpty()
      .withMessage("Price is required")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),

    body("rating")
      .optional()
      .isFloat({ min: 0, max: 5 })
      .withMessage("Rating must be between 0 and 5"),

    formValidation,
  ],

  edit: [
    param("id")
      .notEmpty()
      .withMessage("Id is required")
      .isMongoId()
      .withMessage("Please provide a valid MongoDB id"),

    formValidation,
  ],
};

export default validations;
