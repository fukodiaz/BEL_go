<?
namespace App\Filters;

use App\Filters\BaseFilter;
use Illuminate\Database\Eloquent\Builder;


class RealEstateFilter extends BaseFilter {

    /**
     * filter by city
     * @param string $val
     * @return Builder
     */
    public function city(string $val):Builder {
        return $this->builder->where('city_id', $val);
    }

    public function priceOrder(string $val):Builder {
        return $this->builder->orderBy('price', strtolower($val));
    }

    
}