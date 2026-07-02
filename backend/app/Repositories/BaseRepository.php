<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Collection;

abstract class BaseRepository
{
    protected $model;

    public function __construct()
    {
        $this->model = app($this->getModel());
    }

    abstract protected function getModel(): string;

    public function getAll(array $filters = [], array $with = []): Collection
    {
        $query = $this->model->newQuery();

        if (!empty($with)) {
            $query->with($with);
        }

        if (isset($filters['is_active'])) {
            $query->where('is_active', $filters['is_active']);
        }

        if (isset($filters['sort_by'])) {
            $query->orderBy($filters['sort_by'], $filters['sort_dir'] ?? 'asc');
        }

        return $query->get();
    }

    public function getById($id, array $with = [])
    {
        $query = $this->model->newQuery();

        if (!empty($with)) {
            $query->with($with);
        }

        return $query->findOrFail($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update($id, array $data)
    {
        $record = $this->getById($id);
        $record->update($data);
        return $record->fresh();
    }

    public function delete($id): bool
    {
        $record = $this->getById($id);
        return $record->delete();
    }

    public function getActive(array $with = []): Collection
    {
        return $this->getAll(['is_active' => true], $with);
    }
}