// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use((req, res, next) => {
  if (req.method === 'GET' && req.url.includes('?')) {
    const originalSend = res.send
    
    res.send = function(body) {
      try {
        const data = JSON.parse(body)
        
        if (Array.isArray(data)) {
          const totalHeader = res.get('X-Total-Count')
          const total = totalHeader ? parseInt(totalHeader) : data.length
          
          const transformedResponse = {
            data: data,
            total: total
          }
          
          return originalSend.call(this, JSON.stringify(transformedResponse))
        }
        
        return originalSend.call(this, body)
      } catch (e) {
        return originalSend.call(this, body)
      }
    }
  }
  
  next()
})

server.use(router)

const PORT = 3001
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`)
})