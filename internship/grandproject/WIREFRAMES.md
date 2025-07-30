# Wireframes & UI/UX Specifications
## AI-Powered Recipe Generator

### 1. Design System

#### 1.1 Color Palette
- **Primary**: #FF6B35 (Orange) - Brand color, CTAs
- **Secondary**: #2C3E50 (Dark Blue) - Text, headers
- **Accent**: #E74C3C (Red) - Alerts, warnings
- **Success**: #27AE60 (Green) - Success states
- **Background**: #F8F9FA (Light Gray) - Page backgrounds
- **Surface**: #FFFFFF (White) - Cards, modals
- **Text Primary**: #2C3E50 (Dark Blue) - Main text
- **Text Secondary**: #6C757D (Gray) - Secondary text

#### 1.2 Typography
- **Primary Font**: Inter (Google Fonts)
- **Heading Font**: Inter (Bold weights)
- **Body Font**: Inter (Regular weight)
- **Font Sizes**: 12px, 14px, 16px, 18px, 24px, 32px, 48px

#### 1.3 Spacing System
- **Base Unit**: 4px
- **Spacing Scale**: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 48px, 64px

#### 1.4 Component Library
- **Buttons**: Primary, Secondary, Ghost variants
- **Cards**: Recipe cards, info cards
- **Inputs**: Text inputs, search bars
- **Modals**: Authentication, recipe details
- **Navigation**: Header, footer, breadcrumbs

### 2. Page Wireframes

#### 2.1 Landing Page (Home)
```
┌─────────────────────────────────────────────────────────────┐
│ Header: Logo | Navigation | Sign In | Sign Up              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    Hero Section                         │ │
│  │                                                         │ │
│  │  🍳 AI-Powered Recipe Generator                        │ │
│  │  Discover amazing recipes with AI                      │ │
│  │                                                         │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │ 🔍 Search for any dish...                          │ │ │
│  │  │ [Search Input Field] [Generate Recipe Button]      │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    Popular Recipes                      │ │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐      │ │
│  │  │ Recipe  │ │ Recipe  │ │ Recipe  │ │ Recipe  │      │ │
│  │  │ Card 1  │ │ Card 2  │ │ Card 3  │ │ Card 4  │      │ │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘      │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    Features                             │ │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐                  │ │
│  │  │ AI Gen  │ │ Magic   │ │ Save &  │                  │ │
│  │  │ Recipes │ │ Links   │ │ Share   │                  │ │
│  │  └─────────┘ └─────────┘ └─────────┘                  │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│ Footer: Links | Social Media | Copyright                   │
└─────────────────────────────────────────────────────────────┘
```

#### 2.2 Authentication Page
```
┌─────────────────────────────────────────────────────────────┐
│ Header: Logo | Back to Home                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    Sign In                              │ │
│  │                                                         │ │
│  │  🍳 Welcome to Recipe Generator                        │ │
│  │  Enter your email to get started                       │ │
│  │                                                         │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │ Email Address                                       │ │ │
│  │  │ [email@example.com]                                 │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │                                                         │ │
│  │  [Send Magic Link Button]                              │ │
│  │                                                         │ │
│  │  No password required - just click the link in your    │ │
│  │  email to sign in securely.                            │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    Magic Link Sent                     │ │
│  │                                                         │ │
│  │  ✅ Check your email!                                  │ │
│  │  We've sent a magic link to your email address.        │ │
│  │  Click the link to sign in instantly.                  │ │
│  │                                                         │ │
│  │  Didn't receive it? [Resend Link]                      │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

#### 2.3 Recipe Generation Page
```
┌─────────────────────────────────────────────────────────────┐
│ Header: Logo | Search | User Menu                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    Generate Recipe                      │ │
│  │                                                         │ │
│  │  What would you like to cook today?                    │ │
│  │                                                         │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │ 🔍 Search for any dish...                          │ │ │
│  │  │ [Search Input Field] [Generate Recipe Button]      │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │                                                         │ │
│  │  Popular searches: Pasta Carbonara, Chicken Curry,     │ │
│  │  Chocolate Cake, Beef Stir Fry                         │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    Generating Recipe...                 │ │
│  │                                                         │ │
│  │  🍳 Creating your perfect recipe...                    │ │
│  │  [Loading Spinner]                                     │ │
│  │                                                         │ │
│  │  This may take a few seconds while our AI works its    │ │
│  │  magic!                                                │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

