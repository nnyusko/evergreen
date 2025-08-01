const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db'); // DB 연결 함수 (별도 파일로 분리)

dotenv.config();

connectDB(); // 데이터베이스 연결

const app = express();

app.use(cors());
app.use(express.json());

// API 라우트 설정
app.use('/api/users', require('./src/api/userRoutes'));

app.get('/', (req, res) => {
  res.send('Evergreen API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
