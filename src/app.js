import express from "express";
import db from "./config/dbConnect.js";
import livros from "./models/livro.js";

db.on("error", console.log.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Banco de dados conectado!");
});
const app = express();

app.use(express.json());

// const livros = [
//     {id: 1, titulo: 'O Senhor dos Anéis', preco: 100},
//     {id: 2, titulo: 'O Hobbit', preco: 200},
//     {id: 3, titulo: 'A Tormenta', preco: 300},
// ]

app.get("/", (req, res) => {
  res.status(200).send("Curso de NodeJS");
});



app.get("/livros/:id", (req, res) => {
  let index = buscaLivro(req.params.id);
  res.json(livros[index]);
});

app.post("/livros", (req, res) => {
  livros.push(req.body);
  res.status(201).send("Livro cadastrado com sucesso");
});

app.put("/livros/:id", (req, res) => {
  let index = buscaLivro(req.params.id);
  livros[index].titulo = req.body.titulo;
  res.json(livros);
});
app.delete("/livros/:id", (req, res) => {
  let { id } = req.params; // atribuição via estruturação
  let index = buscaLivro(id);
  livros.splice(index, 1);
  res.send(`Livro ${id} removido com sucesso`);
});

function buscaLivro(id) {
  return livros.findIndex((livro) => livro.id == id);
}

export default app;


