// import express from 'express';
// import { Request, Response} from "express"
// import cors from 'cors';
// import morgan from 'morgan';
// import { router } from "./routes/taskroutes";


// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(morgan('combined'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use("/", router);

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.status(200).json({ status: 'OK', message: 'Server is running' });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// // Error handling middleware
// app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
//   console.error(error);
//   res.status(500).json({ message: 'Internal server error' });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
//   // console.log(`🔗 Health check: http://localhost:${PORT}/health`);
//   console.log(`📋 API documentation: http://localhost:${PORT}/`);
// });

// export default app;

//newcode
// import "reflect-metadata";
// import express, { Request, Response } from "express";
// import cors from "cors";
// import morgan from "morgan";
// import { router } from "./routes/taskroutes";
// import { AppDataSource } from "./data-source";

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(morgan("combined"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use("/", router);

// // Health check
// app.get("/health", (req: Request, res: Response) => {
//   res.status(200).json({ status: "OK", message: "Server is running" });
// });

// // 404 handler
// app.use("*", (req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

// // Error handler
// app.use((error: Error, req: Request, res: Response, next: express.NextFunction) => {
//   console.error(error);
//   res.status(500).json({ message: "Internal server error" });
// });

// // Start server after DB init
// AppDataSource.initialize()
//   .then(() => {
//     console.log("✅ Database connected");
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running at http://localhost:${PORT}`);
//       console.log(`🔗 Health check: http://localhost:${PORT}/health`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ DB connection error:", err);
//   });

// export default app;



//Integration

import "reflect-metadata";
import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./routes/taskroutes";
import { AppDataSource } from "./data-source";

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(
  cors({
    origin: "http://localhost:3001", // allow frontend
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/", router);

// ✅ Health check
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// ✅ 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Error handler
app.use((error: Error, req: Request, res: Response, next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
});

// ✅ Start server after DB init
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err);
  });

export default app;
