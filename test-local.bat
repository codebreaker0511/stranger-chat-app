@echo off
echo ========================================
echo   Stranger Chat App - Local Test
echo ========================================
echo.
echo This will test the app locally.
echo Make sure you have Node.js installed!
echo.
pause

echo.
echo Installing dependencies...
call npm run install-all

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Starting the app...
echo ========================================
echo.
echo The app will open in your browser.
echo Open it in TWO windows to test matching!
echo.
echo Press Ctrl+C to stop the servers.
echo.

call npm run dev
