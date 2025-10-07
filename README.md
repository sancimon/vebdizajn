# Recipe App - Next.js 14 with ShadCN UI

A modern recipe sharing application built with Next.js 14, App Router, and ShadCN UI.

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
veb1/
├── app/
│   ├── (pages)/
│   │   ├── page.tsx                 # Home page (/)
│   │   ├── signin/page.tsx          # Sign In page (/signin)
│   │   ├── signup/page.tsx          # Sign Up page (/signup)
│   │   ├── add-recipe/page.tsx      # Add Recipe page (/add-recipe)
│   │   └── recipe/[id]/page.tsx     # Recipe Detail page (/recipe/[id])
│   ├── layout.tsx                   # Root layout
│   └── globals.css                  # Global styles
├── components/
│   ├── layout/
│   │   ├── header.tsx               # Header component
│   │   ├── footer.tsx               # Footer component
│   │   └── container.tsx            # Container component
│   ├── providers/
│   │   └── theme-provider.tsx       # Theme provider
│   └── ui/                          # ShadCN UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── textarea.tsx
├── lib/
│   └── utils.ts                     # Utility functions
├── tailwind.config.ts               # Tailwind configuration
├── tsconfig.json                    # TypeScript configuration
├── next.config.mjs                  # Next.js configuration
├── postcss.config.mjs               # PostCSS configuration
├── components.json                  # ShadCN UI configuration
└── package.json                     # Dependencies
```

## 🎨 Pages

### Home (/)
- Hero section with call-to-action buttons
- Placeholder for popular recipes grid

### Sign In (/signin)
- Email and password form
- Link to Sign Up page

### Sign Up (/signup)
- Registration form with name, email, password, and confirmation
- Link to Sign In page

### Add Recipe (/add-recipe)
- Comprehensive recipe form with:
  - Title and description
  - Prep time, cook time, and servings
  - Ingredients and instructions
  - Image URL
  - Publish and draft options

### Recipe Detail (/recipe/[id])
- Recipe header with metadata
- Image placeholder
- Ingredients sidebar
- Instructions section
- Action buttons (save, share)

## 🧩 Components

### Layout Components
- **Header**: Navigation with logo, menu links, and auth buttons (responsive)
- **Footer**: Copyright and footer links
- **Container**: Responsive container wrapper

### UI Components (ShadCN)
- Button
- Card (with Header, Title, Description, Content, Footer)
- Input
- Label
- Textarea

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **ShadCN UI**: Beautiful, accessible component library
- **Dark Mode**: Built-in theme switching support

## 🔧 Configuration

- **TypeScript**: Fully typed
- **ESLint**: Code linting
- **App Router**: Next.js 14 app directory structure
- **Path Aliases**: `@/*` for easy imports

## 📝 Notes

- All pages are currently static components without data
- Forms do not have functionality yet
- Recipe data structures are placeholders
- Authentication is not implemented

## 🚀 Next Steps

1. Set up backend/API routes
2. Add database integration
3. Implement authentication
4. Create recipe data model
5. Add recipe CRUD operations
6. Implement image upload
7. Add search and filtering
8. Implement user profiles
