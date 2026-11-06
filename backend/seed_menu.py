import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'restaurant_backend.settings')
django.setup()

from menu.models import MenuItem

items = [
    {"name": "Chicken 65", "category": "Starters", "price": 180, "food_type": "non-veg", "desc": "Spicy and crispy deep-fried chicken tossed with curry leaves and green chilies."},
    {"name": "Paneer Tikka", "category": "Starters", "price": 160, "food_type": "veg", "desc": "Cottage cheese cubes marinated in tandoori spices and grilled to perfection."},
    {"name": "Crispy Corn", "category": "Starters", "price": 130, "food_type": "veg", "desc": "Crispy fried sweet corn seasoned with pepper, salt, and spices."},
    {"name": "Dragon Chicken", "category": "Starters", "price": 200, "food_type": "non-veg", "desc": "Crunchy chicken strips tossed in a sweet and fiery red sauce with cashews."},
    {"name": "Chicken Biryani", "category": "Biryani", "price": 220, "food_type": "non-veg", "desc": "Aromatic basmati rice cooked with tender spiced chicken, served with raita."},
    {"name": "Mutton Biryani", "category": "Biryani", "price": 280, "food_type": "non-veg", "desc": "Traditional slow-cooked mutton dum biryani with rich royal flavors."},
    {"name": "Veg Fried Rice", "category": "Rice", "price": 140, "food_type": "veg", "desc": "Wok-tossed long grain rice with fresh crunchy vegetables and spring onions."},
    {"name": "Jeera Rice", "category": "Rice", "price": 120, "food_type": "veg", "desc": "Fragrant basmati rice tempered with ghee, cumin seeds, and mild spices."},
    {"name": "Gulab Jamun", "category": "Desserts", "price": 80, "food_type": "veg", "desc": "Warm soft milk dumplings soaked in cardamom and rose sugar syrup."},
    {"name": "Chocolate Brownie", "category": "Desserts", "price": 130, "food_type": "veg", "desc": "Rich warm fudge brownie served with melted chocolate sauce."},
    {"name": "Ice Cream Scoop", "category": "Desserts", "price": 60, "food_type": "veg", "desc": "Choice of chilled Vanilla, Chocolate, or Strawberry scoop."},
    {"name": "Fresh Mango Juice", "category": "Juices", "price": 70, "food_type": "veg", "desc": "Thick and chilled juice made from sweet seasonal mangoes."},
    {"name": "Mint Lime Cooler", "category": "Juices", "price": 50, "food_type": "veg", "desc": "Zesty lime juice crushed with fresh mint leaves and sparkling soda."},
    {"name": "Watermelon Juice", "category": "Juices", "price": 60, "food_type": "veg", "desc": "Freshly pressed sweet watermelon juice served chilled."}
]

created_count = 0
for item_data in items:
    obj, created = MenuItem.objects.get_or_create(
        name=item_data["name"],
        defaults=item_data
    )
    if created:
        created_count += 1

print(f"Seeding complete: {created_count} new menu items added. Total menu items: {MenuItem.objects.count()}")

