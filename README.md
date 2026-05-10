# 📌 To-Do List Web Application

## 🧠 Overview

This project is a modern **To-Do List web application** built using **HTML, CSS, and Vanilla JavaScript**.
It provides a clean and interactive interface for managing daily tasks with real-time updates and persistent storage.

The application includes advanced features such as task filtering, drag & drop reordering, dark mode, and local storage support.

---

## 🚀 Features

### 📋 Task Management

* Add new tasks dynamically
* Delete tasks
* Mark tasks as completed
* Edit existing tasks inline
* Automatic sorting (completed tasks moved down)

---

### 🎨 Style Customization

* Change task font family dynamically
* Change text color of tasks
* Personalize UI appearance based on user preference
* Improves readability and user experience

---
## File Tree

```
├── 🌐 index.html
├── 📄 script.js
└── 🎨 style.css
```
---
### 🔎 Search System

* Real-time task search
* Case-insensitive filtering
* Instant UI updates

---

### 🧲 Drag & Drop

* Reorder tasks using drag and drop
* Smooth visual feedback during dragging
* Persistent order after updates

---

### 🌙 Dark Mode

* Toggle between light and dark themes
* Saves user preference using localStorage
* Dynamic icon switching (moon/sun)

---

### 💾 Data Persistence

* Uses **localStorage** to save:

  * Tasks list
  * Dark mode state
* Data remains after page refresh

---

### 🆔 Unique Task IDs

* Each task is assigned a unique ID using `crypto.randomUUID()`
* Ensures safe identification and manipulation of tasks

---

## 🏗️ Architecture

### 📦 DOM Manipulation

The application dynamically creates and updates DOM elements for each task.

### ⚙️ Core Logic

* Task array is the main data source
* `render()` function is responsible for UI updates
* All actions (add, delete, edit, toggle) trigger re-rendering

### 💡 State Management

* Centralized in a single `tasks` array
* UI always reflects current state

---

## 🎯 Functional Flow

1. User adds a task → stored in array
2. UI is re-rendered automatically
3. User interacts (check / edit / delete)
4. State is updated
5. Data is saved in localStorage

---

## 🔐 Storage System

* `tasks` → stored as JSON in localStorage
* `darkMode` → stored as boolean string

This allows full persistence between sessions.

---

## 🎨 UI/UX Highlights
* Clean and modern interface
* Smooth drag & drop animations
* Responsive design
* Dark mode support
* Customizable font and text colors for better personalization

---

## ⚡ Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* Font Awesome (icons)
* localStorage API

---

## 🔮 Possible Improvements

* Add task categories (Work / Personal)
* Due dates & reminders
* Backend integration (Node.js / MongoDB)
* User authentication
* Cloud sync
* Kanban view (Notion style boards)

---

## 📌 Author

Developed as a front-end practice project focused on:

* DOM manipulation
* Event handling
* State management
* UI/UX design

---
## 📌 Copyright

© 2026 Amenallah Aoiadi. All rights reserved.  
This project is created for educational and portfolio purposes.

