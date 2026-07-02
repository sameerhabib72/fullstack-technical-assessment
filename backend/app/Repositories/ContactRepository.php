<?php

namespace App\Repositories;

use App\Models\ContactMessage;

class ContactRepository extends BaseRepository
{
    protected function getModel(): string
    {
        return ContactMessage::class;
    }

    public function getUnreadCount(): int
    {
        return $this->model->where('is_read', false)->count();
    }
}