# GECKHO Merch Platform

A modern e-commerce platform built with Next.js 14.1.2 for GECKHO's merchandise store.

## 🚀 Features

- Modern, responsive design
- Dynamic product catalog
- Shopping cart functionality using Zustand
- Social media integration with Font Awesome icons
- Swypt checkout integration
- Tailwind CSS for styling

## 🛠️ Tech Stack

- **Framework**: Next.js 14.1.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Font Awesome
- **Payment Processing**: Swypt Checkout

## 📦 Dependencies

- React 18
- Next.js 14.1.2
- TypeScript
- Tailwind CSS
- Zustand
- Font Awesome
- Swypt Checkout

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd geckhoboymerch
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🔧 Configuration

The project uses several key configurations:

- **Tailwind CSS**: Configuration in `tailwind.config.ts`
- **Font Awesome**: Icons configured in `src/app/fontawesome.ts`
- **Zustand Store**: Cart state management in `src/app/store/cartStore.ts`

## 📁 Project Structure

```
geckhoboymerch/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── store/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── ...
├── public/
├── tailwind.config.ts
├── package.json
└── README.md
```

## 🎨 Features

### Shopping Cart
- Add/remove items
- Adjust quantities
- Persistent cart state using Zustand

### Product Display
- Featured merchandise section
- Dynamic product cards
- Responsive grid layout

### Checkout
- Integrated with Swypt for secure payments
- Order summary
- Shipping information collection

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:
```
# Add your environment variables here
```

## 📝 License

[Add your license information here]

## 👥 Contributing

[Add contribution guidelines if applicable]

## 📞 Support

[Add support contact information]
