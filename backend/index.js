import express from "express";
import moongoose from "mongoose";
import { Book } from "./models/modelBook.js";

const PORT = process.env.PORT || 3000;
const DB = process.env.MONGO_URL;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(201).send("You are the Book man");
});

app.post("/books", async (req, res) => {
  try {
    const { title, author, year } = req.body;

    if (!title || !author || !year) {
      return res.status(400).send({
        message: "Please send all required fields!",
      });
    }

    const newBook = { title, author, year };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const books = await Book.findById(id);
    return res.status(200).json(books);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.put("/books/:id", async (req, res) => {
  try {

    const { title, author, year } = req.body;

    if (!title || !author || !year) {
      return res.status(400).send({
        message: "Please send all required fields!",
      });
    }

    const { id } = req.params;

    const updateBook = await Book.findByIdAndUpdate(id, req.body);

    if(!updateBook) {
      return res.status(404).json({message: 'Book not found'})
    }
    return res.status(200).send({message: 'Book updated'});
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteBook = await Book.findByIdAndDelete(id);

    if(!deleteBook) {
      return res.status(404).json({message: 'Book not found'})
    }

    return res.status(200).send({message: 'Book deleted'});

  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

moongoose
  .connect(DB)
  .then(() => {
    console.log("Connect to Data Base Success");
  })
  .catch((error) => {
    console.log(error);
  });
