// ============================================
// THE FOOD HUB - Language Switcher (EN / Khmer)
// Translates the page by matching English text to Khmer.
// Also translates text that other scripts add later
// (cart drawer, wishlist, toasts, form errors).
// ============================================

(function () {
  'use strict';

  var STORAGE_KEY = 'foodhub-lang';
  var EN_DASH = '\u2013';
  var EM_DASH = '\u2014';

  // ---------- English -> Khmer dictionary ----------
  var dict = {
    // Page titles
    'Home - TheFoodHub': 'ទំព័រដើម - TheFoodHub',
    'Menu - TheFoodHub': 'ម៉ឺនុយ - TheFoodHub',
    'About - TheFoodHub': 'អំពីយើង - TheFoodHub',
    'Contact - TheFoodHub': 'ទំនាក់ទំនង - TheFoodHub',
    'Reservation - TheFoodHub': 'កក់តុ - TheFoodHub',

    // Navbar and shared labels
    'Home': 'ទំព័រដើម',
    'Menu': 'ម៉ឺនុយ',
    'About': 'អំពីយើង',
    'Contact': 'ទំនាក់ទំនង',
    'Reservation': 'កក់តុ',
    'Book a Table': 'កក់តុ',
    'Switch language': 'ប្តូរភាសា',
    'View wishlist': 'មើលបញ្ជីសំណព្វចិត្ត',
    'View order': 'មើលការបញ្ជាទិញ',
    'Add to wishlist': 'បន្ថែមទៅបញ្ជីសំណព្វចិត្ត',
    'Scroll to top': 'ត្រឡប់ទៅលើ',
    'Close': 'បិទ',
    'Decrease': 'បន្ថយ',
    'Increase': 'បន្ថែម',

    // Home: hero
    'Modern Restaurant & Kitchen': 'ភោជនីយដ្ឋាន និងផ្ទះបាយទំនើប',
    'Fresh ingredients, bold flavors, and recipes crafted by chefs who care about every plate that leaves the kitchen.':
      'គ្រឿងផ្សំស្រស់ រសជាតិខ្លាំងក្លា និងរូបមន្តដែលរៀបចំដោយចុងភៅ ដែលយកចិត្តទុកដាក់គ្រប់ចានដែលចេញពីផ្ទះបាយ។',
    'View Menu': 'មើលម៉ឺនុយ',
    'New': 'ថ្មី',
    'Now Open': 'បើកហើយឥឡូវនេះ',
    'Average Rating': 'ពិន្ទុជាមធ្យម',
    'Dishes On Menu': 'ម្ហូបក្នុងម៉ឺនុយ',
    'Signature dish at The Food Hub': 'ម្ហូបពិសេសរបស់ The Food Hub',

    // Home: categories
    'Browse': 'រកមើល',
    'Explore by Category': 'ស្វែងរកតាមប្រភេទ',
    "From classic favorites to refreshing drinks, find exactly what you're craving.":
      'ពីម្ហូបដែលគេចូលចិត្តបុរាណ ដល់ភេសជ្ជៈត្រជាក់ ស្វែងរកអ្វីដែលអ្នកចង់ញ៉ាំ។',
    'Pizza': 'ភីហ្សា',
    'Burger': 'ប៊ឺហ្គឺរ',
    'Burgers': 'ប៊ឺហ្គឺរ',
    'Pasta': 'ប៉ាស្តា',
    'Drink': 'ភេសជ្ជៈ',
    'Drinks': 'ភេសជ្ជៈ',
    'All': 'ទាំងអស់',

    // Home: popular dishes
    'Our Menu': 'ម៉ឺនុយរបស់យើង',
    'Popular Dishes': 'ម្ហូបពេញនិយម',
    'Hand-picked favorites, loved by our regulars and first-time guests alike.':
      'ម្ហូបជ្រើសរើសយ៉ាងយកចិត្តទុកដាក់ ដែលភ្ញៀវប្រចាំ និងភ្ញៀវថ្មីចូលចិត្តដូចគ្នា។',
    'Bestseller': 'លក់ដាច់បំផុត',
    'Order Now': 'កុម្ម៉ង់ឥឡូវ',

    // Dishes
    'Pepperoni Pizza': 'ភីហ្សាប៉េប៉េរ៉ូនី',
    'Classic pepperoni with mozzarella on a wood-fired crust.': 'ប៉េប៉េរ៉ូនីបុរាណជាមួយឈីស mozzarella លើមូលភីហ្សាដុតនឹងអុស។',
    'Cheese Pizza': 'ភីហ្សាឈីស',
    'Triple mozzarella blend on our classic tomato base.': 'ល្បាយឈីស mozzarella បីប្រភេទលើទឹកជ្រលក់ប៉េងប៉ោះបុរាណរបស់យើង។',
    'Beef Burger': 'ប៊ឺហ្គឺរសាច់គោ',
    'Juicy beef patty, cheddar, lettuce, and house sauce.': 'សាច់គោអាំងទន់ជ្រាយ ឈីស cheddar សាឡាត់ និងទឹកជ្រលក់ពិសេសរបស់ហាង។',
    'Chicken Burger': 'ប៊ឺហ្គឺរសាច់មាន់',
    'Crispy chicken fillet with slaw and spicy mayo.': 'សាច់មាន់ចៀនស្រួយជាមួយស្ពៃក្តោបហាន់ និង mayo ហឹរ។',
    'Carbonara': 'កាបូណារ៉ា',
    'Creamy egg sauce, pancetta, and fresh cracked pepper.': 'ទឹកជ្រលក់ពងមាន់ក្រែម សាច់ជ្រូកប៉ាន់សេតា និងម្រេចកិនស្រស់។',
    'Coca Cola': 'កូកាកូឡា',
    'Ice-cold classic soda, served in a chilled glass.': 'សូដាបុរាណត្រជាក់ស្រួយ បម្រើក្នុងកែវត្រជាក់។',
    'Seafood Pizza': 'ភីហ្សាគ្រឿងសមុទ្រ',
    'Shrimp, calamari, and mussels with garlic butter.': 'បង្គា មឹក និងគ្រុនសមុទ្រ ជាមួយប៊ឺខ្ទឹមស។',
    'Mushroom Pizza': 'ភីហ្សាផ្សិត',
    'Wild mushrooms, truffle oil, and melted mozzarella.': 'ផ្សិតព្រៃ ប្រេង truffle និងឈីស mozzarella រលាយ។',
    'Hawaiian Pizza': 'ភីហ្សាហាវ៉ៃ',
    'Sweet pineapple, smoked ham, and mozzarella.': 'ម្នាស់ផ្អែម សាច់ជ្រូកហ៊ុយ និងឈីស mozzarella។',
    'BBQ Chicken Pizza': 'ភីហ្សាមាន់អាំង BBQ',
    'Grilled chicken, red onion, and smoky BBQ sauce.': 'សាច់មាន់អាំង ខ្ទឹមក្រហម និងទឹកជ្រលក់ BBQ ក្លិនផ្សែង។',
    'Cheese Burger': 'ប៊ឺហ្គឺរឈីស',
    'Double cheddar melted over a smashed beef patty.': 'ឈីស cheddar ពីរជាន់រលាយលើសាច់គោកិនសង្កត់។',
    'Bacon Burger': 'ប៊ឺហ្គឺរបេខុន',
    'Crispy bacon, cheddar, and caramelized onion.': 'បេខុនស្រួយ ឈីស cheddar និងខ្ទឹមខ្វៃស្ករ។',
    'Double Smash Burger': 'ប៊ឺហ្គឺរ Double Smash',
    'Two smashed beef patties, double cheese, and house pickles.': 'សាច់គោកិនសង្កត់ពីរដុំ ឈីសទ្វេ និងត្រសក់ក្តឹបពិសេសរបស់ហាង។',
    'Veggie Burger': 'ប៊ឺហ្គឺរបន្លែ',
    'Grilled vegetable patty with fresh greens and aioli.': 'បន្លែអាំងជាដុំ ជាមួយបន្លែស្រស់ និង aioli។',
    'Alfredo': 'អាល់ហ្វ្រេដូ',
    'Smooth parmesan cream sauce with perfectly cooked fettuccine.': 'ទឹកជ្រលក់ក្រែមឈីស parmesan ទន់រលោង ជាមួយ fettuccine ចម្អិនបានល្អឥតខ្ចោះ។',
    'Bolognese': 'បូឡូញេស',
    'Slow-cooked beef ragu over al dente spaghetti.': 'ទឹកជ្រលក់សាច់គោ ragu ចម្អិនយឺតៗ លើ spaghetti al dente។',
    'Pepsi': 'ប៉េបស៊ី',
    'A classic cola with a bold, refreshing taste, served ice cold.': 'កូឡាបុរាណរសជាតិខ្លាំងស្រស់ស្រាយ បម្រើត្រជាក់។',
    'Purified Water': 'ទឹកសុទ្ធ',
    'Clean, chilled bottled water sourced locally for everyday refreshment.': 'ទឹកដបស្អាតត្រជាក់ មកពីក្នុងស្រុក សម្រាប់ផឹកជារៀងរាល់ថ្ងៃ។',

    // Home: why choose us
    'Our Promise': 'ការសន្យារបស់យើង',
    'Why Choose Us': 'ហេតុអ្វីជ្រើសរើសយើង',
    'Fresh Ingredients': 'គ្រឿងផ្សំស្រស់',
    'Sourced daily from trusted local farms.': 'ទិញរាល់ថ្ងៃពីកសិដ្ឋានក្នុងស្រុកដែលទុកចិត្តបាន។',
    'Professional Chefs': 'ចុងភៅអាជីព',
    'Years of craft behind every dish.': 'បទពិសោធន៍ជាច្រើនឆ្នាំនៅពីក្រោយគ្រប់ម្ហូប។',
    'Fast Delivery': 'ដឹកជញ្ជូនលឿន',
    'Hot and fresh, right to your door.': 'ក្តៅៗ ស្រស់ៗ ដល់មុខផ្ទះអ្នក។',
    'Easy Payment': 'ទូទាត់ងាយស្រួល',
    'Cash, card, or mobile. your choice.': 'សាច់ប្រាក់ កាត ឬទូរស័ព្ទ តាមការជ្រើសរើសរបស់អ្នក។',

    // Home: reviews
    'Recommendations': 'ការណែនាំ',
    'Highly Recommended By Our Guests': 'ត្រូវបានណែនាំខ្ពស់ដោយភ្ញៀវរបស់យើង',
    '"Cozy vibe and the burger was cooked to perfection."': '“បរិយាកាសកក់ក្តៅ ហើយប៊ឺហ្គឺរចម្អិនបានល្អឥតខ្ចោះ។”',
    '"This place feels like home, and the pizza never disappoints."': '“កន្លែងនេះដូចនៅផ្ទះ ហើយភីហ្សាមិនដែលធ្វើឱ្យខកចិត្តទេ។”',
    '"Quick service, generous portions, and unbeatable value."': '“សេវាលឿន បរិមាណច្រើន និងតម្លៃមិនអាចប្រៀបបាន។”',
    '"The food here is absolutely amazing, every single time."': '“ម្ហូបនៅទីនេះអស្ចារ្យណាស់ គ្រប់ពេលទាំងអស់។”',
    '"Best pasta I\'ve had in the city, hands down."': '“ប៉ាស្តាឆ្ងាញ់បំផុតដែលខ្ញុំធ្លាប់ញ៉ាំក្នុងទីក្រុង។”',
    '"Great atmosphere and even better service."': '“បរិយាកាសល្អ ហើយសេវាកាន់តែល្អជាង។”',
    'First-Time Guest': 'ភ្ញៀវលើកដំបូង',
    'Regular Guest': 'ភ្ញៀវប្រចាំ',
    'Food Blogger': 'អ្នកសរសេរប្លក់ម្ហូប',

    // Footer
    'Newly opened and serving fresh, honest food made with care. Come hungry, leave happy.':
      'ទើបបើកថ្មី បម្រើម្ហូបស្រស់ស្មោះត្រង់ ដែលធ្វើដោយយកចិត្តទុកដាក់។ មកដោយឃ្លាន ចេញទៅដោយសប្បាយចិត្ត។',
    'Quick Links': 'តំណរហ័ស',
    'Opening Hours': 'ម៉ោងបើក',
    ['Weekday : 9am' + EN_DASH + '10pm']: 'ថ្ងៃធ្វើការ : 9ព្រឹក' + EN_DASH + '10យប់',
    ['Weekend : 10am' + EN_DASH + '11pm']: 'ចុងសប្តាហ៍ : 10ព្រឹក' + EN_DASH + '11យប់',
    '123 Riverside Street, Phnom Penh': 'ផ្លូវ Riverside លេខ 123 ភ្នំពេញ',
    '© 2026 The Food Hub. All rights reserved.': '© 2026 The Food Hub។ រក្សាសិទ្ធិគ្រប់យ៉ាង។',

    // About page
    'Our Story': 'រឿងរ៉ាវរបស់យើង',
    'About The Food Hub': 'អំពី The Food Hub',
    'Illustration of a chef': 'រូបគំនូរចុងភៅ',
    'Grand Opening 2026': 'ពិធីបើកជាផ្លូវការ 2026',
    'A brand-new kitchen, built with heart': 'ផ្ទះបាយថ្មីស្រឡាង សាងសង់ដោយអស់ពីចិត្ត',
    "The Food Hub just opened its doors this year, built on a simple idea: serve honest food made from ingredients we'd be proud to put on our own table.":
      'The Food Hub ទើបបើកទ្វារកាលពីឆ្នាំនេះ ដោយផ្អែកលើគំនិតសាមញ្ញមួយ គឺបម្រើម្ហូបស្មោះត្រង់ ធ្វើពីគ្រឿងផ្សំដែលយើងមានមោទនភាពដាក់លើតុរបស់យើងផ្ទាល់។',
    "Every recipe on our menu was developed and tested by our chefs before opening day. We work with local farms and suppliers to keep things fresh, and we're just getting started.":
      'រាល់រូបមន្តក្នុងម៉ឺនុយត្រូវបានបង្កើត និងសាកល្បងដោយចុងភៅរបស់យើងមុនថ្ងៃបើក។ យើងធ្វើការជាមួយកសិដ្ឋាន និងអ្នកផ្គត់ផ្គង់ក្នុងស្រុកដើម្បីរក្សាភាពស្រស់ ហើយយើងទើបតែចាប់ផ្តើម។',
    'Locally sourced ingredients': 'គ្រឿងផ្សំពីក្នុងស្រុក',
    'Made fresh daily, never frozen': 'ធ្វើស្រស់រាល់ថ្ងៃ មិនដែលទុកក្នុងទូទឹកកក',
    'A brand-new menu crafted with care': 'ម៉ឺនុយថ្មីស្រឡាងដែលរៀបចំដោយយកចិត្តទុកដាក់',
    'A team that genuinely loves what they cook': 'ក្រុមការងារដែលស្រឡាញ់ការចម្អិនរបស់ពួកគេពិតប្រាកដ',
    'Our Journey': 'ដំណើររបស់យើង',
    'How We Got Here': 'យើងមកដល់ទីនេះដោយរបៀបណា',
    'Early 2026': 'ដើមឆ្នាំ 2026',
    'The Idea': 'គំនិតផ្តួចផ្តើម',
    'A small team of food lovers started planning a kitchen of their own.': 'ក្រុមតូចមួយនៃអ្នកស្រឡាញ់ម្ហូបចាប់ផ្តើមគិតគូរអំពីផ្ទះបាយផ្ទាល់ខ្លួន។',
    'Spring 2026': 'និទាឃរដូវ 2026',
    'Building the Menu': 'បង្កើតម៉ឺនុយ',
    'Our chefs spent months developing and tasting every recipe on the menu.': 'ចុងភៅរបស់យើងចំណាយពេលច្រើនខែដើម្បីបង្កើត និងភ្លក់រាល់រូបមន្តក្នុងម៉ឺនុយ។',
    'May 2026': 'ឧសភា 2026',
    'Getting the Space Ready': 'រៀបចំទីតាំង',
    'Renovated our dining room and kitchen to welcome our first guests.': 'ជួសជុលបន្ទប់បរិភោគ និងផ្ទះបាយដើម្បីស្វាគមន៍ភ្ញៀវដំបូងរបស់យើង។',
    'June 2026': 'មិថុនា 2026',
    'Grand Opening': 'ពិធីបើកជាផ្លូវការ',
    ['The Food Hub is officially open ' + EM_DASH + ' come be part of our story from day one.']:
      'The Food Hub បើកជាផ្លូវការហើយ សូមមកចូលរួមក្នុងរឿងរ៉ាវរបស់យើងចាប់ពីថ្ងៃដំបូង។',
    'Meet The Team': 'ជួបក្រុមការងារ',
    'The People Behind The Food': 'មនុស្សនៅពីក្រោយម្ហូប',
    'John Miller, Head Chef': 'John Miller ចុងភៅធំ',
    'Head Chef': 'ចុងភៅធំ',
    'David Lee, Pastry Chef': 'David Lee ចុងភៅនំ',
    'Pastry Chef': 'ចុងភៅនំ',
    'Kitchen team preparing dough': 'ក្រុមផ្ទះបាយកំពុងរៀបចំម្សៅនំ',
    'Kitchen Chef': 'ចុងភៅផ្ទះបាយ',

    // Contact page
    'Get In Touch': 'ទាក់ទងមកយើង',
    'Contact Us': 'ទំនាក់ទំនងយើង',
    'Address': 'អាសយដ្ឋាន',
    'Phone': 'ទូរស័ព្ទ',
    'Email': 'អ៊ីមែល',
    '123 Riverside Street, Phnom Penh, Cambodia': 'ផ្លូវ Riverside លេខ 123 ភ្នំពេញ កម្ពុជា',
    ['Weekday: 9am' + EN_DASH + '10pm | Weekend: 10am' + EN_DASH + '11pm']:
      'ថ្ងៃធ្វើការ: 9ព្រឹក' + EN_DASH + '10យប់ | ចុងសប្តាហ៍: 10ព្រឹក' + EN_DASH + '11យប់',
    'Restaurant location map': 'ផែនទីទីតាំងភោជនីយដ្ឋាន',
    'Full Name': 'ឈ្មោះពេញ',
    'Your name': 'ឈ្មោះរបស់អ្នក',
    'Email Address': 'អាសយដ្ឋានអ៊ីមែល',
    'Message': 'សារ',
    'Write your message here...': 'សរសេរសាររបស់អ្នកនៅទីនេះ...',
    'Send Message': 'ផ្ញើសារ',
    'Thank you! Your message has been sent successfully.': 'អរគុណ! សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ។',

    // Menu page
    'Full Menu': 'ម៉ឺនុយពេញ',
    'Our Full Menu': 'ម៉ឺនុយពេញរបស់យើង',

    // Reservation page
    'Reserve Your Table': 'កក់តុរបស់អ្នក',
    'Phone Number': 'លេខទូរស័ព្ទ',
    'Date': 'កាលបរិច្ឆេទ',
    'Time': 'ម៉ោង',
    'Number of Guests': 'ចំនួនភ្ញៀវ',
    'Select guests': 'ជ្រើសរើសចំនួនភ្ញៀវ',
    '1 Guest': 'ភ្ញៀវ 1 នាក់',
    '2 Guests': 'ភ្ញៀវ 2 នាក់',
    '3 Guests': 'ភ្ញៀវ 3 នាក់',
    '4 Guests': 'ភ្ញៀវ 4 នាក់',
    '5+ Guests': 'ភ្ញៀវ 5+ នាក់',
    'Special Requests (optional)': 'សំណើពិសេស (ជាជម្រើស)',
    'Allergies, celebrations, seating preferences...': 'អាឡែរហ្ស៊ី ពិធីអបអរសាទរ ទីតាំងអង្គុយដែលចង់បាន...',
    'Reserve Now': 'កក់ឥឡូវនេះ',
    'Thank you! Your reservation has been received.': 'អរគុណ! ការកក់របស់អ្នកត្រូវបានទទួលហើយ។',

    // Form errors
    'This field is required.': 'សូមបំពេញចន្លោះនេះ។',
    'Please enter a valid email address.': 'សូមបញ្ចូលអាសយដ្ឋានអ៊ីមែលត្រឹមត្រូវ។',
    'Please enter a valid phone number.': 'សូមបញ្ចូលលេខទូរស័ព្ទត្រឹមត្រូវ។',
    'Please choose a future date.': 'សូមជ្រើសរើសកាលបរិច្ឆេទនាពេលអនាគត។',

    // Cart drawer
    'Your Order': 'ការបញ្ជាទិញរបស់អ្នក',
    'Your order list is empty.': 'បញ្ជីបញ្ជាទិញរបស់អ្នកនៅទទេ។',
    'Add a dish from the menu!': 'សូមបន្ថែមម្ហូបពីម៉ឺនុយ!',
    'Remove': 'ដកចេញ',
    'Subtotal': 'សរុបរង',
    'Tax (10%)': 'ពន្ធ (10%)',
    'Total': 'សរុប',
    'Checkout & View Invoice': 'ទូទាត់ និងមើលវិក្កយបត្រ',
    'Your Invoice': 'វិក្កយបត្ររបស់អ្នក',
    'Invoice': 'វិក្កយបត្រ',
    'Confirm & Place Order': 'បញ្ជាក់ និងដាក់បញ្ជាទិញ',
    'Back to Order': 'ត្រឡប់ទៅការបញ្ជាទិញ',
    'Order Placed!': 'បានដាក់បញ្ជាទិញហើយ!',
    'Thank you. Your order has been sent to the kitchen. It will be ready shortly.':
      'អរគុណ។ ការបញ្ជាទិញរបស់អ្នកត្រូវបានផ្ញើទៅផ្ទះបាយ។ វានឹងរួចរាល់ក្នុងពេលឆាប់ៗនេះ។',
    'Added \u2713': 'បានបន្ថែម \u2713',
    'added to your order!': 'ត្រូវបានបន្ថែមទៅការបញ្ជាទិញរបស់អ្នកហើយ!',

    // Wishlist drawer
    'Your Wishlist': 'បញ្ជីសំណព្វចិត្តរបស់អ្នក',
    'Your wishlist is empty.': 'បញ្ជីសំណព្វចិត្តរបស់អ្នកនៅទទេ។',
    'Tap the heart icon on a dish to save it!': 'ចុចរូបបេះដូងលើម្ហូបដើម្បីរក្សាទុក!',
    'Add to Cart': 'បន្ថែមទៅកន្ត្រក',
    'Browse Menu': 'រកមើលម៉ឺនុយ',

    // Reservation drawer
    'Your Reservation': 'ការកក់របស់អ្នក',
    'Booking Ref': 'លេខយោងការកក់',
    'Name': 'ឈ្មោះ',
    'Guests': 'ភ្ញៀវ',
    'Notes': 'កំណត់ចំណាំ',
    'Confirm & Book Table': 'បញ្ជាក់ និងកក់តុ',
    'Back to Edit': 'ត្រឡប់ទៅកែសម្រួល',
    'Table Reserved!': 'បានកក់តុហើយ!',
    'guest': 'ភ្ញៀវ',
    'your chosen date': 'កាលបរិច្ឆេទដែលអ្នកបានជ្រើស'
  };

  // ---------- Dictionary lookups (both directions) ----------
  var has = Object.prototype.hasOwnProperty;
  var en2km = {};
  var km2en = {};

  Object.keys(dict).forEach(function (en) {
    en2km[en] = dict[en];
    if (!has.call(km2en, dict[en])) km2en[dict[en]] = en;
  });

  function norm(str) {
    return str.replace(/\s+/g, ' ').trim();
  }

  function escapeRe(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Sentences that contain changing values (names, numbers, dates).
  // Written once with {1}, {2}... placeholders, then used in both directions.
  function makePattern(enTpl, kmTpl) {
    function toRegex(tpl) {
      var src = escapeRe(tpl).replace(/\\\{(\d)\\\}/g, '(.+?)');
      return new RegExp('^' + src + '$');
    }
    function fill(tpl, m, tr) {
      return tpl.replace(/\{(\d)\}/g, function (_, n) { return tr(m[Number(n)]); });
    }
    return {
      enRe: toRegex(enTpl),
      kmRe: toRegex(kmTpl),
      toKm: function (m, tr) { return fill(kmTpl, m, tr); },
      toEn: function (m, tr) { return fill(enTpl, m, tr); }
    };
  }

  var patterns = [
    makePattern('Demo Rating {1}', 'ការវាយតម្លៃគំរូ {1}'),
    makePattern('{1} each', '{1} ក្នុងមួយ'),
    makePattern('{1} x {2}', '{1} x {2}'),
    makePattern(
      "Thank you, {1}. We've saved your table for {2} at {3}. See you soon!",
      'អរគុណ {1}។ យើងបានរក្សាទុកតុរបស់អ្នកសម្រាប់ {2} នៅម៉ោង {3}។ ជួបគ្នាឆាប់ៗ!'
    ),
    makePattern(
      "Thank you, {1}. We've saved your table for {2}. See you soon!",
      'អរគុណ {1}។ យើងបានរក្សាទុកតុរបស់អ្នកសម្រាប់ {2}។ ជួបគ្នាឆាប់ៗ!'
    )
  ];

  // Returns the translated string, or null if nothing matches
  function translateString(str, lang) {
    var core = norm(str);
    if (!core) return null;

    var map = lang === 'km' ? en2km : km2en;
    if (has.call(map, core)) return map[core];

    var tr = function (s) {
      var out = translateString(s, lang);
      return out === null ? s : out;
    };

    for (var i = 0; i < patterns.length; i++) {
      var p = patterns[i];
      var m = core.match(lang === 'km' ? p.enRe : p.kmRe);
      if (m) return lang === 'km' ? p.toKm(m, tr) : p.toEn(m, tr);
    }
    return null;
  }

  // ---------- Applying translations to the page ----------
  var ATTRS = ['placeholder', 'aria-label', 'alt', 'title'];
  var ATTR_SELECTOR = '[placeholder],[aria-label],[alt],[title]';
  var textStore = new WeakMap(); // text node -> { orig, shown }
  var attrStore = new WeakMap(); // element -> { attrName: { orig, shown } }
  var current = 'en';
  var observer = null;

  function isSkipped(node) {
    var el = node.nodeType === 1 ? node : node.parentNode;
    while (el && el.nodeType === 1) {
      var tag = el.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA' || tag === 'NOSCRIPT') return true;
      if (el.id === 'heroTypewriter' || el.hasAttribute('data-no-translate')) return true;
      el = el.parentNode;
    }
    return false;
  }

  // Shared logic: figure out what a value should become in the target language
  function nextValue(value, rec, lang) {
    if (rec && value === rec.shown) {
      return lang === 'en' ? { text: rec.orig, restore: true } : null;
    }
    var out = translateString(value, lang);
    if (out === null) return null;
    var lead = value.match(/^\s*/)[0];
    var trail = value.match(/\s*$/)[0];
    return { text: lead + out + trail, restore: false };
  }

  function applyText(node, lang) {
    if (isSkipped(node)) return;
    var rec = textStore.get(node);
    var next = nextValue(node.nodeValue, rec, lang);
    if (!next) return;
    if (lang === 'km' && !next.restore) {
      textStore.set(node, { orig: node.nodeValue, shown: next.text });
    } else {
      textStore.delete(node);
    }
    node.nodeValue = next.text;
  }

  function applyAttrs(el, lang) {
    var all = attrStore.get(el) || {};
    ATTRS.forEach(function (attr) {
      var value = el.getAttribute(attr);
      if (value === null) return;
      var next = nextValue(value, all[attr], lang);
      if (!next) return;
      if (lang === 'km' && !next.restore) {
        all[attr] = { orig: value, shown: next.text };
      } else {
        delete all[attr];
      }
      el.setAttribute(attr, next.text);
    });
    attrStore.set(el, all);
  }

  function translateTree(root, lang) {
    if (root.nodeType === 3) {
      applyText(root, lang);
      return;
    }
    if (root.nodeType !== 1) return;

    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var nodes = [];
    var n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (t) { applyText(t, lang); });

    if (root.matches(ATTR_SELECTOR)) applyAttrs(root, lang);
    root.querySelectorAll(ATTR_SELECTOR).forEach(function (el) { applyAttrs(el, lang); });
  }

  function discardOwnChanges() {
    if (observer) observer.takeRecords();
  }

  // Keeps text added later by other scripts in the active language
  function onMutations(records) {
    if (current !== 'km') return;
    records.forEach(function (rec) {
      if (rec.type === 'childList') {
        rec.addedNodes.forEach(function (node) { translateTree(node, 'km'); });
      } else if (rec.type === 'characterData') {
        applyText(rec.target, 'km');
      } else if (rec.type === 'attributes') {
        applyAttrs(rec.target, 'km');
      }
    });
    discardOwnChanges();
  }

  // ---------- Language selector (English | Khmer) ----------
  function updateToggle() {
    document.querySelectorAll('.lang-opt').forEach(function (opt) {
      var isActive = opt.getAttribute('data-lang') === current;
      opt.classList.toggle('active', isActive);
      opt.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  function setLanguage(lang, save) {
    current = lang === 'km' ? 'km' : 'en';
    document.documentElement.lang = current;

    translateTree(document.documentElement, current);
    discardOwnChanges();
    updateToggle();

    if (save) {
      try { localStorage.setItem(STORAGE_KEY, current); } catch (e) { /* storage blocked */ }
    }
    document.dispatchEvent(new CustomEvent('foodhub:langchange', { detail: { lang: current } }));
  }

  // Khmer is the default language until the visitor picks English
  function savedLanguage() {
    try { return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'km'; } catch (e) { return 'km'; }
  }

  // Set the <html lang> early so other scripts can read it
  current = savedLanguage();
  document.documentElement.lang = current;

  function init() {
    observer = new MutationObserver(onMutations);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRS
    });

    // Each button selects its own language (no flipping back and forth)
    document.querySelectorAll('.lang-opt').forEach(function (opt) {
      opt.addEventListener('click', function () {
        var lang = opt.getAttribute('data-lang');
        if (lang !== current) setLanguage(lang, true);
      });
    });

    setLanguage(current, false);
    document.documentElement.classList.remove('lang-loading');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.FoodHubLang = {
    get: function () { return current; },
    set: function (lang) { setLanguage(lang, true); },
    dictionary: dict
  };
})();
