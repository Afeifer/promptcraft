@echo off
echo ============================================
echo   Building PromptCraft portable .exe
echo ============================================
echo.

call npm run build

if %errorlevel% equ 0 (
    echo.
    echo ============================================
    echo   Build complete!
    echo   File: dist\PromptCraft-1.2.0-portable.exe
    echo ============================================
) else (
    echo.
    echo [ERROR] Build failed.
)
echo.
pause
