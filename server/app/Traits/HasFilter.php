<?
namespace App\Traits;

use App\Filters\BaseFilter;
use Illuminate\Database\Eloquent\Builder;

trait HasFilter {
    public function scopeFilter(Builder $builder, BaseFilter $filter):Builder {
       return $filter->apply($builder);
    }
}