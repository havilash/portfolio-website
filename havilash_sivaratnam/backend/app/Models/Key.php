<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Key extends Model
{
    const KEY_LENGTH = 32;

    protected $fillable = [
        'key',
        'expires_at',
    ];
}
