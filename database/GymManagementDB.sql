-- 1. Tạo Database
CREATE DATABASE GymManagementDB;
GO

USE GymManagementDB;
GO

-- 2. Bảng NguoiDung (User)
CREATE TABLE NguoiDung (
    MaND INT IDENTITY(1,1) PRIMARY KEY,
    HoTen NVARCHAR(100) NOT NULL,
    SoDienThoai VARCHAR(15) UNIQUE NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    MatKhau VARCHAR(255) NOT NULL,
    VaiTro NVARCHAR(20) NOT NULL CHECK (VaiTro IN ('Admin', 'LeTan', 'PT', 'HoiVien')),
    NgayTao DATETIME DEFAULT GETDATE()
);

-- 3. Bảng TheHoiVien (MembershipCard)
CREATE TABLE TheHoiVien (
    MaThe INT IDENTITY(1,1) PRIMARY KEY,
    MaND INT NOT NULL,
    NgayKichHoat DATE NOT NULL,
    NgayHetHan DATE NOT NULL,
    TrangThai NVARCHAR(20) DEFAULT N'Còn hạn',
    FOREIGN KEY (MaND) REFERENCES NguoiDung(MaND)
);

-- 4. Bảng DanhMucGoiTap (WorkoutPackage) - Bảng chính để làm CRUD trước
CREATE TABLE DanhMucGoiTap (
    MaGoi INT IDENTITY(1,1) PRIMARY KEY,
    TenGoi NVARCHAR(100) NOT NULL,
    MoTa NVARCHAR(255),
    GiaTien DECIMAL(18, 0) NOT NULL,
    ThoiHanThang INT NOT NULL
);

-- 5. Bảng HoaDonDangKy (SubscriptionInvoice)
CREATE TABLE HoaDonDangKy (
    MaHoaDon INT IDENTITY(1,1) PRIMARY KEY,
    MaND_Mua INT NOT NULL,
    MaGoi INT NOT NULL,
    NgayMua DATETIME DEFAULT GETDATE(),
    TongTien DECIMAL(18, 0) NOT NULL,
    PhuongThucThanhToan NVARCHAR(50) DEFAULT N'Tiền mặt',
    FOREIGN KEY (MaND_Mua) REFERENCES NguoiDung(MaND),
    FOREIGN KEY (MaGoi) REFERENCES DanhMucGoiTap(MaGoi)
);

-- 6. Bảng PhienLichTapPT (PT_Session)
CREATE TABLE PhienLichTapPT (
    MaCaTap INT IDENTITY(1,1) PRIMARY KEY,
    MaND_PT INT NOT NULL,
    NgayTap DATE NOT NULL,
    GioBatDau TIME NOT NULL,
    GioKetThuc TIME NOT NULL,
    TrangThai NVARCHAR(20) DEFAULT N'Trống',
    FOREIGN KEY (MaND_PT) REFERENCES NguoiDung(MaND)
);

-- 7. Bảng DatLichPT (Booking)
CREATE TABLE DatLichPT (
    MaDatLich INT IDENTITY(1,1) PRIMARY KEY,
    MaCaTap INT NOT NULL,
    MaND_HoiVien INT NOT NULL,
    NgayDat DATETIME DEFAULT GETDATE(),
    TrangThaiBooking NVARCHAR(30) DEFAULT N'Chờ tập',
    FOREIGN KEY (MaCaTap) REFERENCES PhienLichTapPT(MaCaTap),
    FOREIGN KEY (MaND_HoiVien) REFERENCES NguoiDung(MaND)
);

-- 8. Bảng LichSuCheckIn (CheckInHistory)
CREATE TABLE LichSuCheckIn (
    MaCheckIn INT IDENTITY(1,1) PRIMARY KEY,
    MaThe INT NOT NULL,
    ThoiGianVao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (MaThe) REFERENCES TheHoiVien(MaThe)
);
GO

-- 9. Thêm dữ liệu mẫu cho bảng DanhMucGoiTap để test CRUD
INSERT INTO DanhMucGoiTap (TenGoi, MoTa, GiaTien, ThoiHanThang)
VALUES 
    (N'Gói Basic 1 Tháng', N'Tập tự do full thiết bị, không bao gồm PT', 500000, 1),
    (N'Gói Standard 3 Tháng', N'Tập tự do, tặng 2 buổi hướng dẫn với PT', 1350000, 3),
    (N'Gói VIP 1 Năm', N'Full quyền lợi, xông hơi, tặng 10 buổi PT', 4800000, 12);
GO