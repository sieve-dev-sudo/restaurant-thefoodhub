<div align="center">

# The FoodHub : Modern Restaurant

</div>

## 🛠️ Tech Stack

**ភាសាសរសេរកូដ និង ឧបករណ៍**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?style=flat&logo=visualstudiocode&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-4285F4?style=flat&logo=googlefonts&logoColor=white)

---

## ✨ Features

- **ពីរភាសា ខ្មែរ / English**: ប៊ូតុងជ្រើសរើសភាសានៅ Navbar ចុចភាសាណាចេញភាសានោះភ្លាមៗ ភាសាខ្មែរជាលំនាំដើម 
- **ម៉ឺនុយ**: ចែកតាមប្រភេទ Pizza / Burger / Pasta / Drink អាច Filter បានភ្លាមៗ
- **កន្ត្រកកម្មង់ (Cart)**: Add, កែចំនួន, លុប និងមើល Invoice
- **Wishlist (បេះដូង)**: រក្សាទុកម្ហូបចូលចិត្ត និង Add to Cart ពី Wishlist បានផ្ទាល់
- **Form**: កក់តុ (Reservation) និងទំនាក់ទំនង (Contact) មាន Validation និងសារបញ្ជាក់ពេលជោគជ័យ
- **UI ទំនើប**: Navbar ថេរមាន Glass effect, ប៊ូតុង និង Card មាន Animation, ចំណងជើង Hero វាយអក្សរ (Typewriter) ជាស្វ័យប្រវត្តិ
- **Responsive**: ពេញលេញ គ្រប់ទំហំអេក្រង់ (Mobile / Tablet / Desktop) មាន Hamburger Menu និង Scroll-to-top

---

## 📁 Project Structure

```
Restaurant-TheFoodHub/
├── css/
│   └── style.css          → CSS + Responsive ទាំងអស់ (រួមទាំងរចនាបថភាសាខ្មែរ)
├── html/
│   ├── about.html         → អំពីហាង និងដំណើររបស់យើង
│   ├── contact.html       → ទំនាក់ទំនង + ផែនទី
│   ├── menu.html          → ម៉ឺនុយពេញលេញ
│   └── reservation.html   → កក់តុ
├── images/                → រូបភាពម្ហូប / ហាង
│   ├── pizza/
│   ├── burgers/
│   ├── pasta/
│   ├── drinks/
│   ├── chef.png           → រូបគំនូរចុងភៅ (ទំព័រ About)
│   ├── hero-ring.png
│   └── logo-website.png
├── js/
│   ├── cart.js            → កន្ត្រកកម្មង់ (Add/Remove/Checkout)
│   ├── wishlist.js        → Wishlist (Add/Remove/View)
│   ├── filter.js          → រើសមើលម៉ឺនុយតាមប្រភេទ
│   ├── lang.js            → ប្តូរភាសា ខ្មែរ / English (ពាក្យបកប្រែទាំងអស់)
│   ├── script.js          → Navbar, Hamburger, Scroll-to-top, Typewriter
│   └── validation.js      → ត្រួតពិនិត្យ Form
├── index.html             → ទំព័រដើម
└── README.md
```

---

## 🌐 Language Switcher

- ប៊ូតុង **ភាសាខ្មែរ | English** នៅ Navbar ចុចភាសាណា ទំព័រទាំងមូលប្តូរទៅភាសានោះភ្លាមៗ ដោយមិនចាំបាច់ Reload
- អ្នកទស្សនាថ្មីឃើញ **ភាសាខ្មែរ** មុនគេ ហើយជម្រើសត្រូវបានរក្សាទុកក្នុង Browser (`localStorage`) ដូច្នេះទំព័រផ្សេងៗនៅតែប្រើភាសាដដែល
- `js/lang.js` បកប្រែអត្ថបទទាំងអស់ រួមទាំង Cart, Wishlist, Invoice, សារ Toast និងសារកំហុសរបស់ Form

---

## 🚀 How to Run

1. Clone ឬ Download Repository:

   ```bash
   git clone <repo-url>
   ```

2. បើកឯកសារ `index.html` ដោយ Browser ណាមួយ (Chrome, Firefox...)
3. រកមើលម៉ឺនុយ, បន្ថែមទៅកន្ត្រកកម្មង់, ប្តូរភាសា, រួចសាកល្បង Form កក់តុ ឬទំនាក់ទំនង។
