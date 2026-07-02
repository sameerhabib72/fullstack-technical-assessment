<?php

namespace App\Services;

use App\Repositories\ContactRepository;

class ContactService extends BaseService
{
    protected function getRepository()
    {
        return ContactRepository::class;
    }

    public function createContactMessage(array $data)
    {
        $data['is_read'] = false;
        return $this->create($data);
    }

    public function markAsRead($id)
    {
        return $this->update($id, ['is_read' => true]);
    }

    public function getUnreadCount()
    {
        return $this->repository->getUnreadCount();
    }
}