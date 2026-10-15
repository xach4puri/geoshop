# GeoBazaar - Full-Stack E-Commerce Platform

A robust Full-Stack web application designed for browsing, filtering, and managing product listings with secure authentication and modern UI/UX.

## 🚀 Technologies Used

### Backend:
- **Python 3.10+**
- **Django** & **Django REST Framework (DRF)**
- **SQLite / PostgreSQL**
- **JWT Authentication** (`djangorestframework-simplejwt`)
- **WhiteNoise** (for static files in production)

### Frontend:
- **React** (Vite)
- **React Router**
- **Axios**
- **Responsive Design & Modern CSS**

---

## ✨ Features
- **User Authentication:** Complete Login & Registration flow with JWT access/refresh tokens.
- **Product Catalog:** Advanced filtering by category name (`?category__name=...`), search (`?search=...`), sorting (`?ordering=...`), and pagination.
- **Protected Routes:** Secure front-end routes and backend permissions (CRUD operations restricted to owners/admins).
- **Responsive UI/UX:** Mobile-friendly design with Loading, Error, and Empty states.
- **API Documentation:** Fully structured endpoints.

---

## 🛠️ Local Installation & Running

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/shop-project.git](https://github.com/your-username/shop-project.git)
cd shop-project