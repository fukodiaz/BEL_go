<?
namespace App\Filters;

use App\Filters\BaseFilter;
use Illuminate\Database\Eloquent\Builder;
use App\Models\RealEstateUser;


class AdminRealEstateFilter extends BaseFilter {

    /**
     * filter by city
     * @param string $val
     * @return Builder
    */
    public function city(string $val):Builder {
        return $this->builder->where('city_id', $val);
    }

   
    /**
     * search by descriptionShort
     * @param string $val
     * @return Builder
    */
    public function search($val):Builder {
        if (!empty($val)) {
            return $this->builder->where('descriptionShort', 'LIKE', "%{$val}%");
        }
    }

}