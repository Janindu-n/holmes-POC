# Database Population Script

This script automates the creation of test users and jobs for the Holmes Homes platform using Playwright.

## Prerequisites

1.  **Development Server**: The Next.js application must be running locally.
    ```bash
    npm run dev
    ```
2.  **Firebase Configuration**: Ensure your `.env.local` file is populated with valid Firebase API keys.
3.  **Playwright**: You must have `playwright` installed in your Python environment.
    ```bash
    pip install playwright
    playwright install chromium
    ```

## Usage

Run the script using Python:

```bash
python scripts/populate_db.py
```

## What it does

-   **Registers 3 Customers**: `aruni@example.com`, `kasun@example.com`, `dilini@example.com`.
-   **Registers 5 Specialists**: One for each category (Electricity, Water, Plumbing, Maintenance, General).
-   **Submits 10 Jobs**: Various maintenance tasks across different Colombo regions, assigned to the customers above.
-   **Standard Password**: All accounts are created with the password `Holmies@2803`.
