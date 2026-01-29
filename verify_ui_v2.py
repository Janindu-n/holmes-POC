import asyncio
from playwright.async_api import async_playwright
import os

async def verify():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Start the dev server in the background
        process = await asyncio.create_subprocess_exec(
            "npm", "run", "dev",
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )

        # Wait for the server to be ready
        await asyncio.sleep(10)

        try:
            # Check Landing Page
            await page.goto("http://localhost:3000/")
            await page.screenshot(path="/home/jules/verification/landing_v2.png", full_page=True)
            print("Landing page screenshot saved.")

            # Check Dashboard Page
            await page.goto("http://localhost:3000/dashboard")
            await page.screenshot(path="/home/jules/verification/dashboard_v2.png", full_page=True)
            print("Dashboard page screenshot saved.")

        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            process.terminate()
            await browser.close()

if __name__ == "__main__":
    asyncio.run(verify())