#### 2.4 Recipe Display Page
```
┌─────────────────────────────────────────────────────────────┐
│ Header: Logo | Search | User Menu                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    Recipe Title                         │ │
│  │                                                         │ │
│  │  🍳 Chicken Tikka Masala                               │ │
│  │                                                         │ │
│  │  ⏱️ 45 mins | 🔥 Medium | 🇮🇳 Indian                   │ │
│  │                                                         │ │
│  │  [❤️ Save] [📤 Share] [🖨️ Print]                      │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    Ingredients                          │ │
│  │                                                         │ │
│  │  📋 Ingredients (4 servings)                           │ │
│  │                                                         │ │
│  │  • 500g chicken breast, cubed                          │ │
│  │  • 2 tbsp tikka masala paste                           │ │
│  │  • 1 cup coconut milk                                  │ │
│  │  • 1 onion, diced                                      │ │
│  │  • 2 cloves garlic, minced                             │ │
│  │  • 1 inch ginger, grated                               │ │
│  │  • Salt and pepper to taste                            │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    Instructions                         │ │
│  │                                                         │ │
│  │  👨‍🍳 Instructions                                    │ │
│  │                                                         │ │
│  │  1. Marinate chicken with tikka masala paste for 30    │ │
│  │     minutes.                                           │ │
│  │                                                         │ │
│  │  2. Heat oil in a large pan over medium heat.          │ │
│  │                                                         │ │
│  │  3. Add onions and cook until softened, about 5        │ │
│  │     minutes.                                           │ │
│  │                                                         │ │
│  │  4. Add garlic and ginger, cook for 1 minute.          │ │
│  │                                                         │ │
│  │  5. Add marinated chicken and cook until browned.      │ │
│  │                                                         │ │
│  │  6. Pour in coconut milk and simmer for 20 minutes.    │ │
│  │                                                         │ │
│  │  7. Season with salt and pepper. Serve hot with rice.  │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    Nutritional Info                     │ │
│  │                                                         │ │
│  │  📊 Nutrition (per serving)                            │ │
│  │                                                         │ │
│  │  Calories: 350 | Protein: 25g | Carbs: 8g | Fat: 22g   │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

#### 2.5 User Dashboard
```
┌─────────────────────────────────────────────────────────────┐
│ Header: Logo | Search | User Menu                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    Welcome Back!                        │ │
│  │                                                         │ │
│  │  👋 Hello, user@example.com                            │ │
│  │                                                         │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │ 🔍 Quick Recipe Search                              │ │ │
│  │  │ [Search Input] [Generate]                           │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    My Favorites                         │ │
│  │                                                         │ │
│  │  ❤️ Saved Recipes (12)                                 │ │
│  │                                                         │ │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐      │ │
│  │  │ Recipe  │ │ Recipe  │ │ Recipe  │ │ Recipe  │      │ │
│  │  │ Card 1  │ │ Card 2  │ │ Card 3  │ │ Card 4  │      │ │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘      │ │
│  │                                                         │ │
│  │  [View All Favorites]                                  │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                    Recent Recipes                       │ │
│  │                                                         │ │
│  │  🕒 Recently Generated (8)                             │ │
│  │                                                         │ │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐      │ │
│  │  │ Recipe  │ │ Recipe  │ │ Recipe  │ │ Recipe  │      │ │
│  │  │ Card 1  │ │ Card 2  │ │ Card 3  │ │ Card 4  │      │ │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘      │ │
│  │                                                         │ │
│  │  [View All Recent]                                     │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 3. Component Wireframes

#### 3.1 Recipe Card Component
```
┌─────────────────────────────────────────────────────────────┐
│  🍳 Chicken Tikka Masala                                   │
│                                                             │
│  ⏱️ 45 mins | 🔥 Medium | 🇮🇳 Indian                       │
│                                                             │
│  A creamy and flavorful Indian curry made with tender      │
│  chicken pieces in a rich tomato-based sauce...            │
│                                                             │
│  [❤️ Save] [👁️ View] [📤 Share]                           │
└─────────────────────────────────────────────────────────────┘
```

#### 3.2 Search Bar Component
```
┌─────────────────────────────────────────────────────────────┐
│ 🔍 Search for any dish... [Generate Recipe]                │
└─────────────────────────────────────────────────────────────┘
```

#### 3.3 Navigation Header
```
┌─────────────────────────────────────────────────────────────┐
│ 🍳 RecipeGen | 🔍 [Search] | 👤 User Menu                  │
└─────────────────────────────────────────────────────────────┘
```

#### 3.4 Loading States
```
┌─────────────────────────────────────────────────────────────┐
│                    Generating Recipe...                     │
│                                                             │
│  🍳 Creating your perfect recipe...                        │
│  [⏳ Loading Spinner]                                      │
│                                                             │
│  This may take a few seconds while our AI works its        │
│  magic!                                                    │
└─────────────────────────────────────────────────────────────┘
```

### 4. Mobile Responsive Design

#### 4.1 Mobile Layout (320px - 768px)
- Single column layout
- Stacked navigation
- Full-width search bar
- Larger touch targets (44px minimum)
- Simplified recipe cards
- Bottom navigation for key actions

#### 4.2 Tablet Layout (768px - 1024px)
- Two-column grid for recipe cards
- Side navigation
- Medium-sized search bar
- Balanced spacing and typography

#### 4.3 Desktop Layout (1024px+)
- Multi-column layouts
- Hover effects and animations
- Advanced filtering options
- Detailed recipe information panels

### 5. Interactive Elements

#### 5.1 Hover States
- Button hover effects with color transitions
- Card hover with subtle elevation
- Link hover with underline animations

#### 5.2 Loading States
- Skeleton loading for recipe cards
- Progress indicators for recipe generation
- Smooth transitions between states

#### 5.3 Error States
- Clear error messages with actionable solutions
- Retry mechanisms for failed requests
- Graceful degradation for offline scenarios

### 6. Accessibility Features

#### 6.1 Keyboard Navigation
- Tab order follows logical flow
- Focus indicators on all interactive elements
- Skip links for main content

#### 6.2 Screen Reader Support
- Semantic HTML structure
- ARIA labels for complex components
- Alt text for images and icons

#### 6.3 Color and Contrast
- WCAG AA compliant color contrast ratios
- Color-blind friendly palette
- High contrast mode support

### 7. Animation Guidelines

#### 7.1 Micro-interactions
- Button click feedback (scale down)
- Card hover animations (elevation)
- Loading spinners and progress bars

#### 7.2 Page Transitions
- Smooth fade transitions between pages
- Staggered animations for list items
- Progressive disclosure for complex content

#### 7.3 Performance Considerations
- CSS transforms for smooth animations
- Reduced motion support for accessibility
- Optimized animation timing (200-300ms)

This comprehensive wireframe document provides the foundation for building a professional, user-friendly AI-Powered Recipe Generator web application with modern design principles and excellent user experience. 