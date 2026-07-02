<?php

namespace App\Services;

abstract class BaseService
{
    protected $repository;

    public function __construct()
    {
        $this->repository = app($this->getRepository());
    }

    abstract protected function getRepository();

    public function getAll(array $filters = [], array $with = [])
    {
        return $this->repository->getAll($filters, $with);
    }

    public function getById($id, array $with = [])
    {
        return $this->repository->getById($id, $with);
    }

    public function create(array $data)
    {
        return $this->repository->create($data);
    }

    public function update($id, array $data)
    {
        return $this->repository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->repository->delete($id);
    }

    public function getActive(array $with = [])
    {
        return $this->repository->getActive($with);
    }

    /**
     * Toggle status - Override in child classes if needed
     */
    public function toggleStatus($id)
    {
        $record = $this->getById($id);
        $record->update(['is_active' => !$record->is_active]);
        return $record->fresh();
    }
}