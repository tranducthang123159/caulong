<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'total_price',
        'status',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    // Mối quan hệ với order items
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
