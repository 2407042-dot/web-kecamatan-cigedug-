@echo off
title Server Web Desa - Master Control
echo ===================================================
echo     MENJALANKAN SERVER WEB DESA (FRONTEND & BACKEND)
echo ===================================================
echo.
echo Membuka server Backend (Express.js) di port 5000...
start "Backend Server" cmd /c "cd /d "%~dp0backend" && npm start"

echo Membuka server Frontend (Next.js) di port 3000...
start "Frontend Server" cmd /c "cd /d "%~dp0frontend" && npm run dev"

echo.
echo Server sedang berjalan di dua jendela terpisah.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo Tutup jendela Command Prompt masing-masing untuk menghentikan server.
echo ===================================================
pause
