<?
namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

abstract class BaseFilter 
{
    public const ARR_BOOL = [];
    public const ARR_INT = [];
    public const FROM_STR_TO_ARR = [];

    protected Builder $builder;

    public function __construct(protected FormRequest $request) {}

    /**
     * Tying filters with request
     */
    public function apply(Builder $builder): Builder {
        $this->builder = $builder;

        foreach($this->receiveFilters() as $method => $val) {
            $methodName = Str::camel($method);

            if (null == $val)
                continue;

            if (method_exists($this, $methodName)) {
                if (in_array($method, static::ARR_BOOL, true)) {
                    $val = (bool)$val;
                }

                if (in_array($method, static::ARR_INT, true)) {
                    $val = (int)$val;
                }

                if (in_array($method, static::FROM_STR_TO_ARR, true)) {
                    $val = explode(',', $val);
                }

                $this->builder = $this->{$methodName}($val);
            }
        }  

        return $this->builder;
    }


    /**
     * Receiving collection from input-data
     */
    public function receiveFilters() {
        return $this->request->all();
    }
}