const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sql, poolPromise } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// 1. READ: Lấy danh sách tất cả gói tập
app.get('/api/goitap', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM DanhMucGoiTap');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. CREATE: Thêm gói tập mới
app.post('/api/goitap', async (req, res) => {
    try {
        const { TenGoi, MoTa, GiaTien, ThoiHanThang } = req.body;
        const pool = await poolPromise;
        await pool.request()
            .input('TenGoi', sql.NVarChar, TenGoi)
            .input('MoTa', sql.NVarChar, MoTa)
            .input('GiaTien', sql.Decimal(18, 0), GiaTien)
            .input('ThoiHanThang', sql.Int, ThoiHanThang)
            .query('INSERT INTO DanhMucGoiTap (TenGoi, MoTa, GiaTien, ThoiHanThang) VALUES (@TenGoi, @MoTa, @GiaTien, @ThoiHanThang)');
        res.status(201).json({ message: 'Thêm gói tập thành công' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. UPDATE: Sửa thông tin gói tập theo MaGoi
app.put('/api/goitap/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { TenGoi, MoTa, GiaTien, ThoiHanThang } = req.body;
        const pool = await poolPromise;
        await pool.request()
            .input('MaGoi', sql.Int, id)
            .input('TenGoi', sql.NVarChar, TenGoi)
            .input('MoTa', sql.NVarChar, MoTa)
            .input('GiaTien', sql.Decimal(18, 0), GiaTien)
            .input('ThoiHanThang', sql.Int, ThoiHanThang)
            .query('UPDATE DanhMucGoiTap SET TenGoi = @TenGoi, MoTa = @MoTa, GiaTien = @GiaTien, ThoiHanThang = @ThoiHanThang WHERE MaGoi = @MaGoi');
        res.json({ message: 'Cập nhật gói tập thành công' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. DELETE: Xóa gói tập theo MaGoi
app.delete('/api/goitap/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await poolPromise;
        await pool.request()
            .input('MaGoi', sql.Int, id)
            .query('DELETE FROM DanhMucGoiTap WHERE MaGoi = @MaGoi');
        res.json({ message: 'Xóa gói tập thành công' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});