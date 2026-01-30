import asyncio
import time
from playwright.async_api import async_playwright

# Test Data Configuration
USERS = [
    {"name": "Aruni Perera", "email": "aruni@example.com", "role": "client"},
    {"name": "Kasun Silva", "email": "kasun@example.com", "role": "client"},
    {"name": "Dilini Jayawardena", "email": "dilini@example.com", "role": "client"},
    {"name": "Sunil Electricity", "email": "sunil@example.com", "role": "specialist", "specialty": "Electricity"},
    {"name": "Mahinda Water", "email": "mahinda@example.com", "role": "specialist", "specialty": "Water"},
    {"name": "Ranjith Plumbing", "email": "ranjith@example.com", "role": "specialist", "specialty": "Plumbing"},
    {"name": "Kamal Maintenance", "email": "kamal@example.com", "role": "specialist", "specialty": "Maintenance"},
    {"name": "Siri General", "email": "siri@example.com", "role": "specialist", "specialty": "General"},
]

JOBS = [
    {"customer": "aruni@example.com", "specialty": "Electricity", "location": "Colombo 7", "description": "Faulty wiring in the kitchen and flickering lights.", "nature": "Home"},
    {"customer": "aruni@example.com", "specialty": "Water", "location": "Colombo 3", "description": "Leaking main valve in the garden area.", "nature": "Home"},
    {"customer": "kasun@example.com", "specialty": "Plumbing", "location": "Colombo 1", "description": "Bathroom sink clogged and needs urgent repair.", "nature": "Commercial"},
    {"customer": "kasun@example.com", "specialty": "Maintenance", "location": "Colombo 4", "description": "Roof tile replacement and gutter cleaning.", "nature": "Home"},
    {"customer": "dilini@example.com", "specialty": "General", "location": "Colombo 5", "description": "Painting the living room and minor wall repairs.", "nature": "Home"},
    {"customer": "dilini@example.com", "specialty": "Electricity", "location": "Colombo 8", "description": "New AC installation and wiring for two rooms.", "nature": "Industrial"},
    {"customer": "aruni@example.com", "specialty": "Plumbing", "location": "Colombo 2", "description": "Toilet flush not working properly in the guest bathroom.", "nature": "Home"},
    {"customer": "kasun@example.com", "specialty": "Water", "location": "Colombo 6", "description": "Low water pressure in the upstairs bathroom.", "nature": "Home"},
    {"customer": "dilini@example.com", "specialty": "Maintenance", "location": "Colombo 7", "description": "Garden fence repair and painting.", "nature": "Home"},
    {"customer": "aruni@example.com", "specialty": "General", "location": "Colombo 4", "description": "Moving heavy furniture and assembling new cabinets.", "nature": "Home"},
]

PASSWORD = "Holmies@2803"
BASE_URL = "http://localhost:3000"

async def populate():
    async with async_playwright() as p:
        # Launch browser (non-headless so you can see it if running locally,
        # but Jules uses headless)
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        page = await context.new_page()

        print("\n🚀 Starting Database Population Script...")
        print(f"📍 Target: {BASE_URL}")

        # 1. Register Users
        print("\n--- Phase 1: Registering Users ---")
        for user in USERS:
            print(f"👤 Registering {user['name']} ({user['role']})...")
            try:
                await page.goto(f"{BASE_URL}/auth/register?role={user['role']}")

                # Check for config error early
                if await page.locator("text=Firebase is not properly configured").is_visible():
                    print("❌ Error: Firebase is not configured on the server. Please check your .env.local file.")
                    await browser.close()
                    return

                await page.fill('input[placeholder="John Doe"]', user['name'])
                await page.fill('input[placeholder="john@example.com"]', user['email'])
                await page.fill('input[placeholder="••••••••"]', PASSWORD)

                if user['role'] == "specialist":
                    await page.select_option('select#specialty', user['specialty'])

                await page.click('button:has-text("Register Now")')

                # Wait for navigation to dashboard
                await page.wait_for_url(f"**/dashboard", timeout=15000)
                print(f"✅ Successfully registered {user['name']}")

                # Logout
                await page.click('button[aria-label="Sign Out"]')
                await page.wait_for_url(f"{BASE_URL}/")
            except Exception as e:
                print(f"⚠️ Registration skipped for {user['name']} (may already exist or timeout)")

        # 2. Submit Jobs
        print("\n--- Phase 2: Submitting Jobs ---")
        jobs_by_customer = {}
        for job in JOBS:
            customer = job['customer']
            if customer not in jobs_by_customer:
                jobs_by_customer[customer] = []
            jobs_by_customer[customer].append(job)

        for customer_email, jobs in jobs_by_customer.items():
            print(f"🔑 Logging in as {customer_email}...")
            try:
                await page.goto(f"{BASE_URL}/auth/login")
                await page.fill('input[placeholder="john@example.com"]', customer_email)
                await page.fill('input[placeholder="••••••••"]', PASSWORD)
                await page.click('button:has-text("Sign In")')
                await page.wait_for_url(f"**/dashboard")

                for job in jobs:
                    print(f"📝 Submitting job: {job['description'][:40]}...")
                    await page.goto(f"{BASE_URL}/jobs/submit")

                    await page.select_option('select#specialty', job['specialty'])
                    await page.click(f'button:has-text("{job['nature']}")')
                    await page.fill('input[placeholder="e.g. Colombo 07, Sri Lanka"]', job['location'])
                    await page.fill('textarea[placeholder="Describe the issue or maintenance required..."]', job['description'])

                    await page.click('button:has-text("Request Consultation")')
                    await page.wait_for_url(f"**/dashboard")
                    print("   ✨ Job submitted")

                # Logout
                await page.click('button[aria-label="Sign Out"]')
                await page.wait_for_url(f"{BASE_URL}/")
            except Exception as e:
                print(f"❌ Failed to submit jobs for {customer_email}: {e}")

        print("\n🎉 Database population complete!")
        print(f"👉 You can now log in with any of the following emails using the password: {PASSWORD}")
        for user in USERS:
            print(f"   - {user['email']} ({user['role']})")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(populate())
