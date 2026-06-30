<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Http\Resources\FaqResource;
use App\Traits\ApiResponse;

class FaqController extends Controller
{
    use ApiResponse;

    public function index()
    {
        // Sirf active FAQs ko mangwana aur sort karna
        $faqs = Faq::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get();

        return $this->successResponse(
            FaqResource::collection($faqs),
            'FAQs fetched successfully'
        );
    }
}
