# Next.js Planetscale Drizzle ORM Document Management

This is a simple document management system built with Next.js, Planetscale, the Drizzle ORM and TailwindCSS. This Projects allows you to have control over documents and they are editable with WYSIWYG editor, which allows more indebt editing.

## Prerequisites

Before you begin, make sure you have the following environment variables set in your `.env.local` file:

- `DATABASE_HOST`: The Planetscale database host (e.g., 'aws.connect.psdb.cloud').
- `DATABASE_USERNAME`: Your Planetscale database username.
- `DATABASE_PASSWORD`: Your Planetscale database password.
- `DATABASE_URL`: Your Planetscale database URL.

Make sure to replace the values with your actual Planetscale database information.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/unext1/next-document.git
```

2. Change into the project directory:

```bash
cd next-document
```

3. Install the project dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

Access the application in your browser at http://localhost:3000.

## Usage

This project provides basic document management functionality (CRUD). You can create, read, update, and delete documents using my UI. The main components include:

- List of documents
- Document page detailed
- Create new document
- Edit existing document
- Delete document
