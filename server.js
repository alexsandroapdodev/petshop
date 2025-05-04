import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(cors())

// Criar novo usuário
app.post('/usuarios', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
      }
    })

    res.status(201).json(user)
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    res.status(500).json({ error: 'Erro ao criar usuário' })
  }
})

// Listar usuários com filtros opcionais
app.get('/usuarios', async (req, res) => {
  try {
    const { name, email, phone } = req.query

    const filters = {}
    if (name) filters.name = name
    if (email) filters.email = email
    if (phone) filters.phone = phone

    const users = await prisma.user.findMany({
      where: filters
    })

    res.status(200).json(users)
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    res.status(500).json({ error: 'Erro ao buscar usuários' })
  }
})

// Atualizar usuário (id é String no MongoDB)
app.put('/usuarios/:id', async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: req.params.id // NÃO usar Number()
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
      }
    })

    res.status(200).json(user)
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    res.status(500).json({ error: 'Erro ao atualizar usuário' })
  }
})

// Deletar usuário (id é String no MongoDB)
app.delete('/usuarios/:id', async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.params.id // NÃO usar Number()
      }
    })

    res.status(200).json({ message: 'Usuário deletado com sucesso!' })
  } catch (error) {
    console.error('Erro ao deletar usuário:', error)
    res.status(500).json({ error: 'Erro ao deletar usuário' })
  }
})

// Iniciar servidor
app.listen(3000, () => {
  console.log('✅ Servidor rodando em http://localhost:3000')
})