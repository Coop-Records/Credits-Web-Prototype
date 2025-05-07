# 🎵 Coop Credits

This app lets you top up credits to purchase music from Coop Recs, with each song costing 1 credit. Built with Next.js, ShadCN UI, Privy for authentication, and Crossmint for payments.

<img width="439" alt="Screenshot 2025-05-07 at 10 34 01 AM" src="https://github.com/user-attachments/assets/35399fe4-1149-4006-9922-2f18b27e6abf" />

## 🚀 Overview

- **Purpose:** Quickly top up your account with credits to enjoy your favorite songs.
- **Tech Stack:** Next.js, ShadCN UI, Privy, Crossmint
- **How it works:**
  - Log in securely with Privy
  - Purchase credits with credit card, apple pay or google pay using Crossmint
  - Use credits to buy songs (1 credit = 1 song)

## 🗂️ Project Structure

```
credits-web-prototype/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
├── components/
│   ├── crossmint-modal.tsx
│   ├── credits-drawer.tsx
│   ├── credit-options.tsx
│   ├── skeleton-crossmint.tsx
│   ├── plus-icon.tsx
│   └── ui/
│       ├── button.tsx
│       └── sheet.tsx
├── providers/
│   ├── CrossmintProvider.tsx
│   └── PrivyProvider.tsx
├── public/
│   └── plus-icon.png
├── hooks/
│   └── useEthPrice.ts
├── README.md
├── package.json
├── pnpm-lock.yaml
```

## 🛠️ Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/Coop-Records/Credits-Web-Prototype.git
   cd Credits-Web-Prototype
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. **Set up environment variables:**
   - Copy the example file:
     ```bash
     cp .env.example .env.local
     ```
   - Edit `.env.local` and fill in the required keys for Privy and Crossmint.
4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## 🌐 Live Demo

Check out the live app: [https://coop-credits.vercel.app/](https://coop-credits.vercel.app/)

---

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [ShadCN UI](https://ui.shadcn.com/)
- [Privy](https://privy.io/)
- [Crossmint](https://www.crossmint.com/)

---

## 📝 License

This project is licensed under the [MIT License](./LICENSE) by Coop Records.
