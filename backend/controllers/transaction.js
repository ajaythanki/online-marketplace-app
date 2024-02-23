const Transaction = require("../models/transaction");

const create = async (req, res, next) => {
  const { user, type, amount, relatedItem, relatedAuction } = req.body;
  try {
    const transaction = new Transaction({
      user,
      type,
      amount,
      relatedItem,
      relatedAuction,
    });
    await transaction.save();
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ error: "Error creating a transaction" });
  }
};

const getAll = async (req, res, next) => {
  try {
    const transactions = await Transaction.find()
      .populate("user")
      .populate("relatedItem")
      .populate("relatedAuction");
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching transactions" });
  }
};

const getByID = async (req, res, next) => {
  const transactionId = req.params.id;
  try {
    const transaction = await Transaction.findById(transactionId)
      .populate("user")
      .populate("relatedItem")
      .populate("relatedAuction");
    if (!transaction) {
      res.status(404).json({ error: "Transaction not found" });
    } else {
      res.json(transaction);
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching the transaction" });
  }
};

const updateByID = async (req, res, next) => {
  const transactionId = req.params.id;
  const { user, type, amount, relatedItem, relatedAuction } = req.body;
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      transactionId,
      { user, type, amount, relatedItem, relatedAuction },
      { new: true }
    );
    if (!transaction) {
      res.status(404).json({ error: "Transaction not found" });
    } else {
      res.json(transaction);
    }
  } catch (error) {
    res.status(400).json({ error: "Error updating the transaction" });
  }
};

const deleteByID = async (req, res, next) => {
  const transactionId = req.params.id;
  try {
    const transaction = await Transaction.findByIdAndRemove(transactionId);
    if (!transaction) {
      res.status(404).json({ error: "Transaction not found" });
    } else {
      res.json({ message: "Transaction deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting the transaction" });
  }
};

module.exports = { create, getAll, getByID, updateByID, deleteByID };
