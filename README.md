# Domio — Smart Home E-commerce Demo

Domio is a responsive, multilingual storefront for smart curtain automation. It began as my first AI-assisted web project and serves as a practical space for learning, testing, and refining product structure, UX, content, localization, and quality assurance.

> **Portfolio note:** Domio is a demo project. It is not currently operating as a real company or accepting real orders.

## Live demo

[smart-home-domio.vercel.app](https://smart-home-domio.vercel.app/en)

## What the project includes

- Multilingual experience in Bosnian, English, and German
- Product catalog with two curtain robot configurations and a solar charger
- Product variants, optional add-ons, quantity controls, and cart interactions
- Product specifications and clear customer-facing purchase information
- Blog content and legal/policy pages
- Responsive layouts for desktop and mobile
- Playwright setup for end-to-end and accessibility testing

## My role

I shaped the product concept, brand direction, content structure, customer journey, product information, and localization. I also guided the implementation, reviewed the generated code and interface, tested the experience, and iterated on the result.

## AI-assisted development

Domio was built with **Claude Code** as an AI-assisted development tool. I directed the process by defining the requirements, structure, content, UX decisions, and product logic, then reviewed and refined the output. This repository is intentionally transparent about that workflow.

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Gray Matter and Marked for content
- Playwright and axe-core for testing
- Vercel for deployment

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

```bash
npm test
npm run test:e2e
npm run test:a11y
```

---

Created by [Armina Hrnjić](https://github.com/arminahrnjic).
