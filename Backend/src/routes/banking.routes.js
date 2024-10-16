import { Router } from "express";
import { addCustomer, customerInfo } from "../controllers/customer.js";
import { accountInfo, addAccount } from "../controllers/account.js";
import { addLoan, loanInfo } from "../controllers/loan.js";
import { addCard, cardInfo } from "../controllers/card.js";

const router = Router();

router.route("/customer").get(customerInfo);
router.route("/addCustomer").post(addCustomer);
router.route("/account").get(accountInfo);
router.route("/addAccount").post(addAccount);
router.route("/loan").get(loanInfo);
router.route("/addLoan").post(addLoan);
router.route("/card").get(cardInfo);
router.route("/addCard").post(addCard);
export default router