<?
namespace App\Filters;

use App\Filters\BaseFilter;
use Illuminate\Database\Eloquent\Builder;
use App\Models\RealEstateUser;


class RealEstateFilter extends BaseFilter {

    /**
     * filter by city
     * @param string $val
     * @return Builder
     */
    public function city(string $val):Builder {
        return $this->builder->where('city_id', $val);
    }

    /**
     * sorting by price
     * @param string $val
     * @return Builder
     */
    public function priceOrder(string $val):Builder {
        return $this->builder->orderBy('price', strtolower($val));
    }

    /**
     * sorting by rating
     * @param string $val
     * @return Builder
     */
    public function ratingOrder(string $val):Builder {
        if (strtolower($val) == 'desc') {
            return $this->joinRating('q_rating')
                        ->orderBy('q_rating.rating', 'desc');
        }

        return $this->builder;
    }


    /**
     * filter by rating
     * @param string $val
     * @return Builder
     */
    public function popular($val):Builder {
        $val = (int)$val;
        if (!empty($val)) {
            return $this->joinRating('q_rating_2')
                        ->where('q_rating_2.rating', '>', $val);
        }

        return $this->builder;
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


    /**
     * joining with average rating query
     * @param string $alias
     * @return Builder
     */
    private function joinRating($alias='q_rating'):Builder {
        $queryRating = RealEstateUser::avgRatingQuery();
        return $this  ->builder
                      ->leftJoinSub($queryRating, $alias, function($join) use ($alias) {
                           $join->on('real_estate.id', '=', "{$alias}.real_estate_id");
                        })
                      ->select('real_estate.*');
    }
}