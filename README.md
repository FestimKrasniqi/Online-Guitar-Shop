# 🎸 Online Guitar Shop

A React + TypeScript web app to explore guitar brands and models with GraphQL data and multilingual support.

---

## 🚀 Features
- Browse brands and their guitar models  
- View detailed specs & musicians for each model  
- Multilingual support (EN/AL)  
- Search, filter & pagination  
- GraphQL + Apollo Client for data fetching  

---

## 🛠 Tech Stack
- **React (TypeScript)**  
- **Apollo Client (GraphQL)**  
- **React Router**  
- **Custom Translations**  
- **CSS Styling**  

---

## 📦 Getting Started
```bash
git clone https://github.com/FestimKrasniqi/Online-Guitar-Shop.git
cd online-guitar-shop
npm install
npm run dev
```


---

## 📂 Pages
- **Home** → Browse guitar brands  
- **Models** → Models by brand (search, filter, load more)  
- **Model Details** → Specs + musicians tabs  

---

## 🌍 Translations
- Defined in `translations.ts`  
- Uses `LanguageContext` to switch languages dynamically  

---

## 🔗 GraphQL Queries
- `GET_ALL_BRANDS` → All brands  
- `GET_MODELS_BY_BRAND` → Models of a brand  
- `GET_UNIQUE_MODEL` → Model details  
- `SEARCH_MODELS` -> Search Models of a brand by name


---

## 👨‍💻 Author

- [Festim Krasniqi](https://github.com/FestimKrasniqi)


