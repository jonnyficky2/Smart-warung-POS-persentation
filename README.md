# 🚀 Smart Warung POS Presentation App

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://html.spec.whatwg.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org/)
[![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)

A premium, interactive, and aesthetically stunning web-based slideshow presentation showcasing the design, UML modeling, and implementation of the **Smart Warung POS (Point of Sale)** system developed for **Kedai Dafo**. 

This repository houses the interactive presentation web app, detailing all UML diagrams (Use Case, Class, Activity, Sequence, Collaboration, Statechart) and source code representations.

---

## 🎨 Presentation Features

- **Premium UI/UX Design**: Engineered with a modern glassmorphism aesthetic, sleek dark mode transitions, and customized gradients.
- **Interactive Navigation Sidebar**: Effortlessly jump between presentation sections (UML design, codebase, implementations, and summaries).
- **Keyboard Shortcuts**: Navigate slides with ease (`ArrowRight` / `Space` for Next, `ArrowLeft` for Prev, and `T` to toggle sidebar visibility).
- **Interactive Source Code Viewer**: Integrated code display window for `app.py` and `init_db.py` with syntax highlighting.
- **Click-to-Zoom Lightbox Modal**: View complex UML diagrams in full detail with scroll-to-zoom and click-and-drag panning.
- **Walkthrough Simulator**: Step-by-step interactive simulator displaying user flows (Authentication, Checkout, Stock Management, Reporting) alongside real screenshots.

---

## 🏗️ POS Application System Architecture

The modeled application itself is built upon a lightweight and reliable web architecture:

- **Backend**: Python / Flask (MVC-like pattern managing transactions, products, and users).
- **Database**: SQLite (Relational DB utilizing relational mappings for detail transactions).
- **Access Control**: Role-Based Access Control (RBAC) separating **Kasir** (only transactions/checkout) and **Owner** (financial dashboard, product stock management, reporting).

---

## 📂 Repository Directory Structure

```text
POS/
├── assets/
│   ├── css/
│   │   └── style.css                     # Premium styling sheets
│   ├── use-case/
│   │   └── use case.png                  # Use Case UML Diagram
│   ├── class-diagram/
│   │   └── class diagram.png             # Class UML Diagram
│   ├── activity-diagram/                 # Activity UML Diagrams (Login, Penjualan, Laporan)
│   ├── sequence-diagram/                 # Sequence UML Diagrams (Login, Pembayaran, Laporan)
│   ├── collaboratiion-diagram/           # Collaboration UML Diagrams (Login, Penjualan, Laporan)
│   ├── statechart-diagram/               # Statechart UML Diagrams (Login, Penjualan, Laporan)
│   └── application-screenshots/          # POS App Screenshots & Source Code captures
├── index.html                            # Core Presentation HTML structure
├── script.js                             # Interactive slide & simulator controller
└── README.md                             # Documentation
```

---

## ⚙️ Installation & Usage

As the presentation is a standalone, client-side web application, no compilation or complex server setup is required.

### Local Execution
1. Clone the repository:
   ```bash
   git clone https://github.com/jonnyficky2/Smart-warung-POS-persentation.git
   ```
2. Navigate to the project folder:
   ```bash
   cd Smart-warung-POS-persentation
   ```
3. Open `index.html` in your web browser, or launch it using a local development server (e.g. Live Server in VS Code, or python simple HTTP server):
   ```bash
   python3 -m http.server 8000
   ```

---

## 📸 Screenshots & Diagrams Preview

<details>
<summary><b>📐 UML Diagrams (Click to Expand)</b></summary>
<br>

| Diagram | Preview |
| --- | --- |
| **Use Case Diagram** | ![Use Case](assets/use-case/use%20case.png) |
| **Class Diagram** | ![Class Diagram](assets/class-diagram/class%20diagram.png) |
| **Activity Login** | ![Activity Login](assets/activity-diagram/Activity_Diagram_Login.drawio.png) |
| **Sequence Pembayaran** | ![Sequence Pembayaran](assets/sequence-diagram/Sequence%20Diagram%20Pembayaran.png) |

</details>

<details>
<summary><b>🖥️ POS Application Interface (Click to Expand)</b></summary>
<br>

| Halaman | Preview |
| --- | --- |
| **Login Screen** | ![Login](assets/application-screenshots/Login.png) |
| **Dashboard Owner** | ![Dashboard](assets/application-screenshots/dashboard.png) |
| **Transaksi POS** | ![Transaksi](assets/application-screenshots/transaksi.png) |
| **Kelola Stok** | ![Kelola Stok](assets/application-screenshots/stok.png) |
| **Laporan Owner** | ![Laporan](assets/application-screenshots/laporanowner.png) |

</details>

---

## 🧑‍💻 Author

- **Jonny Ficky** - [jonnyficky2](https://github.com/jonnyficky2)
