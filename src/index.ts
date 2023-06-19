const express = require("express")
const app = express()
const PORT = 3000
app.use(express.json())

var items = [
  { id: 1, name: "todo item" },
  { id: 2, name: "todo item" },
  { id: 3, name: "todo item" }
]

app.get("/", (req: any, res: any) => {
  res.send(items)
})

app.post("/", (req: any, res: any) => {
  const item = {
    id: Math.max(...items.map((item) => item.id)) + 1,
    name: req.body.name
  }
  items.push(item)
  res.status(201).send(items)
})

app.put("/:id", (req: any, res: any) => {
  const id = parseInt(req.params.id)
  const item = items.find((item) => item.id === id)
  if (!item) return res.status(404).json({ error: "not found" })
  item.name = req.body.name || item.name
  res.json(items)
})

app.delete("/:id", (req: any, res: any) => {
  const id = parseInt(req.params.id)
  const index = items.findIndex((item) => item.id === id)
  if (index === -1) return res.status(404).json({ error: "index not found" })
  items.splice(index, 1)
  res.status(201).send(items)
})

app.listen(PORT, () => {
  console.log(`listening to http://localhost:${PORT}`)
})

export {}
