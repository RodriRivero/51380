
import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extends:true}));



app.get("/", (req, res) => {
  res.send("Mocchiiii");
});






app.listen(PORT, () => {
    console.log(`listening to PORT: http://localhost:${PORT}`)
});
