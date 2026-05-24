@echo off
echo ============================================
echo   PromptCraft Desktop - Install ^& Run
echo ============================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found!
    echo.
    echo Download and install Node.js from:
    echo https://nodejs.org/
    echo.
    echo After installing, run this file again.
    pause
    exit /b 1
)

echo [OK] Node.js found: 
node --version
echo.

:: Install dependencies
echo Installing dependencies...
call npm install
echo.

if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies.
    pause
    exit /b 1
)

echo ============================================
echo   Installation complete!
echo ============================================
echo.
echo To start the app:   npm start
echo To build .exe:      npm run build
echo.

:: Ask to run
set /p choice="Start PromptCraft now? (Y/N): "
if /i "%choice%"=="Y" (
    echo.
    echo Starting PromptCraft...
    call npm start
)
