from django.db import models
import uuid

class MenuItem(models.Model):
    CATEGORY_CHOICES = [
        ('Starters', 'Starters'),
        ('Rice', 'Rice'),
        ('Biryani', 'Biryani'),
        ('Bread', 'Bread'),
        ('Juices', 'Juices'),
        ('Drinks', 'Drinks'),
        ('Desserts', 'Desserts'),
    ]

    FOOD_TYPE_CHOICES = [
        ('veg', 'Vegetarian'),
        ('non-veg', 'Non-Vegetarian'),
    ]

    name = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='Starters')
    price = models.DecimalField(max_digits=8, decimal_places=2)
    food_type = models.CharField(max_length=10, choices=FOOD_TYPE_CHOICES, default='non-veg')
    desc = models.TextField(blank=True, default='')
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - ₹{self.price}"


class Order(models.Model):
    STATUS_CHOICES = [
        ('RECEIVED', 'Received'),
        ('ACCEPTED', 'Accepted'),
        ('PREPARING', 'Preparing'),
        ('READY', 'Ready'),
        ('COMPLETED', 'Completed'),
    ]

    PAYMENT_CHOICES = [
        ('UNPAID', 'Unpaid'),
        ('PAID', 'Paid'),
    ]

    order_id = models.CharField(max_length=20, unique=True, editable=False)
    table_id = models.CharField(max_length=10)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    order_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='RECEIVED')
    payment_status = models.CharField(max_length=10, choices=PAYMENT_CHOICES, default='UNPAID')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.order_id:
            # Generate sequential human-friendly order ID (e.g. ORD1001, ORD1002...)
            last_order = Order.objects.order_by('-id').first()
            if last_order and last_order.order_id.startswith('ORD'):
                try:
                    last_num = int(last_order.order_id.replace('ORD', ''))
                    self.order_id = f"ORD{last_num + 1}"
                except ValueError:
                    self.order_id = f"ORD{uuid.uuid4().hex[:6].upper()}"
            else:
                self.order_id = "ORD1001"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Order {self.order_id} (Table {self.table_id}) - {self.order_status}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    menu_item = models.ForeignKey(MenuItem, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity}x {self.name} (Order {self.order.order_id})"
