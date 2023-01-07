import { body } from "express-validator";
import { Priority } from "../../enums/Priority";
import { Status } from "../../enums/Status";

export const taskValidator = [
  body("title")
    .not()
    .isEmpty()
    .withMessage("Title is required")
    .trim()
    .isString()
    .withMessage("Title has to be string")
    .isLength({ min: 3, max: 25 })
    .withMessage("Title needs to be between 3 - 25 chars range"),
  body("description")
    .not()
    .isEmpty()
    .withMessage("Description is required")
    .trim()
    .isString()
    .withMessage("Description has to be string")
    .isLength({ min: 10, max: 120 })
    .withMessage("Description needs to be between 10 - 120 chars range"),
  body("date")
    .not()
    .isEmpty()
    .withMessage("Date is required")
    .isString()
    .withMessage("Date has to be string"),
  body("priority")
    .trim()
    .isIn([Priority.normal, Priority.low, Priority.high])
    .withMessage(
      "Priority has to be one of the followings : low - normal - high "
    ),

  body("status")
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage(
      "Status has to be one of the followings : todo - inProgress - completed "
    ),
];
