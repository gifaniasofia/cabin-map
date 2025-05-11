# CabinMap

CabinMap is a seat selection interface inspired by airline booking systems. This project is built as part of a frontend technical test using **Next.js 15+, Tailwind CSS 4**, and **TypeScript**.

It displays detailed airplane seat maps with segment, seat type, pricing, and passenger allocation — all based on a mock JSON response (acting as the backend API).

---

## 🌐 Live Demo

🔗 https://cabin-map.vercel.app

🔗 https://drive.google.com/drive/folders/1QgFyuFBuczxkhuRVoDNJ9uNLgg2Y8BFF?usp=sharing

---

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org/) – App Router, Metadata API
- [Tailwind CSS 4](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Lucide Icons](https://lucide.dev/)
- [Radix UI](https://www.radix-ui.com/)
- [date-fns](https://date-fns.org/)
- Optional: [Framer Motion](https://www.framer.com/motion/)

---

### 🚀 Requirements

- Node.js 20+
- npm or yarn

---

### 🛠 Getting Started

Clone the repository and install dependencies:

```shell
git clone https://github.com/gifaniasofia/cabin-map
cd cabin-map

npm install
# or
yarn install
```

Start the development server:

```shell
npm run dev
# or
yarn dev
```

Open http://localhost:3000 to see the project.

### 🧭 Project structure

```shell
.
├── README.md                       # README file
├── public                          # Static assets
├── src
│   ├── app                         # Next JS App (App Router)
│   ├── components                  # Shared components (icons, UI, layout)
│   ├── features                    # Components specific to a feature
│   ├── hooks                       # Custom React hooks
│   ├── libs                        # External libraries & configs
│   ├── locales                     # Locales folder
│   ├── styles                      # Styles folder
│   ├── types                       # Type definitions
│   └── utils                       # Utilities folder
└── tsconfig.json                   # TypeScript configuration
```

### 📦 Build & Deploy

Build an optimized production version:

```shell
$ npm run build
```

Run the production build locally:

```shell
$ npm run start
```

This command starts a local server using the production build. Then open http://localhost:3000 in preferred browser to see the result.

🔖 Note
This project was built solely for demonstration and assessment purposes.
