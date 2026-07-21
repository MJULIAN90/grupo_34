# Limpieza de efectos secundarios

| Función              | Limpiador             |
| -------------------- | --------------------- |
| setInterval          | clearInterval         |
| setTimeout           | clearTimeout          |
| addEventListener     | removeEventListener   |
| WebSocket            | close                 |
| Socket.IO            | disconnect / off      |
| subscribe            | unsubscribe           |
| fetch                | AbortController.abort |
| ResizeObserver       | disconnect            |
| IntersectionObserver | disconnect            |
