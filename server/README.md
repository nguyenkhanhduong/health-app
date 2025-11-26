# Health App Server

Backend server cho Health App được xây dựng với Node.js, Express và TypeScript.

## Cài đặt

```bash
pnpm install
```

## Chạy development

```bash
pnpm dev
```

## Build production

```bash
pnpm build
pnpm start
```

## API Endpoints

### Health Check
- `GET /health` - Kiểm tra trạng thái server

### Health Routes
- `GET /api/health/meals` - Lấy danh sách bữa ăn
- `GET /api/health/exercises` - Lấy danh sách bài tập
- `GET /api/health/diaries` - Lấy danh sách nhật ký

## Cấu trúc thư mục

```
server/
├── src/
│   ├── index.ts          # Entry point
│   ├── app.ts            # Express app configuration
│   ├── config/           # Configuration files
│   ├── routes/           # API routes
│   ├── controllers/      # Request handlers
│   ├── models/           # Data models
│   └── middleware/       # Custom middleware
├── package.json
├── tsconfig.json
└── README.md
```

## Environment Variables

Tạo file `.env` từ `.env.example`:

```
PORT=3001
NODE_ENV=development
```
